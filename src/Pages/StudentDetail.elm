module Pages.StudentDetail exposing (Model, Msg, init, update, view)

import Api.Students
import Chart as C
import Chart.Attributes as CA
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Http
import Route
import Types exposing (Game, RemoteData(..), Student, WeaknessSummary)


type alias Model =
    { studentId : String
    , student : RemoteData String Student
    , weaknesses : RemoteData String (List WeaknessSummary)
    , games : RemoteData String (List Game)
    , platformFilter : PlatformFilter
    }


type PlatformFilter
    = Combined
    | ChessComOnly
    | LichessOnly


init : String -> String -> ( Model, Cmd Msg )
init token studentId =
    ( { studentId = studentId
      , student = Loading
      , weaknesses = Loading
      , games = Loading
      , platformFilter = Combined
      }
    , Cmd.batch
        [ Api.Students.getStudent
            { token = token
            , studentId = studentId
            , onResponse = GotStudent
            }
        , Api.Students.getStudentWeaknesses
            { token = token
            , studentId = studentId
            , onResponse = GotWeaknesses
            }
        , Api.Students.getStudentGames
            { token = token
            , studentId = studentId
            , onResponse = GotGames
            }
        ]
    )


type Msg
    = GotStudent (Result Http.Error Student)
    | GotWeaknesses (Result Http.Error (List WeaknessSummary))
    | GotGames (Result Http.Error (List Game))
    | SetPlatformFilter PlatformFilter


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotStudent result ->
            case result of
                Ok student ->
                    ( { model | student = Success student }, Cmd.none )

                Err error ->
                    ( { model | student = Failure (httpErrorToString error) }, Cmd.none )

        GotWeaknesses result ->
            case result of
                Ok weaknesses ->
                    ( { model | weaknesses = Success weaknesses }, Cmd.none )

                Err error ->
                    ( { model | weaknesses = Failure (httpErrorToString error) }, Cmd.none )

        GotGames result ->
            case result of
                Ok games ->
                    ( { model | games = Success games }, Cmd.none )

                Err error ->
                    ( { model | games = Failure (httpErrorToString error) }, Cmd.none )

        SetPlatformFilter filter ->
            ( { model | platformFilter = filter }, Cmd.none )


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
            if status == 404 then
                "Student not found"

            else
                "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error: " ++ message


