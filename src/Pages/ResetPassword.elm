module Pages.ResetPassword exposing (Model, Msg, init, update, view)

import Api.Email
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit)
import Http
import Route


type alias Model =
    { token : String
    , password : String
    , confirmPassword : String
    , error : Maybe String
    , success : Bool
    , isLoading : Bool
    }


init : String -> Model
init token =
    { token = token
    , password = ""
    , confirmPassword = ""
    , error = Nothing
    , success = False
    , isLoading = False
    }


type Msg
    = PasswordChanged String
    | ConfirmPasswordChanged String
    | SubmitForm
    | GotResponse (Result Http.Error { message : String })


update : String -> Msg -> Model -> ( Model, Cmd Msg )
update apiUrl msg model =
    case msg of
        PasswordChanged password ->
            ( { model | password = password, error = Nothing }
            , Cmd.none
            )

        ConfirmPasswordChanged confirmPassword ->
            ( { model | confirmPassword = confirmPassword, error = Nothing }
            , Cmd.none
            )

        SubmitForm ->
            if String.isEmpty model.password then
                ( { model | error = Just "Please enter a new password" }
                , Cmd.none
                )

            else if String.length model.password < 8 then
                ( { model | error = Just "Password must be at least 8 characters" }
                , Cmd.none
                )

            else if model.password /= model.confirmPassword then
                ( { model | error = Just "Passwords do not match" }
                , Cmd.none
                )

            else
                ( { model | isLoading = True, error = Nothing }
                , Api.Email.resetPassword
                    { apiUrl = apiUrl
                    , token = model.token
                    , password = model.password
                    , onResponse = GotResponse
                    }
                )

        GotResponse result ->
            case result of
                Ok _ ->
                    ( { model
                        | isLoading = False
                        , success = True
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
                "Invalid or expired reset link. Please request a new one."

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
                    , p [ class "text-anthro-gray" ] [ text "Set a new password" ]
                    ]
                , if model.success then
                    -- Success message
                    div []
                        [ div [ class "mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700" ]
                            [ p [ class "font-medium mb-2" ] [ text "Password reset successfully!" ]
                            , p [ class "text-sm" ] [ text "You can now sign in with your new password." ]
                            ]
                        , a
                            [ Route.href Route.Login
                            , class "w-full block text-center bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            ]
                            [ text "Sign in" ]
                        ]

                  else
                    -- Form
                    Html.form [ onSubmit SubmitForm ]
                        [ -- Error message
                          case model.error of
                            Just errorMsg ->
                                div [ class "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                                    [ text errorMsg ]

                            Nothing ->
                                text ""

                        -- Password field
                        , div [ class "mb-4" ]
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "password" ]
                                [ text "New Password" ]
                            , input
                                [ type_ "password"
                                , id "password"
                                , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors"
                                , placeholder "Enter your new password"
                                , value model.password
                                , onInput PasswordChanged
                                , disabled model.isLoading
                                ]
                                []
                            , p [ class "text-xs text-gray-500 mt-1" ] [ text "At least 8 characters" ]
                            ]

                        -- Confirm password field
                        , div [ class "mb-6" ]
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1", for "confirmPassword" ]
                                [ text "Confirm Password" ]
                            , input
                                [ type_ "password"
                                , id "confirmPassword"
                                , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-colors"
                                , placeholder "Confirm your new password"
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
                                text "Resetting..."

                              else
                                text "Reset Password"
                            ]

                        -- Back to login link
                        , div [ class "mt-6 text-center text-sm text-gray-600" ]
                            [ a
                                [ Route.href Route.Login
                                , class "text-anthro-dark hover:underline font-medium"
                                ]
                                [ text "Back to Sign in" ]
                            ]
                        ]
                ]
            ]
        ]
