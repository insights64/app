module Pages.Dashboard exposing (Model, Msg, init, update, view)

import Api.Students
import Chart as C
import Chart.Attributes as CA
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onSubmit)
import Http
import Route
import Types exposing (Game, RatingHistory, RemoteData(..), Student)


type alias Model =
    { students : RemoteData String (List Student)
    , studentRatings : Dict String (List RatingHistory)
    , studentGames : Dict String (List Game)
    , showAddModal : Bool
    , newStudentChessCom : String
    , newStudentLichess : String
    , addError : Maybe String
    , isAdding : Bool
    }


init : String -> ( Model, Cmd Msg )
init token =
    ( { students = Loading
      , studentRatings = Dict.empty
      , studentGames = Dict.empty
      , showAddModal = False
      , newStudentChessCom = ""
      , newStudentLichess = ""
      , addError = Nothing
      , isAdding = False
      }
    , Api.Students.getStudents
        { token = token
        , onResponse = GotStudents
        }
    )


type Msg
    = GotStudents (Result Http.Error (List Student))
    | GotStudentRatings String (Result Http.Error (List RatingHistory))
    | GotStudentGames String (Result Http.Error (List Game))
    | ShowAddModal
    | HideAddModal
    | NewStudentChessComChanged String
    | NewStudentLichessChanged String
    | SubmitNewStudent String
    | GotNewStudent (Result Http.Error Student)