view : Model -> Html Msg
view model =
    div []
        [ -- Back link
          a
            [ Route.href Route.Dashboard
            , class "inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6"
            ]
            [ span [] [ text "←" ]
            , text "Back to Dashboard"
            ]

        -- Student header
        , case model.student of
            NotAsked ->
                text ""

            Loading ->
                div [ class "bg-white rounded-lg border border-gray-200 p-6 mb-6" ]
                    [ div [ class "animate-pulse" ]
                        [ div [ class "h-6 bg-gray-200 rounded w-1/3 mb-2" ] []
                        , div [ class "h-4 bg-gray-200 rounded w-1/4" ] []
                        ]
                    ]

            Failure error ->
                div [ class "bg-red-50 border border-red-200 rounded-lg p-6 text-red-700" ]
                    [ text error ]

            Success student ->
                viewStudentHeader student

        -- Platform filter tabs
        , viewPlatformFilter model.platformFilter

        -- Weaknesses
        , div [ class "mb-8" ]
            [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Weaknesses" ]
            , case model.weaknesses of
                NotAsked ->
                    text ""

                Loading ->
                    div [ class "text-gray-500" ] [ text "Loading weaknesses..." ]

                Failure error ->
                    div [ class "text-red-600" ] [ text error ]

                Success weaknesses ->
                    let
                        filtered =
                            filterWeaknesses model.platformFilter weaknesses
                    in
                    if List.isEmpty filtered then
                        div [ class "bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500" ]
                            [ text "No weakness data available yet. Games need to be analyzed first." ]

                    else
                        div [ class "grid md:grid-cols-2 gap-6" ]
                            [ -- Bar chart
                              viewWeaknessChart filtered

                            -- Cards
                            , div [ class "grid gap-3" ]
                                (List.map viewWeakness (List.sortBy .score filtered))
                            ]
            ]

        -- Game Stats
        , case ( model.student, model.games ) of
            ( Success student, Success games ) ->
                let
                    filtered =
                        filterGames model.platformFilter games
                in
                if List.isEmpty filtered then
                    text ""

                else
                    div [ class "mb-8" ]
                        [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Game Statistics" ]
                        , div [ class "grid md:grid-cols-2 gap-6" ]
                            [ viewResultsChart student filtered
                            , viewPerformanceChart student filtered
                            ]
                        ]

            _ ->
                text ""

        -- Recent games
        , div []
            [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Recent Games" ]
            , case ( model.student, model.games ) of
                ( _, NotAsked ) ->
                    text ""

                ( _, Loading ) ->
                    div [ class "text-gray-500" ] [ text "Loading games..." ]

                ( _, Failure error ) ->
                    div [ class "text-red-600" ] [ text error ]

                ( Success student, Success games ) ->
                    let
                        filtered =
                            filterGames model.platformFilter games
                    in
                    if List.isEmpty filtered then
                        div [ class "bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500" ]
                            [ text "No games imported yet. Games will be imported automatically." ]

                    else
                        div [ class "bg-white rounded-lg border border-gray-200 divide-y divide-gray-100" ]
                            (List.map (viewGameRow student) (List.take 20 filtered))

                ( _, Success games ) ->
                    let
                        filtered =
                            filterGames model.platformFilter games
                    in
                    if List.isEmpty filtered then
                        div [ class "bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500" ]
                            [ text "No games imported yet. Games will be imported automatically." ]

                    else
                        div [ class "bg-white rounded-lg border border-gray-200 divide-y divide-gray-100" ]
                            (List.map (viewGameRowSimple) (List.take 20 filtered))
            ]
        ]


viewStudentHeader : Student -> Html Msg
viewStudentHeader student =
    div [ class "bg-white rounded-lg border border-gray-200 p-6 mb-6" ]
        [ div [ class "flex items-center gap-3 mb-2" ]
            [ case ( student.chessComUsername, student.lichessUsername ) of
                ( Just _, Just _ ) ->
                    span [ class "text-2xl text-gray-600" ] [ text "♞♘" ]

                ( Just _, Nothing ) ->
                    span [ class "text-2xl text-gray-600" ] [ text "♞" ]

                ( Nothing, Just _ ) ->
                    span [ class "text-2xl text-gray-600" ] [ text "♘" ]

                ( Nothing, Nothing ) ->
                    text ""
            , h1 [ class "text-2xl font-bold text-gray-900" ] [ text student.displayName ]
            ]
        , div [ class "text-sm text-gray-600 space-y-1" ]
            [ case student.chessComUsername of
                Just username ->
                    div [] [ text ("Chess.com: " ++ username) ]

                Nothing ->
                    text ""
            , case student.lichessUsername of
                Just username ->
                    div [] [ text ("Lichess: " ++ username) ]

                Nothing ->
                    text ""
            ]
        ]


viewPlatformFilter : PlatformFilter -> Html Msg
viewPlatformFilter current =
    div [ class "flex gap-2 mb-6" ]
        [ filterButton "Combined" Combined current
        , filterButton "Chess.com" ChessComOnly current
        , filterButton "Lichess" LichessOnly current
        ]


filterButton : String -> PlatformFilter -> PlatformFilter -> Html Msg
filterButton label filter current =
    button
        [ onClick (SetPlatformFilter filter)
        , class
            (if filter == current then
                "px-4 py-2 rounded-lg bg-anthro-orange text-white font-medium"

             else
                "px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
            )
        ]
        [ text label ]


filterWeaknesses : PlatformFilter -> List WeaknessSummary -> List WeaknessSummary
filterWeaknesses filter weaknesses =
    case filter of
        Combined ->
            List.filter (\w -> w.platform == Nothing || w.platform == Just "all") weaknesses

        ChessComOnly ->
            List.filter (\w -> w.platform == Just "chess_com") weaknesses

        LichessOnly ->
            List.filter (\w -> w.platform == Just "lichess") weaknesses


