module Pages.Dashboard exposing (Model, Msg, init, update, view)

import Api.Students
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode
import Route
import Types exposing (RemoteData(..), Student)



-- ============================================================================
-- MODEL
-- ============================================================================


type alias Model =
    { students : RemoteData String (List Student)
    , showAddModal : Bool
    , newStudentChessCom : String
    , addError : Maybe String
    , isAdding : Bool
    , sortBy : SortOption
    , filterBy : FilterOption
    }


type SortOption
    = SortRecent
    | SortAlphabetical
    | SortNeedsAttention


type FilterOption
    = FilterAll
    | FilterActive
    | FilterInactive



-- ============================================================================
-- INIT
-- ============================================================================


init : String -> String -> ( Model, Cmd Msg )
init apiUrl token =
    ( { students = Loading
      , showAddModal = False
      , newStudentChessCom = ""
      , addError = Nothing
      , isAdding = False
      , sortBy = SortRecent
      , filterBy = FilterAll
      }
    , Api.Students.getStudents
        { apiUrl = apiUrl
        , token = token
        , onResponse = GotStudents
        }
    )



-- ============================================================================
-- MSG & UPDATE
-- ============================================================================


type Msg
    = GotStudents (Result Http.Error (List Student))
    | ShowAddModal
    | HideAddModal
    | NewStudentChessComChanged String
    | SubmitNewStudent { apiUrl : String, token : String }
    | GotNewStudent (Result Http.Error Student)
    | SetSortBy SortOption
    | SetFilterBy FilterOption


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

        SetSortBy option ->
            ( { model | sortBy = option }, Cmd.none )

        SetFilterBy option ->
            ( { model | filterBy = option }, Cmd.none )


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



-- ============================================================================
-- HELPERS
-- ============================================================================


sortStudents : SortOption -> List Student -> List Student
sortStudents option students =
    case option of
        SortRecent ->
            -- Sort by lastImportedAt descending (most recent first)
            List.sortBy
                (\s ->
                    case s.lastImportedAt of
                        Just date ->
                            -- Negate to reverse sort (most recent first)
                            date

                        Nothing ->
                            "0000-00-00"
                )
                students
                |> List.reverse

        SortAlphabetical ->
            List.sortBy .displayName students

        SortNeedsAttention ->
            -- For now, sort by those without imports first (they need attention)
            List.sortBy
                (\s ->
                    case s.lastImportedAt of
                        Just _ ->
                            1

                        Nothing ->
                            0
                )
                students


filterStudents : FilterOption -> List Student -> List Student
filterStudents option students =
    case option of
        FilterAll ->
            students

        FilterActive ->
            List.filter (\s -> s.lastImportedAt /= Nothing) students

        FilterInactive ->
            List.filter (\s -> s.lastImportedAt == Nothing) students


getInitials : String -> String
getInitials name =
    name
        |> String.words
        |> List.map (String.left 1 >> String.toUpper)
        |> List.take 2
        |> String.join ""


formatRelativeTime : Maybe String -> String
formatRelativeTime maybeDate =
    case maybeDate of
        Just date ->
            -- Simple formatting - just show the date for now
            "Last sync: " ++ String.left 10 date

        Nothing ->
            "Not synced yet"



-- ============================================================================
-- VIEW
-- ============================================================================


view : String -> String -> Model -> Html Msg
view apiUrl token model =
    div [ class "min-h-screen" ]
        [ -- Dashboard content
          case model.students of
            NotAsked ->
                text ""

            Loading ->
                viewLoading

            Failure error ->
                viewError error

            Success students ->
                if List.isEmpty students then
                    viewEmptyState

                else
                    viewDashboard model students

        -- Add student modal
        , if model.showAddModal then
            viewAddModal apiUrl token model

          else
            text ""
        ]


