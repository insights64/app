module Pages.VerifyEmail exposing (Model, Msg, init, update, view)

import Api.Email
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Route


type alias Model =
    { token : String
    , status : VerificationStatus
    }


type VerificationStatus
    = Verifying
    | Verified
    | Failed String


init : String -> String -> ( Model, Cmd Msg )
init apiUrl token =
    ( { token = token
      , status = Verifying
      }
    , Api.Email.verifyEmail
        { apiUrl = apiUrl
        , token = token
        , onResponse = GotResponse
        }
    )


type Msg
    = GotResponse (Result Http.Error { message : String, verified : Bool })


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResponse result ->
            case result of
                Ok response ->
                    if response.verified then
                        ( { model | status = Verified }
                        , Cmd.none
                        )

                    else
                        ( { model | status = Failed response.message }
                        , Cmd.none
                        )

                Err error ->
                    ( { model | status = Failed (httpErrorToString error) }
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
                "Invalid or expired verification link."

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
                    ]

                -- Status-based content
                , case model.status of
                    Verifying ->
                        div [ class "text-center" ]
                            [ div [ class "mb-4" ]
                                [ div [ class "animate-spin rounded-full h-12 w-12 border-b-2 border-anthro-dark mx-auto" ] []
                                ]
                            , p [ class "text-gray-600" ] [ text "Verifying your email..." ]
                            ]

                    Verified ->
                        div [ class "text-center" ]
                            [ div [ class "mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto" ]
                                [ span [ class "text-3xl" ] [ text "\u{2705}" ]
                                ]
                            , h2 [ class "text-xl font-semibold text-gray-900 mb-2" ] [ text "Email Verified!" ]
                            , p [ class "text-gray-600 mb-6" ] [ text "Your email has been successfully verified." ]
                            , a
                                [ Route.href Route.Dashboard
                                , class "inline-block bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                ]
                                [ text "Go to Dashboard" ]
                            ]

                    Failed errorMsg ->
                        div [ class "text-center" ]
                            [ div [ class "mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto" ]
                                [ span [ class "text-3xl" ] [ text "\u{274C}" ]
                                ]
                            , h2 [ class "text-xl font-semibold text-gray-900 mb-2" ] [ text "Verification Failed" ]
                            , p [ class "text-gray-600 mb-6" ] [ text errorMsg ]
                            , div [ class "space-y-3" ]
                                [ a
                                    [ Route.href Route.Login
                                    , class "block bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                    ]
                                    [ text "Go to Login" ]
                                , p [ class "text-sm text-gray-500" ]
                                    [ text "You can request a new verification email after logging in." ]
                                ]
                            ]
                ]
            ]
        ]