filterGames : PlatformFilter -> List Game -> List Game
filterGames filter games =
    case filter of
        Combined ->
            games

        ChessComOnly ->
            List.filter (\g -> g.platform == "chess_com") games

        LichessOnly ->
            List.filter (\g -> g.platform == "lichess") games



-- CHARTS


viewWeaknessChart : List WeaknessSummary -> Html Msg
viewWeaknessChart weaknesses =
    let
        sortedWeaknesses =
            List.sortBy
                (\w ->
                    case w.category of
                        "opening" ->
                            0

                        "middlegame" ->
                            1

                        "endgame" ->
                            2

                        _ ->
                            3
                )
                weaknesses

        barColor score =
            if score < 50 then
                CA.color "#ef4444"

            else if score < 70 then
                CA.color "#f59e0b"

            else
                CA.color "#22c55e"

        categoryLabel category =
            case category of
                "opening" ->
                    "Opening"

                "middlegame" ->
                    "Middlegame"

                "endgame" ->
                    "Endgame"

                other ->
                    other

        -- Transform to indexed data for x-axis
        indexedData =
            List.indexedMap
                (\i w ->
                    { x = toFloat i
                    , score = w.score
                    , label = categoryLabel w.category
                    , category = w.category
                    }
                )
                sortedWeaknesses
    in
    div [ class "bg-white rounded-lg border border-gray-200 p-4" ]
        [ h3 [ class "text-sm font-medium text-gray-700 mb-3" ] [ text "Performance by Phase" ]
        , C.chart
            [ CA.height 200
            , CA.width 350
            , CA.margin { top = 10, bottom = 40, left = 50, right = 20 }
            ]
            [ C.yLabels [ CA.withGrid ]
            , C.yAxis []
            , C.bars
                [ CA.spacing 0.3
                , CA.roundTop 0.2
                ]
                [ C.bar .score []
                    |> C.variation
                        (\_ item ->
                            [ barColor item.score ]
                        )
                ]
                indexedData
            , C.binLabels .label [ CA.moveDown 20 ]
            ]
        ]


viewResultsChart : Student -> List Game -> Html Msg
viewResultsChart student games =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername, student.lichessUsername ]
                |> List.map String.toLower

        getResult game =
            let
                isStudentWhite =
                    List.member (String.toLower game.whiteUsername) studentUsernames
            in
            case game.result of
                "1-0" ->
                    if isStudentWhite then
                        "win"

                    else
                        "loss"

                "0-1" ->
                    if isStudentWhite then
                        "loss"

                    else
                        "win"

                "1/2-1/2" ->
                    "draw"

                _ ->
                    "other"

        results =
            List.map getResult games

        wins =
            List.filter (\r -> r == "win") results |> List.length |> toFloat

        losses =
            List.filter (\r -> r == "loss") results |> List.length |> toFloat

        draws =
            List.filter (\r -> r == "draw") results |> List.length |> toFloat

        total =
            wins + losses + draws

        data =
            [ { x = 0, value = wins, label = "Wins", color = "#22c55e" }
            , { x = 1, value = losses, label = "Losses", color = "#ef4444" }
            , { x = 2, value = draws, label = "Draws", color = "#6b7280" }
            ]
    in
    if total == 0 then
        div [ class "text-gray-500 text-center py-4" ] [ text "No games to display" ]

    else
        div [ class "bg-white rounded-lg border border-gray-200 p-4" ]
            [ h3 [ class "text-sm font-medium text-gray-700 mb-3" ] [ text "Results Distribution" ]
            , div [ class "flex flex-col gap-4" ]
                [ -- Stats summary with colored dots
                  div [ class "flex items-center gap-6 justify-center" ]
                    (List.map
                        (\d ->
                            div [ class "flex items-center gap-2" ]
                                [ div
                                    [ class "w-3 h-3 rounded-full"
                                    , style "background-color" d.color
                                    ]
                                    []
                                , span [ class "text-sm font-medium text-gray-700" ]
                                    [ text (String.fromInt (round d.value)) ]
                                , span [ class "text-sm text-gray-400" ]
                                    [ text ("(" ++ String.fromInt (round (d.value / total * 100)) ++ "%)") ]
                                ]
                        )
                        data
                    )

                -- Big win percentage display
                , div [ class "text-center" ]
                    [ div [ class "text-4xl font-bold text-green-600" ]
                        [ text (String.fromInt (round (wins / total * 100)) ++ "%") ]
                    , div [ class "text-sm text-gray-500" ] [ text "Win Rate" ]
                    ]
                ]
            ]


