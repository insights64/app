module Pages.ForgotPassword exposing (Model, Msg, init, update, view)

import Api.Email
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit)
import Http
import Route


type alias Model =
    { email : String
    , error : Maybe String
    , success : Maybe String
    , isLoading : Bool
    }


init : Model
init =
    { email = ""
    , error = Nothing
    , success = Nothing
    , isLoading = False
    }


type Msg
    = EmailChanged String
    | SubmitForm
    | GotResponse (Result Http.Error { message : String })


update : String -> Msg -> Model -> ( Model, Cmd Msg )
update apiUrl msg model =
    case msg of
        EmailChanged email ->
            ( { model | email = email, error = Nothing }
            , Cmd.none
            )

        SubmitForm ->
            if String.isEmpty model.email then
                ( { model | error = Just "Please enter your email address" }
                , Cmd.none
                )

            else
                ( { model | isLoading = True, error = Nothing, success = Nothing }
                , Api.Email.forgotPassword
                    { apiUrl = apiUrl
                    , email = model.email
                    , onResponse = GotResponse
                    }
                )

        GotResponse result ->
            case result of
                Ok response ->
                    ( { model
                        | isLoading = False
                        , success = Just response.message
                        , error = Nothing
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | isLoading = False
                        , error = Just (httpErrorToString error)
                      }
                    , Cmd.none
                    )


httpErrorToString : Http.Error -> String
httpErrorToString error =
    case error of
        Http.BadUrl _ ->
            "Invalid URL"

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error - please check your connection"

        Http.BadStatus status ->
            if status == 400 then
                "Invalid request - please check your input"

            else if status == 429 then
                "Too many requests. Please try again later."

            else
                "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error parsing response: " ++ message


view : Model -> Html Msg
view model =
    div [ class "min-h-screen flex items-center justify-center bg-anthro-light" ]
        [ div [ class "max-w-md w-full mx-4" ]
            [ div [ class "bg-white rounded-2xl shadow-card p-8" ]
                [ -- Logo
                  div [ class "flex flex-col items-center mb-8" ]
                    [ div [ class "flex items-center gap-3 mb-2" ]
                        [ div [ class "w-10 h-10 rounded grid grid-cols-2 grid-rows-2 overflow-hidden" ]
                            [ span [ class "bg-anthro-orange" ] []
                            , span [ class "bg-anthro-dark" ] []
                            , span [ class "bg-anthro-dark" ] []
                            , span [ class "bg-anthro-orange" ] []
                            ]
                        , h1 [ class "text-2xl font-semibold text-anthro-dark tracking-tight" ] [ text "Insights64" ]
                        ]
                    , p [ class "text-anthro-gray" ] [ text "Reset your password" ]
                    ]

                -- Success message
                , case model.success of
                    Just successMsg ->
                        div []
                            [ div [ class "mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm" ]
                                [ text successMsg ]
                            , div [ class "mt-6 text-center text-sm text-gray-600" ]
                                [ a
                                    [ Route.href Route.Login
                                    , class "text-anthro-dark hover:underline font-medium"
                                    ]
                                    [ text "Back to Sign in" ]
                                ]
                            ]

                    Nothing ->
                        -- Form
                        Html.form [ onSubmit SubmitForm ]
                            [ -- Description
                              p [ class "text-sm text-gray-600 mb-6" ]
                                [ text "Enter your email address and we'll send you a link to reset your password." ]

                            -- Error message
                            , case model.error of
                                Just errorMsg ->
                                    div [ class "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                                        [ text errorMsg ]

                                Nothing ->
                                    text ""

                            -- Email field
                            , div [ class "mb-6" ]
                                [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "email" ]
                                    [ text "Email" ]
                                , input
                                    [ type_ "email"
                                    , id "email"
                                    , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors"
                                    , placeholder "coach@example.com"
                                    , value model.email
                                    , onInput EmailChanged
                                    , disabled model.isLoading
                                    ]
                                    []
                                ]

                            -- Submit button
                            , button
                                [ type_ "submit"
                                , class "w-full bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                , disabled model.isLoading
                                ]
                                [ if model.isLoading then
                                    text "Sending..."

                                  else
                                    text "Send Reset Link"
                                ]

                            -- Back to login link
                            , div [ class "mt-6 text-center text-sm text-gray-600" ]
                                [ text "Remember your password? "
                                , a
                                    [ Route.href Route.Login
                                    , class "text-anthro-dark hover:underline font-medium"
                                    ]
                                    [ text "Sign in" ]
                                ]
                            ]
                ]
            ]
        ]