update : String -> Msg -> Model -> ( Model, Cmd Msg )
update token msg model =
    case msg of
        GotStudents result ->
            case result of
                Ok students ->
                    -- Fetch ratings and games for each student
                    let
                        ratingsCmds =
                            students
                                |> List.map
                                    (\student ->
                                        Api.Students.getStudentRatings
                                            { token = token
                                            , studentId = student.id
                                            , onResponse = GotStudentRatings student.id
                                            }
                                    )

                        gamesCmds =
                            students
                                |> List.map
                                    (\student ->
                                        Api.Students.getStudentGames
                                            { token = token
                                            , studentId = student.id
                                            , onResponse = GotStudentGames student.id
                                            }
                                    )
                    in
                    ( { model | students = Success students }, Cmd.batch (ratingsCmds ++ gamesCmds) )

                Err error ->
                    ( { model | students = Failure (httpErrorToString error) }, Cmd.none )

        GotStudentRatings studentId result ->
            case result of
                Ok ratings ->
                    ( { model | studentRatings = Dict.insert studentId ratings model.studentRatings }, Cmd.none )

                Err _ ->
                    -- Silently ignore rating fetch errors
                    ( model, Cmd.none )

        GotStudentGames studentId result ->
            case result of
                Ok games ->
                    ( { model | studentGames = Dict.insert studentId games model.studentGames }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )

        ShowAddModal ->
            ( { model
                | showAddModal = True
                , newStudentChessCom = ""
                , newStudentLichess = ""
                , addError = Nothing
              }
            , Cmd.none
            )

        HideAddModal ->
            ( { model | showAddModal = False }, Cmd.none )

        NewStudentChessComChanged username ->
            ( { model | newStudentChessCom = username, addError = Nothing }, Cmd.none )

        NewStudentLichessChanged username ->
            ( { model | newStudentLichess = username, addError = Nothing }, Cmd.none )

        SubmitNewStudent tkn ->
            if String.isEmpty model.newStudentChessCom && String.isEmpty model.newStudentLichess then
                ( { model | addError = Just "Please enter at least one chess username" }, Cmd.none )

            else
                ( { model | isAdding = True, addError = Nothing }
                , Api.Students.createStudent
                    { token = tkn
                    , chessComUsername =
                        if String.isEmpty model.newStudentChessCom then
                            Nothing

                        else
                            Just model.newStudentChessCom
                    , lichessUsername =
                        if String.isEmpty model.newStudentLichess then
                            Nothing

                        else
                            Just model.newStudentLichess
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
                        , newStudentLichess = ""
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


view : String -> Model -> Html Msg
view token model =
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
                        (List.map (viewStudentCard model.studentRatings model.studentGames) students)

        -- Add student modal
        , if model.showAddModal then
            viewAddModal token model

          else
            text ""
        ]


viewEmptyState : Html Msg
viewEmptyState =
    div [ class "text-center py-12 bg-white rounded-lg border border-gray-200" ]
        [ div [ class "text-gray-400 text-5xl mb-4" ] [ text "♞" ]
        , h3 [ class "text-lg font-medium text-gray-900 mb-2" ] [ text "No students yet" ]
        , p [ class "text-gray-600 mb-6" ] [ text "Add your first student to start tracking their progress" ]
        , button
            [ onClick ShowAddModal
            , class "bg-anthro-orange hover:bg-anthro-orange-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
            ]
            [ text "Add Student" ]
        ]


viewStudentCard : Dict String (List RatingHistory) -> Dict String (List Game) -> Student -> Html Msg
viewStudentCard ratingsDict gamesDict student =
    let
        -- Get ratings for this student (prefer rapid over other time controls)
        studentRatings =
            Dict.get student.id ratingsDict
                |> Maybe.withDefault []

        -- Get games for this student
        studentGames =
            Dict.get student.id gamesDict
                |> Maybe.withDefault []

        -- Find the best rating to display (prefer rapid, then blitz, then bullet)
        primaryRating =
            findRatingByTimeControl "rapid" studentRatings
                |> orElse (findRatingByTimeControl "blitz" studentRatings)
                |> orElse (findRatingByTimeControl "bullet" studentRatings)
                |> orElse (List.head studentRatings)

        currentRating =
            primaryRating
                |> Maybe.map .rating
                |> Maybe.withDefault 0

        gamesPlayed =
            primaryRating
                |> Maybe.andThen .gamesPlayed
                |> Maybe.withDefault 0

        ( wins, losses, draws ) =
            case primaryRating of
                Just r ->
                    ( Maybe.withDefault 0 r.win
                    , Maybe.withDefault 0 r.loss
                    , Maybe.withDefault 0 r.draw
                    )

                Nothing ->
                    ( 0, 0, 0 )

        timeControlLabel =
            case primaryRating of
                Just r ->
                    String.toUpper r.timeControl

                Nothing ->
                    "RATING"

        hasRatings =
            currentRating > 0

        -- Extract rating history from games
        ratingData =
            extractRatingsFromGames student studentGames
    in
    a
        [ Route.href (Route.StudentDetail student.id)
        , class "block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-orange-300 hover:shadow-lg transition-all group"
        ]
        [ -- Card header with gradient accent
          div [ class "h-1 bg-gradient-to-r from-orange-400 to-orange-500" ] []

        -- Main content
        , div [ class "p-5" ]
            [ -- Top row: Avatar, name, platforms
              div [ class "flex items-start justify-between mb-4" ]
                [ div [ class "flex items-center gap-3" ]
                    [ -- Avatar: show image if available, otherwise initials
                      case student.avatarUrl of
                        Just url ->
                            img
                                [ src url
                                , alt student.displayName
                                , class "w-12 h-12 rounded-full object-cover"
                                ]
                                []

                        Nothing ->
                            div [ class "w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center" ]
                                [ span [ class "text-orange-600 font-semibold text-lg" ]
                                    [ text (getInitials student.displayName) ]
                                ]
                    , div []
                        [ h3 [ class "font-semibold text-gray-900 group-hover:text-orange-600 transition-colors" ]
                            [ text student.displayName ]
                        , div [ class "flex items-center gap-2 text-sm text-gray-500" ]
                            [ viewPlatformBadges student
                            ]
                        ]
                    ]
                , -- Arrow indicator
                  span [ class "text-gray-300 group-hover:text-orange-400 transition-colors text-xl" ] [ text "→" ]
                ]

            -- Rating display with mini chart
            , div [ class "mb-4" ]
                [ if hasRatings then
                    div [ class "flex items-center justify-between" ]
                        [ div [ class "flex items-baseline gap-2" ]
                            [ span [ class "text-3xl font-bold text-gray-900" ]
                                [ text (String.fromInt currentRating) ]
                            , span [ class "text-sm text-gray-500" ]
                                [ text timeControlLabel ]
                            ]
                        , -- Mini rating chart
                          if List.length ratingData >= 2 then
                            viewMiniRatingChart ratingData

                          else
                            text ""
                        ]

                  else
                    div [ class "text-sm text-gray-400" ] [ text "Awaiting import..." ]
                ]

            -- Stats row
            , div [ class "flex items-center justify-between pt-4 border-t border-gray-100" ]
                [ viewStatPill "Games" (String.fromInt gamesPlayed) "bg-blue-50 text-blue-700"
                , viewStatPill "Wins" (String.fromInt wins) "bg-green-50 text-green-700"
                , viewStatPill "Losses" (String.fromInt losses) "bg-red-50 text-red-700"
                , viewStatPill "Draws" (String.fromInt draws) "bg-gray-100 text-gray-700"
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


orElse : Maybe a -> Maybe a -> Maybe a
orElse fallback primary =
    case primary of
        Just _ ->
            primary

        Nothing ->
            fallback


findRatingByTimeControl : String -> List RatingHistory -> Maybe RatingHistory
findRatingByTimeControl timeControl ratings =
    ratings
        |> List.filter (\r -> r.timeControl == timeControl)
        |> List.head


viewPlatformBadges : Student -> Html Msg
viewPlatformBadges student =
    div [ class "flex items-center gap-2" ]
        [ case student.chessComUsername of
            Just username ->
                span [ class "text-sm text-anthro-gray" ]
                    [ text username ]

            Nothing ->
                text ""
        , case student.lichessUsername of
            Just username ->
                span [ class "text-sm text-anthro-gray" ]
                    [ text username ]

            Nothing ->
                text ""
        ]


viewStatPill : String -> String -> String -> Html Msg
viewStatPill label value colorClass =
    div [ class ("flex flex-col items-center px-3 py-1.5 rounded-lg " ++ colorClass) ]
        [ span [ class "text-xs opacity-75" ] [ text label ]
        , span [ class "font-semibold text-sm" ] [ text value ]
        ]


viewLastActive : Student -> Html Msg
viewLastActive student =
    let
        lastActivity =
            case student.lastImportedAt of
                Just date ->
                    "Active " ++ formatRelativeDate date

                Nothing ->
                    "New student"
    in
    div [ class "flex flex-col items-center px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600" ]
        [ span [ class "text-xs opacity-75" ] [ text "Status" ]
        , span [ class "font-medium text-xs" ] [ text lastActivity ]
        ]


formatRelativeDate : String -> String
formatRelativeDate dateStr =
    -- Simple relative date - just show "recently" for now
    -- In a real app, you'd calculate the actual difference
    "recently"


viewAddModal : String -> Model -> Html Msg
viewAddModal token model =
    div [ class "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" ]
        [ div [ class "bg-white rounded-lg shadow-lg max-w-md w-full mx-4" ]
            [ -- Header
              div [ class "flex items-center justify-between p-4 border-b border-gray-200" ]
                [ h2 [ class "text-lg font-medium text-gray-900" ] [ text "Add Student" ]
                , button
                    [ onClick HideAddModal
                    , class "text-gray-400 hover:text-gray-600"
                    ]
                    [ text "✕" ]
                ]

            -- Form
            , Html.form [ onSubmit (SubmitNewStudent token), class "p-4" ]
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
                    , div [ class "relative" ]
                        [ input
                            [ type_ "text"
                            , class "w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            , placeholder "username"
                            , value model.newStudentChessCom
                            , onInput NewStudentChessComChanged
                            , disabled model.isAdding
                            ]
                            []
                        , span [ class "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" ] [ text "♞" ]
                        ]
                    ]

                -- Lichess username
                , div [ class "mb-4" ]
                    [ label [ class "block text-sm font-medium text-gray-700 mb-1" ]
                        [ text "Lichess username" ]
                    , div [ class "relative" ]
                        [ input
                            [ type_ "text"
                            , class "w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            , placeholder "username"
                            , value model.newStudentLichess
                            , onInput NewStudentLichessChanged
                            , disabled model.isAdding
                            ]
                            []
                        , span [ class "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" ] [ text "♘" ]
                        ]
                    ]

                -- Info note
                , div [ class "mb-6 flex items-start gap-2 text-sm text-gray-500" ]
                    [ span [ class "text-blue-500" ] [ text "ℹ" ]
                    , text "Name and avatar will be fetched automatically from the chess platform"
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


-- Rating chart data point
type alias RatingPoint =
    { x : Float
    , y : Float
    }


-- Extract the student's rating from each game
extractRatingsFromGames : Student -> List Game -> List RatingPoint
extractRatingsFromGames student games =
    let
        -- Get the student's chess.com username (lowercase for comparison)
        studentUsername =
            student.chessComUsername
                |> Maybe.map String.toLower

        -- Extract rating from a game based on which side the student played
        getRating : Game -> Maybe Int
        getRating game =
            case studentUsername of
                Just username ->
                    if String.toLower game.whiteUsername == username then
                        game.whiteElo

                    else if String.toLower game.blackUsername == username then
                        game.blackElo

                    else
                        Nothing

                Nothing ->
                    Nothing

        -- Convert games to rating points (sorted by date, oldest first)
        gamesWithRatings =
            games
                |> List.reverse
                |> List.filterMap
                    (\game ->
                        getRating game
                            |> Maybe.map (\rating -> rating)
                    )
                |> List.indexedMap
                    (\idx rating ->
                        { x = toFloat idx
                        , y = toFloat rating
                        }
                    )
    in
    gamesWithRatings


-- Mini rating chart for the student card
viewMiniRatingChart : List RatingPoint -> Html Msg
viewMiniRatingChart data =
    div [ class "w-24 h-12" ]
        [ C.chart
            [ CA.width 96
            , CA.height 48
            , CA.margin { top = 2, bottom = 2, left = 2, right = 2 }
            , CA.padding { top = 2, bottom = 2, left = 2, right = 2 }
            ]
            [ C.series .x
                [ C.interpolated .y
                    [ CA.color "#f97316"
                    , CA.width 2
                    ]
                    []
                ]
                data
            ]
        ]