viewLoading : Html Msg
viewLoading =
    div [ class "py-12" ]
        [ div [ class "animate-pulse space-y-6" ]
            [ -- Header skeleton
              div [ class "flex items-center justify-between" ]
                [ div [ class "space-y-2" ]
                    [ div [ class "h-8 w-48 bg-gray-200 rounded" ] []
                    , div [ class "h-4 w-64 bg-gray-200 rounded" ] []
                    ]
                , div [ class "h-10 w-32 bg-gray-200 rounded-lg" ] []
                ]

            -- Card skeletons
            , div [ class "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" ]
                (List.repeat 3
                    (div [ class "bg-white rounded-xl border border-gray-200 p-5" ]
                        [ div [ class "flex items-center gap-4 mb-4" ]
                            [ div [ class "w-14 h-14 bg-gray-200 rounded-full" ] []
                            , div [ class "flex-1 space-y-2" ]
                                [ div [ class "h-5 w-32 bg-gray-200 rounded" ] []
                                , div [ class "h-4 w-24 bg-gray-200 rounded" ] []
                                ]
                            ]
                        , div [ class "grid grid-cols-3 gap-3" ]
                            [ div [ class "h-16 bg-gray-100 rounded-lg" ] []
                            , div [ class "h-16 bg-gray-100 rounded-lg" ] []
                            , div [ class "h-16 bg-gray-100 rounded-lg" ] []
                            ]
                        ]
                    )
                )
            ]
        ]


viewError : String -> Html Msg
viewError error =
    div [ class "py-12 text-center" ]
        [ div [ class "inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4" ]
            [ span [ class "text-2xl" ] [ text "!" ]
            ]
        , h3 [ class "text-lg font-medium text-gray-900 mb-2" ] [ text "Failed to load students" ]
        , p [ class "text-red-600" ] [ text error ]
        ]


viewDashboard : Model -> List Student -> Html Msg
viewDashboard model students =
    let
        filteredStudents =
            students
                |> filterStudents model.filterBy
                |> sortStudents model.sortBy

        studentCount =
            List.length students

        activeCount =
            List.length (List.filter (\s -> s.lastImportedAt /= Nothing) students)
    in
    div []
        [ -- Header with title and add button
          div [ class "mb-8" ]
            [ div [ class "flex items-start justify-between" ]
                [ div []
                    [ h1 [ class "text-2xl font-bold text-gray-900" ] [ text "Your Students" ]
                    , p [ class "text-gray-500 mt-1" ]
                        [ text (String.fromInt studentCount ++ " student" ++ pluralize studentCount)
                        , if activeCount > 0 then
                            span [ class "text-gray-400" ]
                                [ text (" · " ++ String.fromInt activeCount ++ " with games imported") ]

                          else
                            text ""
                        ]
                    ]
                , button
                    [ onClick ShowAddModal
                    , class "bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2"
                    ]
                    [ span [ class "text-lg leading-none" ] [ text "+" ]
                    , text "Add Student"
                    ]
                ]

            -- Sort/Filter controls (shown when 3+ students)
            , if studentCount >= 3 then
                div [ class "flex items-center gap-4 mt-4 pt-4 border-t border-gray-100" ]
                    [ div [ class "flex items-center gap-2" ]
                        [ span [ class "text-sm text-gray-500" ] [ text "Sort:" ]
                        , select
                            [ class "text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                            , onInput
                                (\str ->
                                    case str of
                                        "recent" ->
                                            SetSortBy SortRecent

                                        "alphabetical" ->
                                            SetSortBy SortAlphabetical

                                        "attention" ->
                                            SetSortBy SortNeedsAttention

                                        _ ->
                                            SetSortBy SortRecent
                                )
                            ]
                            [ option [ value "recent", selected (model.sortBy == SortRecent) ] [ text "Recent Activity" ]
                            , option [ value "alphabetical", selected (model.sortBy == SortAlphabetical) ] [ text "Alphabetical" ]
                            , option [ value "attention", selected (model.sortBy == SortNeedsAttention) ] [ text "Needs Attention" ]
                            ]
                        ]
                    , div [ class "flex items-center gap-2" ]
                        [ span [ class "text-sm text-gray-500" ] [ text "Filter:" ]
                        , select
                            [ class "text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                            , onInput
                                (\str ->
                                    case str of
                                        "all" ->
                                            SetFilterBy FilterAll

                                        "active" ->
                                            SetFilterBy FilterActive

                                        "inactive" ->
                                            SetFilterBy FilterInactive

                                        _ ->
                                            SetFilterBy FilterAll
                                )
                            ]
                            [ option [ value "all", selected (model.filterBy == FilterAll) ] [ text "All Students" ]
                            , option [ value "active", selected (model.filterBy == FilterActive) ] [ text "Active" ]
                            , option [ value "inactive", selected (model.filterBy == FilterInactive) ] [ text "Needs Setup" ]
                            ]
                        ]
                    ]

              else
                text ""
            ]

        -- Student cards grid
        , if List.isEmpty filteredStudents then
            div [ class "text-center py-12 bg-white rounded-xl border border-gray-200" ]
                [ p [ class "text-gray-500" ] [ text "No students match the current filter" ]
                , button
                    [ onClick (SetFilterBy FilterAll)
                    , class "mt-2 text-sm text-gray-600 hover:text-gray-900 underline"
                    ]
                    [ text "Show all students" ]
                ]

          else
            div
                [ class
                    (if studentCount == 1 then
                        "max-w-md"

                     else if studentCount == 2 then
                        "grid grid-cols-1 md:grid-cols-2 gap-4"

                     else
                        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    )
                ]
                (List.map viewStudentCard filteredStudents)
        ]