viewPerformanceChart : Student -> List Game -> Html Msg
viewPerformanceChart student games =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername, student.lichessUsername ]
                |> List.map String.toLower

        getResultValue game =
            let
                isStudentWhite =
                    List.member (String.toLower game.whiteUsername) studentUsernames
            in
            case game.result of
                "1-0" ->
                    if isStudentWhite then
                        1.0

                    else
                        0.0

                "0-1" ->
                    if isStudentWhite then
                        0.0

                    else
                        1.0

                "1/2-1/2" ->
                    0.5

                _ ->
                    0.5

        -- Take last 20 games, reversed so oldest is first
        recentGames =
            games
                |> List.take 20
                |> List.reverse

        -- Calculate cumulative score
        indexedResults =
            List.indexedMap
                (\i game ->
                    { x = toFloat (i + 1)
                    , y = getResultValue game
                    , game = game
                    }
                )
                recentGames

        -- Calculate running win rate
        runningWinRate =
            List.indexedMap
                (\i _ ->
                    let
                        gamesUpToNow =
                            List.take (i + 1) indexedResults

                        totalScore =
                            List.sum (List.map .y gamesUpToNow)

                        count =
                            toFloat (i + 1)
                    in
                    { x = toFloat (i + 1)
                    , y = totalScore / count * 100
                    }
                )
                indexedResults
    in
    if List.isEmpty games then
        div [ class "text-gray-500 text-center py-4" ] [ text "No games to display" ]

    else
        div [ class "bg-white rounded-lg border border-gray-200 p-4" ]
            [ h3 [ class "text-sm font-medium text-gray-700 mb-3" ] [ text "Win Rate (Last 20 Games)" ]
            , C.chart
                [ CA.height 180
                , CA.width 350
                , CA.margin { top = 10, bottom = 25, left = 45, right = 15 }
                ]
                [ C.xLabels [ CA.withGrid, CA.ints, CA.amount 5 ]
                , C.yLabels [ CA.withGrid ]
                , C.xAxis []
                , C.yAxis []
                , C.series .x
                    [ C.interpolated .y
                        [ CA.monotone, CA.color "#f97316", CA.width 2.5 ]
                        [ CA.circle, CA.size 5, CA.color "#f97316" ]
                    ]
                    runningWinRate
                ]
            ]


viewWeakness : WeaknessSummary -> Html Msg
viewWeakness weakness =
    let
        ( icon, colorClass ) =
            if weakness.score < 50 then
                ( "❌", "text-red-600" )

            else if weakness.score < 70 then
                ( "⚠️", "text-yellow-600" )

            else
                ( "✅", "text-green-600" )

        categoryLabel =
            case weakness.category of
                "opening" ->
                    "Opening"

                "middlegame" ->
                    "Middlegame"

                "endgame" ->
                    "Endgame"

                other ->
                    other
    in
    div [ class "bg-white rounded-lg border border-gray-200 p-4" ]
        [ div [ class "flex items-center justify-between mb-2" ]
            [ div [ class "flex items-center gap-2" ]
                [ span [] [ text icon ]
                , span [ class "font-medium text-gray-900" ] [ text categoryLabel ]
                ]
            , span [ class ("font-medium " ++ colorClass) ]
                [ text (String.fromInt (round weakness.score) ++ "/100") ]
            ]
        , div [ class "w-full bg-gray-200 rounded-full h-2 mb-2" ]
            [ div
                [ class
                    ("h-2 rounded-full "
                        ++ (if weakness.score < 50 then
                                "bg-red-500"

                            else if weakness.score < 70 then
                                "bg-yellow-500"

                            else
                                "bg-green-500"
                           )
                    )
                , style "width" (String.fromFloat weakness.score ++ "%")
                ]
                []
            ]
        , div [ class "text-sm text-gray-500" ]
            [ text
                (String.fromInt weakness.mistakes
                    ++ " mistakes in "
                    ++ String.fromInt weakness.totalPositions
                    ++ " positions"
                )
            ]
        ]


