module Pages.Dashboard exposing (Model, Msg, init, update, view)

import Api.Students
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onSubmit)
import Http
import Route
import Types exposing (RemoteData(..), Student)


type alias Model =
    { students : RemoteData String (List Student)
    , showAddModal : Bool
    , newStudentChessCom : String
    , addError : Maybe String
    , isAdding : Bool
    }


init : String -> String -> ( Model, Cmd Msg )
init apiUrl token =
    ( { students = Loading
      , showAddModal = False
      , newStudentChessCom = ""
      , addError = Nothing
      , isAdding = False
      }
    , Api.Students.getStudents
        { apiUrl = apiUrl
        , token = token
        , onResponse = GotStudents
        }
    )


type Msg
    = GotStudents (Result Http.Error (List Student))
    | ShowAddModal
    | HideAddModal
    | NewStudentChessComChanged String
    | SubmitNewStudent { apiUrl : String, token : String }
    | GotNewStudent (Result Http.Error Student)


update : String -> String -> Msg -> Model -> ( Model, Cmd Msg )
update apiUrl token msg model =
    case msg of
        GotStudents result ->
            case result of
                Ok students ->
                    ( { model | students = Success students }, Cmd.none )

                Err error ->
                    ( { model | students = Failure (httpErrorToString error) }, Cmd.none )

        ShowAddModal ->
            ( { model
                | showAddModal = True
                , newStudentChessCom = ""
                , addError = Nothing
              }
            , Cmd.none
            )

        HideAddModal ->
            ( { model | showAddModal = False }, Cmd.none )

        NewStudentChessComChanged username ->
            ( { model | newStudentChessCom = username, addError = Nothing }, Cmd.none )

        SubmitNewStudent config ->
            if String.isEmpty model.newStudentChessCom then
                ( { model | addError = Just "Please enter a Chess.com username" }, Cmd.none )

            else
                ( { model | isAdding = True, addError = Nothing }
                , Api.Students.createStudent
                    { apiUrl = config.apiUrl
                    , token = config.token
                    , chessComUsername = model.newStudentChessCom
                    , onResponse = GotNewStudent
                    }
                )

        GotNewStudent result ->
            case result of
                Ok newStudent ->
                    let
                        updatedStudents =
                            case model.students of
                                Success students ->
                                    Success (students ++ [ newStudent ])

                                _ ->
                                    Success [ newStudent ]
                    in
                    ( { model
                        | students = updatedStudents
                        , showAddModal = False
                        , isAdding = False
                        , newStudentChessCom = ""
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | isAdding = False
                        , addError = Just (httpErrorToString error)
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
            "Network error"

        Http.BadStatus status ->
            "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error: " ++ message


view : String -> String -> Model -> Html Msg
view apiUrl token model =
    div []
        [ -- Header
          div [ class "flex items-center justify-between mb-8" ]
            [ h1 [ class "text-2xl font-serif font-semibold text-anthro-dark" ] [ text "Your Students" ]
            , button
                [ onClick ShowAddModal
                , class "bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                ]
                [ span [ class "text-lg" ] [ text "+" ]
                , text "Add Student"
                ]
            ]

        -- Student list
        , case model.students of
            NotAsked ->
                text ""

            Loading ->
                div [ class "text-center py-12 text-gray-500" ]
                    [ text "Loading students..." ]

            Failure error ->
                div [ class "text-center py-12" ]
                    [ div [ class "text-red-600 mb-4" ] [ text error ]
                    ]

            Success students ->
                if List.isEmpty students then
                    viewEmptyState

                else
                    div [ class "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ]
                        (List.map viewStudentCard students)

        -- Add student modal
        , if model.showAddModal then
            viewAddModal apiUrl token model

          else
            text ""
        ]


viewEmptyState : Html Msg
viewEmptyState =
    div [ class "text-center py-12 bg-white rounded-lg border border-gray-200" ]
        [ div [ class "text-gray-400 text-5xl mb-4" ] [ text "+" ]
        , h3 [ class "text-lg font-medium text-gray-900 mb-2" ] [ text "No students yet" ]
        , p [ class "text-gray-600 mb-6" ] [ text "Add your first student to start tracking their progress" ]
        , button
            [ onClick ShowAddModal
            , class "bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
            ]
            [ text "Add Student" ]
        ]


viewStudentCard : Student -> Html Msg
viewStudentCard student =
    a
        [ Route.href (Route.StudentDetail student.id)
        , class "block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-orange-300 hover:shadow-lg transition-all group"
        ]
        [ -- Card header with gradient accent
          div [ class "h-1 bg-gradient-to-r from-orange-400 to-orange-500" ] []

        -- Main content
        , div [ class "p-5" ]
            [ -- Avatar and name row
              div [ class "flex items-center gap-4" ]
                [ -- Avatar
                  case student.avatarUrl of
                    Just url ->
                        img
                            [ src url
                            , alt student.displayName
                            , class "w-14 h-14 rounded-full object-cover"
                            ]
                            []

                    Nothing ->
                        div [ class "w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center" ]
                            [ span [ class "text-orange-600 font-semibold text-xl" ]
                                [ text (getInitials student.displayName) ]
                            ]

                -- Name and username
                , div [ class "flex-1" ]
                    [ h3 [ class "font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors" ]
                        [ text student.displayName ]
                    , case student.chessComUsername of
                        Just username ->
                            div [ class "text-sm text-gray-500" ]
                                [ text username ]

                        Nothing ->
                            text ""
                    ]

                -- Arrow indicator
                , span [ class "text-gray-300 group-hover:text-orange-400 transition-colors text-2xl" ] [ text ">" ]
                ]

            -- Status row
            , div [ class "mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm" ]
                [ case student.lastImportedAt of
                    Just _ ->
                        span [ class "text-green-600 flex items-center gap-1" ]
                            [ span [ class "w-2 h-2 bg-green-500 rounded-full" ] []
                            , text "Games imported"
                            ]

                    Nothing ->
                        span [ class "text-gray-400 flex items-center gap-1" ]
                            [ span [ class "w-2 h-2 bg-gray-300 rounded-full" ] []
                            , text "Awaiting import"
                            ]
                , span [ class "text-gray-400" ] [ text "Click to view games" ]
                ]
            ]
        ]


getInitials : String -> String
getInitials name =
    name
        |> String.words
        |> List.map (String.left 1 >> String.toUpper)
        |> List.take 2
        |> String.join ""


viewAddModal : String -> String -> Model -> Html Msg
viewAddModal apiUrl token model =
    div [ class "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" ]
        [ div [ class "bg-white rounded-lg shadow-lg max-w-md w-full mx-4" ]
            [ -- Header
              div [ class "flex items-center justify-between p-4 border-b border-gray-200" ]
                [ h2 [ class "text-lg font-medium text-gray-900" ] [ text "Add Student" ]
                , button
                    [ onClick HideAddModal
                    , class "text-gray-400 hover:text-gray-600"
                    ]
                    [ text "X" ]
                ]

            -- Form
            , Html.form [ onSubmit (SubmitNewStudent { apiUrl = apiUrl, token = token }), class "p-4" ]
                [ -- Error message
                  case model.addError of
                    Just errorMsg ->
                        div [ class "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                            [ text errorMsg ]

                    Nothing ->
                        text ""

                -- Chess.com username
                , div [ class "mb-4" ]
                    [ label [ class "block text-sm font-medium text-gray-700 mb-1" ]
                        [ text "Chess.com username" ]
                    , input
                        [ type_ "text"
                        , class "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                        , placeholder "username"
                        , value model.newStudentChessCom
                        , onInput NewStudentChessComChanged
                        , disabled model.isAdding
                        ]
                        []
                    ]

                -- Info note
                , div [ class "mb-6 flex items-start gap-2 text-sm text-gray-500" ]
                    [ span [ class "text-blue-500" ] [ text "i" ]
                    , text "Name and avatar will be fetched automatically from Chess.com"
                    ]

                -- Buttons
                , div [ class "flex justify-end gap-3" ]
                    [ button
                        [ type_ "button"
                        , onClick HideAddModal
                        , class "px-4 py-2 text-gray-700 hover:text-gray-900"
                        , disabled model.isAdding
                        ]
                        [ text "Cancel" ]
                    , button
                        [ type_ "submit"
                        , class "bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                        , disabled model.isAdding
                        ]
                        [ if model.isAdding then
                            text "Adding..."

                          else
                            text "Add Student"
                        ]
                    ]
                ]
            ]
        ]
