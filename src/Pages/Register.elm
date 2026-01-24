module Pages.Register exposing (Model, Msg, init, update, view)

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
    , confirmPassword : String
    , error : Maybe String
    , isLoading : Bool
    }


init : Model
init =
    { email = ""
    , password = ""
    , confirmPassword = ""
    , error = Nothing
    , isLoading = False
    }


type Msg
    = EmailChanged String
    | PasswordChanged String
    | ConfirmPasswordChanged String
    | SubmitForm
    | GotRegisterResponse (Result Http.Error { token : String, coach : Coach })


update : String -> Msg -> Model -> ( Model, Cmd Msg, Maybe { token : String, coach : Coach } )
update apiUrl msg model =
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

        ConfirmPasswordChanged confirmPassword ->
            ( { model | confirmPassword = confirmPassword, error = Nothing }
            , Cmd.none
            , Nothing
            )

        SubmitForm ->
            if String.isEmpty model.email || String.isEmpty model.password then
                ( { model | error = Just "Please fill in all fields" }
                , Cmd.none
                , Nothing
                )

            else if String.length model.password < 8 then
                ( { model | error = Just "Password must be at least 8 characters" }
                , Cmd.none
                , Nothing
                )

            else if model.password /= model.confirmPassword then
                ( { model | error = Just "Passwords do not match" }
                , Cmd.none
                , Nothing
                )

            else
                ( { model | isLoading = True, error = Nothing }
                , Api.Auth.register
                    { apiUrl = apiUrl
                    , email = model.email
                    , password = model.password
                    , onResponse = GotRegisterResponse
                    }
                , Nothing
                )

        GotRegisterResponse result ->
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
            if status == 409 then
                "An account with this email already exists"

            else if status == 400 then
                "Invalid email format or password too short"

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
                    , p [ class "text-anthro-gray" ] [ text "Create your account" ]
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
                            , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors"
                            , placeholder "coach@example.com"
                            , value model.email
                            , onInput EmailChanged
                            , disabled model.isLoading
                            ]
                            []
                        ]

                    -- Password field
                    , div [ class "mb-4" ]
                        [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "password" ]
                            [ text "Password" ]
                        , input
                            [ type_ "password"
                            , id "password"
                            , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors"
                            , placeholder "At least 8 characters"
                            , value model.password
                            , onInput PasswordChanged
                            , disabled model.isLoading
                            ]
                            []
                        ]

                    -- Confirm password field
                    , div [ class "mb-6" ]
                        [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "confirmPassword" ]
                            [ text "Confirm Password" ]
                        , input
                            [ type_ "password"
                            , id "confirmPassword"
                            , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors"
                            , placeholder "Confirm your password"
                            , value model.confirmPassword
                            , onInput ConfirmPasswordChanged
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
                            text "Creating account..."

                          else
                            text "Create account"
                        ]
                    ]

                -- Login link
                , div [ class "mt-6 text-center text-sm text-gray-600" ]
                    [ text "Already have an account? "
                    , a
                        [ Route.href Route.Login
                        , class "text-anthro-dark hover:underline font-medium"
                        ]
                        [ text "Sign in" ]
                    ]
                ]
            ]
        ]