viewStudentCard : Student -> Html Msg
viewStudentCard student =
    let
        needsSetup =
            student.lastImportedAt == Nothing

        statusInfo =
            if needsSetup then
                { dotColor = "bg-amber-400"
                , statusText = "Awaiting import"
                , statusClass = "text-amber-600"
                }

            else
                { dotColor = "bg-green-500"
                , statusText = "Games imported"
                , statusClass = "text-green-600"
                }
    in
    a
        [ Route.href (Route.StudentDetail student.id)
        , class
            ("block bg-white rounded-xl border overflow-hidden transition-all group "
                ++ (if needsSetup then
                        "border-l-4 border-l-amber-400 border-gray-200 hover:border-gray-300 hover:shadow-md"

                    else
                        "border-gray-200 hover:border-gray-300 hover:shadow-md"
                   )
            )
        ]
        [ div [ class "p-5" ]
            [ -- Header: Avatar, name, last active
              div [ class "flex items-start gap-4" ]
                [ -- Avatar
                  case student.avatarUrl of
                    Just url ->
                        img
                            [ src url
                            , alt student.displayName
                            , class "w-14 h-14 rounded-full object-cover flex-shrink-0"
                            ]
                            []

                    Nothing ->
                        div [ class "w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0" ]
                            [ span [ class "text-gray-600 font-semibold text-xl" ]
                                [ text (getInitials student.displayName) ]
                            ]

                -- Name and username
                , div [ class "flex-1 min-w-0" ]
                    [ h3 [ class "font-semibold text-gray-900 group-hover:text-gray-700 transition-colors truncate" ]
                        [ text student.displayName ]
                    , case student.chessComUsername of
                        Just username ->
                            p [ class "text-sm text-gray-500 truncate" ]
                                [ text ("@" ++ username) ]

                        Nothing ->
                            text ""
                    ]

                -- Last active (right side)
                , div [ class "text-right flex-shrink-0" ]
                    [ p [ class "text-xs text-gray-400" ]
                        [ text
                            (case student.lastImportedAt of
                                Just date ->
                                    String.left 10 date

                                Nothing ->
                                    "Not synced"
                            )
                        ]
                    ]
                ]

            -- Stats row (placeholder - will be populated when API supports it)
            , div [ class "grid grid-cols-3 gap-3 mt-4" ]
                [ viewStatCell "—" "games" Nothing
                , viewStatCell "—" "win rate" Nothing
                , viewStatCell "—" "accuracy" Nothing
                ]

            -- Alert row (shown when student needs attention)
            , if needsSetup then
                div [ class "mt-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2" ]
                    [ span [] [ text "!" ]
                    , text "Games not imported yet"
                    ]

              else
                text ""

            -- Footer: CTA and sync status
            , div [ class "mt-4 pt-4 border-t border-gray-100 flex items-center justify-between" ]
                [ span [ class "text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" ]
                    [ text "View Games →" ]
                , span [ class ("text-xs flex items-center gap-1.5 " ++ statusInfo.statusClass) ]
                    [ span [ class ("w-1.5 h-1.5 rounded-full " ++ statusInfo.dotColor) ] []
                    , text statusInfo.statusText
                    ]
                ]
            ]
        ]


