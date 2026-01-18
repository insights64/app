module Pages.Login exposing (Model, Msg, init, update, view)

import Api.Auth
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit)
import Http
import Route
import Types exposing (Coach)


type alias Model =
    { email : String
    , password : String
    , error : Maybe String
    , isLoading : Bool
    }


init : Model
init =
    { email = ""
    , password = ""
    , error = Nothing
    , isLoading = False
    }


type Msg
    = EmailChanged String
    | PasswordChanged String
    | SubmitForm
    | GotLoginResponse (Result Http.Error { token : String, coach : Coach })


update : Msg -> Model -> ( Model, Cmd Msg, Maybe { token : String, coach : Coach } )
update msg model =
    case msg of
        EmailChanged email ->
            ( { model | email = email, error = Nothing }
            , Cmd.none
            , Nothing
            )

        PasswordChanged password ->
            ( { model | password = password, error = Nothing }
            , Cmd.none
            , Nothing
            )

        SubmitForm ->
            if String.isEmpty model.email || String.isEmpty model.password then
                ( { model | error = Just "Please fill in all fields" }
                , Cmd.none
                , Nothing
                )

            else
                ( { model | isLoading = True, error = Nothing }
                , Api.Auth.login
                    { email = model.email
                    , password = model.password
                    , onResponse = GotLoginResponse
                    }
                , Nothing
                )

        GotLoginResponse result ->
            case result of
                Ok authResponse ->
                    ( { model | isLoading = False }
                    , Cmd.none
                    , Just authResponse
                    )

                Err error ->
                    ( { model
                        | isLoading = False
                        , error = Just (httpErrorToString error)
                      }
                    , Cmd.none
                    , Nothing
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
            if status == 401 then
                "Invalid email or password"

            else if status == 400 then
                "Invalid request - please check your input"

            else
                "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error parsing response: " ++ message


view : Model -> Html Msg
view model =
    div [ class "min-h-screen flex items-center justify-center bg-anthro-light" ]
        [ div [ class "max-w-md w-full mx-4" ]
            [ div [ class "bg-white rounded-2xl shadow-sm border border-anthro-gray-light p-8" ]
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
                    , p [ class "text-anthro-gray" ] [ text "Chess coaching dashboard" ]
                    ]

                -- Form
                , Html.form [ onSubmit SubmitForm ]
                    [ -- Error message
                      case model.error of
                        Just errorMsg ->
                            div [ class "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                                [ text errorMsg ]

                        Nothing ->
                            text ""

                    -- Email field
                    , div [ class "mb-4" ]
                        [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "email" ]
                            [ text "Email" ]
                        , input
                            [ type_ "email"
                            , id "email"
                            , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                            , placeholder "coach@example.com"
                            , value model.email
                            , onInput EmailChanged
                            , disabled model.isLoading
                            ]
                            []
                        ]

                    -- Password field
                    , div [ class "mb-6" ]
                        [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "password" ]
                            [ text "Password" ]
                        , input
                            [ type_ "password"
                            , id "password"
                            , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                            , placeholder "Enter your password"
                            , value model.password
                            , onInput PasswordChanged
                            , disabled model.isLoading
                            ]
                            []
                        ]

                    -- Submit button
                    , button
                        [ type_ "submit"
                        , class "w-full bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        , disabled model.isLoading
                        ]
                        [ if model.isLoading then
                            text "Signing in..."

                          else
                            text "Sign in"
                        ]
                    ]

                -- Register link
                , div [ class "mt-6 text-center text-sm text-gray-600" ]
                    [ text "Don't have an account? "
                    , a
                        [ Route.href Route.Register
                        , class "text-orange-600 hover:text-orange-700 font-medium"
                        ]
                        [ text "Register" ]
                    ]
                ]
            ]
        ]