viewGameRow : Student -> Game -> Html Msg
viewGameRow student game =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername, student.lichessUsername ]

        isStudentWhite =
            List.member (String.toLower game.whiteUsername) (List.map String.toLower studentUsernames)

        opponent =
            if isStudentWhite then
                game.blackUsername

            else
                game.whiteUsername

        resultText =
            resultToTextWithColor isStudentWhite game
    in
    a
        [ Route.href (Route.GameDetail game.id)
        , class "block p-4 hover:bg-gray-50 transition-colors"
        ]
        [ div [ class "flex items-center justify-between" ]
            [ div [ class "flex items-center gap-3" ]
                [ span [ class "text-gray-500" ]
                    [ text
                        (if game.platform == "chess_com" then
                            "♞"

                         else
                            "♘"
                        )
                    ]
                , div []
                    [ div [ class "flex items-center gap-2" ]
                        [ span [ class resultText.colorClass ] [ text resultText.label ]
                        , span [ class "text-gray-500" ] [ text ("vs " ++ opponent) ]
                        ]
                    , div [ class "text-sm text-gray-500" ]
                        [ text (formatDate game.playedAt)
                        , if game.analyzed then
                            span [ class "ml-2 text-green-600" ] [ text "✓ Analyzed" ]

                          else
                            span [ class "ml-2 text-gray-400" ] [ text "Pending analysis" ]
                        ]
                    ]
                ]
            , span [ class "text-gray-400" ] [ text "→" ]
            ]
        ]


viewGameRowSimple : Game -> Html Msg
viewGameRowSimple game =
    a
        [ Route.href (Route.GameDetail game.id)
        , class "block p-4 hover:bg-gray-50 transition-colors"
        ]
        [ div [ class "flex items-center justify-between" ]
            [ div [ class "flex items-center gap-3" ]
                [ span [ class "text-gray-500" ]
                    [ text
                        (if game.platform == "chess_com" then
                            "♞"

                         else
                            "♘"
                        )
                    ]
                , div []
                    [ div [ class "flex items-center gap-2" ]
                        [ span [ class "font-medium text-gray-900" ]
                            [ text (game.whiteUsername ++ " vs " ++ game.blackUsername) ]
                        ]
                    , div [ class "text-sm text-gray-500" ]
                        [ text (formatDate game.playedAt)
                        , if game.analyzed then
                            span [ class "ml-2 text-green-600" ] [ text "✓ Analyzed" ]

                          else
                            span [ class "ml-2 text-gray-400" ] [ text "Pending analysis" ]
                        ]
                    ]
                ]
            , span [ class "text-gray-400" ] [ text "→" ]
            ]
        ]


resultToTextWithColor : Bool -> Game -> { label : String, colorClass : String }
resultToTextWithColor isStudentWhite game =
    case game.result of
        "1-0" ->
            if isStudentWhite then
                { label = "Win", colorClass = "font-medium text-green-600" }

            else
                { label = "Loss", colorClass = "font-medium text-red-600" }

        "0-1" ->
            if isStudentWhite then
                { label = "Loss", colorClass = "font-medium text-red-600" }

            else
                { label = "Win", colorClass = "font-medium text-green-600" }

        "1/2-1/2" ->
            { label = "Draw", colorClass = "font-medium text-gray-600" }

        _ ->
            { label = game.result, colorClass = "font-medium text-gray-900" }


formatDate : String -> String
formatDate dateStr =
    -- Simple date formatting - just show the date part
    String.left 10 dateStr
