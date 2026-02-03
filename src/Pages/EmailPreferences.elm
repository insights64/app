module Pages.EmailPreferences exposing (Model, Msg, init, update, view)

import Api.Email exposing (EmailPreferences)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck)
import Http


type alias Model =
    { apiUrl : String
    , token : String
    , preferences : Maybe EmailPreferences
    , error : Maybe String
    , isLoading : Bool
    , isSaving : Bool
    , saveSuccess : Bool
    }


init : String -> String -> ( Model, Cmd Msg )
init apiUrl token =
    ( { apiUrl = apiUrl
      , token = token
      , preferences = Nothing
      , error = Nothing
      , isLoading = True
      , isSaving = False
      , saveSuccess = False
      }
    , Api.Email.getPreferences
        { apiUrl = apiUrl
        , token = token
        , onResponse = GotPreferences
        }
    )


type Msg
    = GotPreferences (Result Http.Error EmailPreferences)
    | ToggleAnalysisComplete Bool
    | ToggleWeeklySummary Bool
    | ToggleMarketing Bool
    | GotSaveResponse (Result Http.Error EmailPreferences)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotPreferences result ->
            case result of
                Ok prefs ->
                    ( { model
                        | preferences = Just prefs
                        , isLoading = False
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

        ToggleAnalysisComplete value ->
            case model.preferences of
                Just prefs ->
                    let
                        newPrefs =
                            { prefs | analysisCompleteNotifications = value }
                    in
                    ( { model | preferences = Just newPrefs, isSaving = True, saveSuccess = False }
                    , savePreferences model.apiUrl model.token newPrefs
                    )

                Nothing ->
                    ( model, Cmd.none )

        ToggleWeeklySummary value ->
            case model.preferences of
                Just prefs ->
                    let
                        newPrefs =
                            { prefs | weeklySummary = value }
                    in
                    ( { model | preferences = Just newPrefs, isSaving = True, saveSuccess = False }
                    , savePreferences model.apiUrl model.token newPrefs
                    )

                Nothing ->
                    ( model, Cmd.none )

        ToggleMarketing value ->
            case model.preferences of
                Just prefs ->
                    let
                        newPrefs =
                            { prefs | marketingEmails = value }
                    in
                    ( { model | preferences = Just newPrefs, isSaving = True, saveSuccess = False }
                    , savePreferences model.apiUrl model.token newPrefs
                    )

                Nothing ->
                    ( model, Cmd.none )

        GotSaveResponse result ->
            case result of
                Ok prefs ->
                    ( { model
                        | preferences = Just prefs
                        , isSaving = False
                        , saveSuccess = True
                        , error = Nothing
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | isSaving = False
                        , error = Just (httpErrorToString error)
                      }
                    , Cmd.none
                    )


savePreferences : String -> String -> EmailPreferences -> Cmd Msg
savePreferences apiUrl token prefs =
    Api.Email.updatePreferences
        { apiUrl = apiUrl
        , token = token
        , preferences = prefs
        , onResponse = GotSaveResponse
        }


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
            "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error parsing response: " ++ message


view : Model -> Html Msg
view model =
    div [ class "max-w-2xl mx-auto" ]
        [ -- Header
          div [ class "mb-8" ]
            [ h1 [ class "text-2xl font-semibold text-gray-900" ] [ text "Email Preferences" ]
            , p [ class "text-gray-600 mt-1" ] [ text "Manage your email notification settings" ]
            ]

        -- Content
        , div [ class "bg-white rounded-2xl shadow-card p-6" ]
            [ -- Error message
              case model.error of
                Just errorMsg ->
                    div [ class "mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                        [ text errorMsg ]

                Nothing ->
                    text ""

            -- Save indicator
            , if model.saveSuccess && not model.isSaving then
                div [ class "mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm" ]
                    [ text "Preferences saved" ]

              else
                text ""

            -- Loading state
            , if model.isLoading then
                div [ class "text-center py-8" ]
                    [ div [ class "animate-spin rounded-full h-8 w-8 border-b-2 border-anthro-dark mx-auto mb-4" ] []
                    , p [ class "text-gray-500" ] [ text "Loading preferences..." ]
                    ]

              else
                case model.preferences of
                    Nothing ->
                        div [ class "text-center py-8 text-gray-500" ]
                            [ text "Unable to load preferences" ]

                    Just prefs ->
                        div [ class "space-y-6" ]
                            [ -- Analysis notifications
                              preferenceToggle
                                { label = "Analysis Complete Notifications"
                                , description = "Get notified when game analysis is complete for your students"
                                , isEnabled = prefs.analysisCompleteNotifications
                                , onToggle = ToggleAnalysisComplete
                                , isSaving = model.isSaving
                                }

                            -- Weekly summary (coming soon)
                            , preferenceToggle
                                { label = "Weekly Summary"
                                , description = "Receive a weekly digest of your students' progress (coming soon)"
                                , isEnabled = prefs.weeklySummary
                                , onToggle = ToggleWeeklySummary
                                , isSaving = model.isSaving
                                }

                            -- Marketing
                            , preferenceToggle
                                { label = "Product Updates"
                                , description = "Receive updates about new features and improvements"
                                , isEnabled = prefs.marketingEmails
                                , onToggle = ToggleMarketing
                                , isSaving = model.isSaving
                                }
                            ]
            ]
        ]


preferenceToggle :
    { label : String
    , description : String
    , isEnabled : Bool
    , onToggle : Bool -> Msg
    , isSaving : Bool
    }
    -> Html Msg
preferenceToggle config =
    div [ class "flex items-start justify-between py-4 border-b border-gray-100 last:border-0" ]
        [ div [ class "flex-1 pr-4" ]
            [ p [ class "font-medium text-gray-900" ] [ text config.label ]
            , p [ class "text-sm text-gray-500 mt-1" ] [ text config.description ]
            ]
        , label [ class "relative inline-flex items-center cursor-pointer" ]
            [ input
                [ type_ "checkbox"
                , class "sr-only peer"
                , checked config.isEnabled
                , onCheck config.onToggle
                , disabled config.isSaving
                ]
                []
            , div
                [ class
                    (String.join " "
                        [ "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-anthro-dark/20 rounded-full peer"
                        , "peer-checked:after:translate-x-full peer-checked:after:border-white"
                        , "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        , "peer-checked:bg-anthro-dark"
                        , if config.isSaving then
                            "opacity-50"

                          else
                            ""
                        ]
                    )
                ]
                []
            ]
        ]