viewStatCell : String -> String -> Maybe String -> Html Msg
viewStatCell value label maybeTrend =
    div [ class "bg-gray-50 rounded-lg p-3 text-center" ]
        [ div [ class "text-lg font-bold text-gray-900" ] [ text value ]
        , div [ class "text-xs text-gray-500 mt-0.5" ] [ text label ]
        , case maybeTrend of
            Just trend ->
                div
                    [ class
                        (if String.startsWith "+" trend then
                            "text-xs text-green-600 font-medium mt-1"

                         else if String.startsWith "-" trend then
                            "text-xs text-red-600 font-medium mt-1"

                         else
                            "text-xs text-gray-400 mt-1"
                        )
                    ]
                    [ text trend ]

            Nothing ->
                text ""
        ]


viewEmptyState : Html Msg
viewEmptyState =
    div [ class "py-16" ]
        [ div [ class "max-w-md mx-auto text-center" ]
            [ -- Icon
              div [ class "w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center" ]
                [ span [ class "text-4xl" ] [ text "+" ]
                ]

            -- Text
            , h2 [ class "text-xl font-bold text-gray-900 mb-2" ]
                [ text "No students yet" ]
            , p [ class "text-gray-500 mb-8" ]
                [ text "Add your first student to start tracking their chess progress and identifying areas for improvement." ]

            -- CTA
            , button
                [ onClick ShowAddModal
                , class "bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                ]
                [ span [ class "text-lg leading-none" ] [ text "+" ]
                , text "Add Student"
                ]
            ]
        ]


viewAddModal : String -> String -> Model -> Html Msg
viewAddModal apiUrl token model =
    div
        [ class "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        , onClick HideAddModal
        ]
        [ div
            [ class "bg-white rounded-xl shadow-xl max-w-md w-full"
            , Html.Events.stopPropagationOn "click" (Decode.succeed ( HideAddModal, False ))
            ]
            [ -- Header
              div [ class "flex items-center justify-between p-5 border-b border-gray-100" ]
                [ h2 [ class "text-lg font-semibold text-gray-900" ] [ text "Add Student" ]
                , button
                    [ onClick HideAddModal
                    , class "text-gray-400 hover:text-gray-600 p-1"
                    ]
                    [ text "✕" ]
                ]

            -- Form
            , Html.form
                [ onSubmit (SubmitNewStudent { apiUrl = apiUrl, token = token })
                , class "p-5"
                , Html.Events.stopPropagationOn "click" (Decode.succeed ( HideAddModal, False ))
                ]
                [ -- Error message
                  case model.addError of
                    Just errorMsg ->
                        div [ class "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                            [ text errorMsg ]

                    Nothing ->
                        text ""

                -- Chess.com username input
                , div [ class "mb-4" ]
                    [ label [ class "block text-sm font-medium text-gray-700 mb-1.5" ]
                        [ text "Chess.com Username" ]
                    , input
                        [ type_ "text"
                        , class "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-shadow"
                        , placeholder "Enter username"
                        , value model.newStudentChessCom
                        , onInput NewStudentChessComChanged
                        , disabled model.isAdding
                        ]
                        []
                    ]

                -- Info note
                , div [ class "mb-6 flex items-start gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3" ]
                    [ span [ class "text-blue-500 flex-shrink-0" ] [ text "i" ]
                    , text "Name and avatar will be fetched automatically from Chess.com"
                    ]

                -- Buttons
                , div [ class "flex justify-end gap-3" ]
                    [ button
                        [ type_ "button"
                        , onClick HideAddModal
                        , class "px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        , disabled model.isAdding
                        ]
                        [ text "Cancel" ]
                    , button
                        [ type_ "submit"
                        , class "bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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


pluralize : Int -> String
pluralize count =
    if count == 1 then
        ""

    else
        "s"
