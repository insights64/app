module Pages.StudentDetail exposing (Model, Msg, init, update, view)

import Api.Students
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
import Route
import Types
    exposing
        ( ColorFilter(..)
        , GameInsight
        , GameTag
        , GameWithInsights
        , RemoteData(..)
        , ResultFilter(..)
        , Student
        , Tag
        , TagWithCount
        , TimeControl(..)
        , colorFilterToString
        , resultFilterToString
        , timeControlToString
        )



-- ============================================================================
-- MODEL
-- ============================================================================


type alias Model =
    { studentId : String
    , student : RemoteData String Student
    , games : RemoteData String { games : List GameWithInsights, total : Int }
    , tags : RemoteData String (List TagWithCount)
    , timeControlFilter : TimeControl
    , resultFilter : ResultFilter
    , colorFilter : ColorFilter
    , selectedTags : List String
    , minAccuracy : Maybe Int
    , maxAccuracy : Maybe Int
    , maxBlunders : Maybe Int
    , opponentRatingFilter : String -- "all", "higher", "lower"
    , opponentSearch : String -- New: opponent name search
    , sortOrder : SortOrder -- New: sorting
    , limit : Int
    , offset : Int
    , expandedCategories : List String
    , sidebarVisible : Bool -- New: responsive sidebar
    , apiUrl : String
    , token : String
    }


{-| Sorting options for the game list
-}
type SortOrder
    = DateNewest
    | DateOldest
    | AccuracyHigh
    | AccuracyLow
    | OpponentRatingHigh
    | OpponentRatingLow


{-| Tag sentiment classification
-}
type TagSentiment
    = Positive
    | Negative
    | Neutral


init : String -> String -> String -> ( Model, Cmd Msg )
init apiUrl token studentId =
    ( { studentId = studentId
      , student = Loading
      , games = Loading
      , tags = Loading
      , timeControlFilter = AllTimeControls
      , resultFilter = AllResults
      , colorFilter = AllColors
      , selectedTags = []
      , minAccuracy = Nothing
      , maxAccuracy = Nothing
      , maxBlunders = Nothing
      , opponentRatingFilter = "all"
      , opponentSearch = ""
      , sortOrder = DateNewest
      , limit = 25
      , offset = 0
      , expandedCategories = [ "accuracy", "advantage", "tactics" ]
      , sidebarVisible = True
      , apiUrl = apiUrl
      , token = token
      }
    , Cmd.batch
        [ Api.Students.getStudent
            { apiUrl = apiUrl
            , token = token
            , studentId = studentId
            , onResponse = GotStudent
            }
        , Api.Students.getStudentGames
            { apiUrl = apiUrl
            , token = token
            , studentId = studentId
            , timeControl = "all"
            , result = "all"
            , color = "all"
            , tags = Nothing
            , minAccuracy = Nothing
            , maxAccuracy = Nothing
            , maxBlunders = Nothing
            , minRatingDiff = Nothing
            , maxRatingDiff = Nothing
            , limit = 25
            , offset = 0
            , onResponse = GotGames
            }
        , Api.Students.getStudentTags
            { apiUrl = apiUrl
            , token = token
            , studentId = studentId
            , onResponse = GotTags
            }
        ]
    )



-- ============================================================================
-- MSG & UPDATE
-- ============================================================================


type Msg
    = GotStudent (Result Http.Error Student)
    | GotGames (Result Http.Error { games : List GameWithInsights, total : Int })
    | GotTags (Result Http.Error (List TagWithCount))
    | SetTimeControlFilter TimeControl
    | SetResultFilter ResultFilter
    | SetColorFilter ColorFilter
    | ToggleTag String
    | ClearTags
    | SetMinAccuracy String
    | SetMaxAccuracy String
    | ClearAccuracy
    | SetMaxBlunders String
    | ClearBlunders
    | SetOpponentRatingFilter String
    | SetOpponentSearch String
    | SetSortOrder SortOrder
    | ClearAllFilters
    | ToggleCategory String
    | ToggleSidebar
    | LoadMore
    | GoToPage Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotStudent result ->
            case result of
                Ok student ->
                    ( { model | student = Success student }, Cmd.none )

                Err error ->
                    ( { model | student = Failure (httpErrorToString error) }, Cmd.none )

        GotGames result ->
            case result of
                Ok gamesData ->
                    ( { model | games = Success gamesData }, Cmd.none )

                Err error ->
                    ( { model | games = Failure (httpErrorToString error) }, Cmd.none )

        GotTags result ->
            case result of
                Ok tagsData ->
                    ( { model | tags = Success tagsData }, Cmd.none )

                Err error ->
                    ( { model | tags = Failure (httpErrorToString error) }, Cmd.none )

        SetTimeControlFilter filter ->
            let
                newModel =
                    { model | timeControlFilter = filter, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetResultFilter filter ->
            let
                newModel =
                    { model | resultFilter = filter, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetColorFilter filter ->
            let
                newModel =
                    { model | colorFilter = filter, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        ToggleTag tagSlug ->
            let
                newTags =
                    if List.member tagSlug model.selectedTags then
                        List.filter (\t -> t /= tagSlug) model.selectedTags

                    else
                        tagSlug :: model.selectedTags

                newModel =
                    { model | selectedTags = newTags, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        ClearTags ->
            let
                newModel =
                    { model | selectedTags = [], games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetMinAccuracy str ->
            let
                maybeAccuracy =
                    String.toInt str

                newModel =
                    { model | minAccuracy = maybeAccuracy, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetMaxAccuracy str ->
            let
                maybeAccuracy =
                    String.toInt str

                newModel =
                    { model | maxAccuracy = maybeAccuracy, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        ClearAccuracy ->
            let
                newModel =
                    { model | minAccuracy = Nothing, maxAccuracy = Nothing, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetMaxBlunders str ->
            let
                maybeBlunders =
                    String.toInt str

                newModel =
                    { model | maxBlunders = maybeBlunders, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        ClearBlunders ->
            let
                newModel =
                    { model | maxBlunders = Nothing, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetOpponentRatingFilter filter ->
            let
                newModel =
                    { model | opponentRatingFilter = filter, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetOpponentSearch searchStr ->
            ( { model | opponentSearch = searchStr }, Cmd.none )

        SetSortOrder order ->
            ( { model | sortOrder = order }, Cmd.none )

        ClearAllFilters ->
            let
                newModel =
                    { model
                        | timeControlFilter = AllTimeControls
                        , resultFilter = AllResults
                        , colorFilter = AllColors
                        , selectedTags = []
                        , minAccuracy = Nothing
                        , maxAccuracy = Nothing
                        , maxBlunders = Nothing
                        , opponentRatingFilter = "all"
                        , opponentSearch = ""
                        , sortOrder = DateNewest
                        , games = Loading
                        , offset = 0
                    }
            in
            ( newModel, fetchFilteredGames newModel )

        ToggleCategory category ->
            let
                newCategories =
                    if List.member category model.expandedCategories then
                        List.filter (\c -> c /= category) model.expandedCategories

                    else
                        category :: model.expandedCategories
            in
            ( { model | expandedCategories = newCategories }, Cmd.none )

        ToggleSidebar ->
            ( { model | sidebarVisible = not model.sidebarVisible }, Cmd.none )

        LoadMore ->
            let
                newModel =
                    { model | offset = model.offset + model.limit, games = Loading }
            in
            ( newModel, fetchFilteredGames newModel )

        GoToPage page ->
            let
                newOffset =
                    page * model.limit

                newModel =
                    { model | offset = newOffset, games = Loading }
            in
            ( newModel, fetchFilteredGames newModel )


fetchFilteredGames : Model -> Cmd Msg
fetchFilteredGames model =
    let
        tagsParam =
            if List.isEmpty model.selectedTags then
                Nothing

            else
                Just (String.join "," model.selectedTags)

        -- Convert opponent rating filter to min/max rating diff
        ( minRatingDiff, maxRatingDiff ) =
            case model.opponentRatingFilter of
                "higher" ->
                    ( Just 1, Nothing )

                "lower" ->
                    ( Nothing, Just -1 )

                _ ->
                    ( Nothing, Nothing )
    in
    Api.Students.getStudentGames
        { apiUrl = model.apiUrl
        , token = model.token
        , studentId = model.studentId
        , timeControl = timeControlToString model.timeControlFilter
        , result = resultFilterToString model.resultFilter
        , color = colorFilterToString model.colorFilter
        , tags = tagsParam
        , minAccuracy = model.minAccuracy
        , maxAccuracy = model.maxAccuracy
        , maxBlunders = model.maxBlunders
        , minRatingDiff = minRatingDiff
        , maxRatingDiff = maxRatingDiff
        , limit = model.limit
        , offset = model.offset
        , onResponse = GotGames
        }


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
-- HELPER FUNCTIONS
-- ============================================================================


{-| Returns Tailwind classes for accuracy based on a consistent color scale:

  - 0-40%: Red (#EF4444)
  - 41-60%: Orange (#F97316)
  - 61-80%: Yellow (#EAB308)
  - 81-100%: Green (#22C55E)

-}
accuracyColorClasses : Float -> { bg : String, text : String, border : String }
accuracyColorClasses accuracy =
    if accuracy <= 40 then
        { bg = "bg-red-100", text = "text-red-700", border = "border-red-200" }

    else if accuracy <= 60 then
        { bg = "bg-orange-100", text = "text-orange-700", border = "border-orange-200" }

    else if accuracy <= 80 then
        { bg = "bg-yellow-100", text = "text-yellow-700", border = "border-yellow-200" }

    else
        { bg = "bg-green-100", text = "text-green-700", border = "border-green-200" }


{-| Map tag names to their sentiment for consistent coloring
-}
getTagSentiment : Tag -> TagSentiment
getTagSentiment tag =
    let
        slug =
            String.toLower tag.slug
    in
    if
        List.member slug
            [ "fork-executed"
            , "pin-created"
            , "discovered-attack"
            , "winning-converted"
            , "clean-game"
            , "high-accuracy"
            , "delivered-checkmate"
            , "comeback"
            , "upset-victory"
            , "well-prepared"
            , "castled-kingside"
            , "castled-queenside"
            , "back-rank-threat"
            ]
    then
        Positive

    else if
        List.member slug
            [ "fork-missed"
            , "pin-missed"
            , "opening-blunder"
            , "got-checkmated"
            , "winning-squandered"
            , "low-accuracy"
            , "collapsed-after-blunder"
            , "flagged"
            , "upset-loss"
            , "back-rank-victim"
            , "did-not-castle"
            ]
    then
        Negative

    else
        Neutral


{-| Get Tailwind classes based on tag sentiment
-}
getTagSentimentClasses : Tag -> String
getTagSentimentClasses tag =
    case getTagSentiment tag of
        Positive ->
            "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"

        Negative ->
            "bg-red-100 text-red-700 hover:bg-red-200"

        Neutral ->
            "bg-slate-100 text-slate-700 hover:bg-slate-200"


{-| Check if any filters are active
-}
hasActiveFilters : Model -> Bool
hasActiveFilters model =
    model.timeControlFilter
        /= AllTimeControls
        || model.resultFilter
        /= AllResults
        || model.colorFilter
        /= AllColors
        || not (List.isEmpty model.selectedTags)
        || model.minAccuracy
        /= Nothing
        || model.maxAccuracy
        /= Nothing
        || model.maxBlunders
        /= Nothing
        || model.opponentRatingFilter
        /= "all"
        || model.opponentSearch
        /= ""


{-| Count active filters
-}
countActiveFilters : Model -> Int
countActiveFilters model =
    [ model.timeControlFilter /= AllTimeControls
    , model.resultFilter /= AllResults
    , model.colorFilter /= AllColors
    , not (List.isEmpty model.selectedTags)
    , model.minAccuracy /= Nothing || model.maxAccuracy /= Nothing
    , model.maxBlunders /= Nothing
    , model.opponentRatingFilter /= "all"
    , model.opponentSearch /= ""
    ]
        |> List.filter identity
        |> List.length


{-| Sort games based on the selected sort order
-}
sortGames : SortOrder -> Student -> List GameWithInsights -> List GameWithInsights
sortGames order student games =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername ]

        getOpponentRating g =
            let
                isStudentWhite =
                    List.member (String.toLower g.game.whiteUsername) (List.map String.toLower studentUsernames)
            in
            if isStudentWhite then
                g.game.blackElo |> Maybe.withDefault 0

            else
                g.game.whiteElo |> Maybe.withDefault 0

        getAccuracy g =
            g.insight |> Maybe.andThen .accuracyOverall |> Maybe.withDefault 0
    in
    case order of
        DateNewest ->
            games

        DateOldest ->
            List.reverse games

        AccuracyHigh ->
            List.sortBy (\g -> -(getAccuracy g)) games

        AccuracyLow ->
            List.sortBy (\g -> getAccuracy g) games

        OpponentRatingHigh ->
            List.sortBy (\g -> -(getOpponentRating g)) games

        OpponentRatingLow ->
            List.sortBy (\g -> getOpponentRating g) games


{-| Filter games by opponent name search
-}
filterByOpponentName : String -> Student -> List GameWithInsights -> List GameWithInsights
filterByOpponentName searchStr student games =
    if String.isEmpty searchStr then
        games

    else
        let
            search =
                String.toLower searchStr

            studentUsernames =
                List.filterMap identity [ student.chessComUsername ]
                    |> List.map String.toLower
        in
        List.filter
            (\g ->
                let
                    isStudentWhite =
                        List.member (String.toLower g.game.whiteUsername) studentUsernames

                    opponent =
                        if isStudentWhite then
                            String.toLower g.game.blackUsername

                        else
                            String.toLower g.game.whiteUsername
                in
                String.contains search opponent
            )
            games


{-| Group games by date for sticky headers
-}
groupGamesByDate : List GameWithInsights -> List ( String, List GameWithInsights )
groupGamesByDate games =
    games
        |> List.foldl
            (\game acc ->
                let
                    dateStr =
                        formatDateFriendly game.game.playedAt
                in
                case acc of
                    [] ->
                        [ ( dateStr, [ game ] ) ]

                    ( currentDate, currentGames ) :: rest ->
                        if currentDate == dateStr then
                            ( currentDate, currentGames ++ [ game ] ) :: rest

                        else
                            ( dateStr, [ game ] ) :: acc
            )
            []
        |> List.reverse


{-| Format date in a friendly way
-}
formatDateFriendly : String -> String
formatDateFriendly dateStr =
    String.left 10 dateStr


{-| Calculate stats from games list
-}
type alias GameStats =
    { total : Int
    , wins : Int
    , losses : Int
    , draws : Int
    , avgAccuracy : Maybe Float
    }


calculateStats : Student -> List GameWithInsights -> GameStats
calculateStats student games =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername ]
                |> List.map String.toLower

        isWin g =
            let
                isStudentWhite =
                    List.member (String.toLower g.game.whiteUsername) studentUsernames
            in
            (isStudentWhite && g.game.result == "1-0")
                || (not isStudentWhite && g.game.result == "0-1")

        isLoss g =
            let
                isStudentWhite =
                    List.member (String.toLower g.game.whiteUsername) studentUsernames
            in
            (isStudentWhite && g.game.result == "0-1")
                || (not isStudentWhite && g.game.result == "1-0")

        isDraw g =
            g.game.result == "1/2-1/2"

        accuracies =
            games
                |> List.filterMap (\g -> g.insight |> Maybe.andThen .accuracyOverall)

        avgAcc =
            if List.isEmpty accuracies then
                Nothing

            else
                Just (List.sum accuracies / toFloat (List.length accuracies))
    in
    { total = List.length games
    , wins = List.length (List.filter isWin games)
    , losses = List.length (List.filter isLoss games)
    , draws = List.length (List.filter isDraw games)
    , avgAccuracy = avgAcc
    }



-- ============================================================================
-- VIEW
-- ============================================================================


view : Model -> Html Msg
view model =
    div [ class "relative" ]
        [ -- Mobile filter toggle button
          div [ class "md:hidden fixed bottom-4 right-4 z-40" ]
            [ button
                [ onClick ToggleSidebar
                , class "bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
                ]
                [ text "Filters"
                , if countActiveFilters model > 0 then
                    span [ class "bg-white text-orange-500 text-xs px-2 py-0.5 rounded-full" ]
                        [ text (String.fromInt (countActiveFilters model)) ]

                  else
                    text ""
                ]
            ]

        -- Mobile sidebar overlay
        , if model.sidebarVisible then
            div [ class "md:hidden fixed inset-0 bg-black bg-opacity-50 z-30", onClick ToggleSidebar ] []

          else
            text ""

        -- Main layout
        , div [ class "flex gap-6" ]
            [ -- Sidebar with filters
              div
                [ class
                    (if model.sidebarVisible then
                        "fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-72 flex-shrink-0 bg-white md:bg-transparent overflow-y-auto transform transition-transform duration-300 ease-in-out"

                     else
                        "fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-72 flex-shrink-0 bg-white md:bg-transparent overflow-y-auto transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out"
                    )
                ]
                [ div [ class "p-4 md:p-0" ]
                    [ -- Close button for mobile
                      div [ class "md:hidden flex justify-end mb-4" ]
                        [ button
                            [ onClick ToggleSidebar
                            , class "text-gray-500 hover:text-gray-700 p-2"
                            ]
                            [ text "✕" ]
                        ]

                    -- Back link
                    , a
                        [ Route.href Route.Dashboard
                        , class "inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6"
                        ]
                        [ span [] [ text "←" ]
                        , text "Back to Dashboard"
                        ]

                    -- Filter panel
                    , viewFilterPanel model
                    ]
                ]

            -- Main content
            , div [ class "flex-1 min-w-0" ]
                [ -- Student header
                  viewStudentHeader model.student

                -- Stats header
                , viewStatsHeader model

                -- Games list
                , viewGamesList model
                ]
            ]
        ]


viewStatsHeader : Model -> Html Msg
viewStatsHeader model =
    case ( model.student, model.games ) of
        ( Success student, Success gamesData ) ->
            let
                stats =
                    calculateStats student gamesData.games

                totalGames =
                    stats.wins + stats.losses + stats.draws

                winPercent =
                    if totalGames > 0 then
                        toFloat stats.wins / toFloat totalGames * 100

                    else
                        0

                lossPercent =
                    if totalGames > 0 then
                        toFloat stats.losses / toFloat totalGames * 100

                    else
                        0

                drawPercent =
                    if totalGames > 0 then
                        toFloat stats.draws / toFloat totalGames * 100

                    else
                        0
            in
            div [ class "mb-6 bg-white rounded-lg border border-gray-200 p-4" ]
                [ div [ class "grid grid-cols-2 md:grid-cols-4 gap-4" ]
                    [ -- Total games
                      div [ class "text-center" ]
                        [ div [ class "text-2xl font-bold text-gray-900" ]
                            [ text (String.fromInt gamesData.total) ]
                        , div [ class "text-sm text-gray-500" ] [ text "Total Games" ]
                        ]

                    -- Win/Loss/Draw bar
                    , div [ class "col-span-2 md:col-span-1" ]
                        [ div [ class "text-sm text-gray-500 mb-2 text-center" ] [ text "Results" ]
                        , div [ class "flex h-4 rounded-full overflow-hidden bg-gray-100" ]
                            [ if winPercent > 0 then
                                div
                                    [ class "bg-green-500 transition-all duration-300"
                                    , style "width" (String.fromFloat winPercent ++ "%")
                                    , title ("Wins: " ++ String.fromInt stats.wins)
                                    ]
                                    []

                              else
                                text ""
                            , if drawPercent > 0 then
                                div
                                    [ class "bg-gray-400 transition-all duration-300"
                                    , style "width" (String.fromFloat drawPercent ++ "%")
                                    , title ("Draws: " ++ String.fromInt stats.draws)
                                    ]
                                    []

                              else
                                text ""
                            , if lossPercent > 0 then
                                div
                                    [ class "bg-red-500 transition-all duration-300"
                                    , style "width" (String.fromFloat lossPercent ++ "%")
                                    , title ("Losses: " ++ String.fromInt stats.losses)
                                    ]
                                    []

                              else
                                text ""
                            ]
                        , div [ class "flex justify-between text-xs mt-1" ]
                            [ span [ class "text-green-600 font-medium" ] [ text (String.fromInt stats.wins ++ "W") ]
                            , span [ class "text-gray-500" ] [ text (String.fromInt stats.draws ++ "D") ]
                            , span [ class "text-red-600 font-medium" ] [ text (String.fromInt stats.losses ++ "L") ]
                            ]
                        ]

                    -- Average accuracy
                    , div [ class "text-center" ]
                        [ case stats.avgAccuracy of
                            Just acc ->
                                let
                                    colors =
                                        accuracyColorClasses acc
                                in
                                div []
                                    [ div [ class ("text-2xl font-bold " ++ colors.text) ]
                                        [ text (formatAccuracy acc ++ "%") ]
                                    , div [ class "text-sm text-gray-500" ] [ text "Avg Accuracy" ]
                                    ]

                            Nothing ->
                                div []
                                    [ div [ class "text-2xl font-bold text-gray-400" ] [ text "—" ]
                                    , div [ class "text-sm text-gray-500" ] [ text "Avg Accuracy" ]
                                    ]
                        ]

                    -- Win rate
                    , div [ class "text-center" ]
                        [ div [ class "text-2xl font-bold text-gray-900" ]
                            [ text
                                (if totalGames > 0 then
                                    String.fromInt (round winPercent) ++ "%"

                                 else
                                    "—"
                                )
                            ]
                        , div [ class "text-sm text-gray-500" ] [ text "Win Rate" ]
                        ]
                    ]
                ]

        _ ->
            text ""


viewFilterPanel : Model -> Html Msg
viewFilterPanel model =
    div [ class "bg-white rounded-lg border border-gray-200 p-4 space-y-6" ]
        [ -- Clear all filters button
          if hasActiveFilters model then
            button
                [ onClick ClearAllFilters
                , class "w-full px-3 py-2 text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors flex items-center justify-center gap-2"
                ]
                [ text "Clear All Filters"
                , span [ class "text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded-full" ]
                    [ text (String.fromInt (countActiveFilters model)) ]
                ]

          else
            text ""

        -- Opponent search
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Search Opponent" ]
            , input
                [ type_ "text"
                , class "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                , placeholder "Type opponent name..."
                , value model.opponentSearch
                , onInput SetOpponentSearch
                ]
                []
            ]

        -- Sort order
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Sort By" ]
            , select
                [ class "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                , onInput
                    (\str ->
                        case str of
                            "date-newest" ->
                                SetSortOrder DateNewest

                            "date-oldest" ->
                                SetSortOrder DateOldest

                            "accuracy-high" ->
                                SetSortOrder AccuracyHigh

                            "accuracy-low" ->
                                SetSortOrder AccuracyLow

                            "rating-high" ->
                                SetSortOrder OpponentRatingHigh

                            "rating-low" ->
                                SetSortOrder OpponentRatingLow

                            _ ->
                                SetSortOrder DateNewest
                    )
                ]
                [ option [ value "date-newest", selected (model.sortOrder == DateNewest) ] [ text "Date (Newest)" ]
                , option [ value "date-oldest", selected (model.sortOrder == DateOldest) ] [ text "Date (Oldest)" ]
                , option [ value "accuracy-high", selected (model.sortOrder == AccuracyHigh) ] [ text "Accuracy (High → Low)" ]
                , option [ value "accuracy-low", selected (model.sortOrder == AccuracyLow) ] [ text "Accuracy (Low → High)" ]
                , option [ value "rating-high", selected (model.sortOrder == OpponentRatingHigh) ] [ text "Opponent Rating (High)" ]
                , option [ value "rating-low", selected (model.sortOrder == OpponentRatingLow) ] [ text "Opponent Rating (Low)" ]
                ]
            ]

        -- Time control filter
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Time Control" ]
            , div [ class "flex flex-wrap gap-2" ]
                [ timeControlButton "All" AllTimeControls model.timeControlFilter
                , timeControlButton "Bullet" Bullet model.timeControlFilter
                , timeControlButton "Blitz" Blitz model.timeControlFilter
                , timeControlButton "Rapid" Rapid model.timeControlFilter
                ]
            ]

        -- Result filter
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Result" ]
            , div [ class "flex flex-wrap gap-2" ]
                [ resultButton "All" AllResults model.resultFilter
                , resultButton "Wins" WinsOnly model.resultFilter
                , resultButton "Losses" LossesOnly model.resultFilter
                , resultButton "Draws" DrawsOnly model.resultFilter
                ]
            ]

        -- Color filter
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Played As" ]
            , div [ class "flex flex-wrap gap-2" ]
                [ colorButton "All" AllColors model.colorFilter
                , colorButton "White" WhiteOnly model.colorFilter
                , colorButton "Black" BlackOnly model.colorFilter
                ]
            ]

        -- Accuracy range filter
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Accuracy Range" ]
            , div [ class "flex items-center gap-2" ]
                [ input
                    [ type_ "number"
                    , class "w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    , placeholder "Min"
                    , Html.Attributes.min "0"
                    , Html.Attributes.max "100"
                    , value (model.minAccuracy |> Maybe.map String.fromInt |> Maybe.withDefault "")
                    , onInput SetMinAccuracy
                    ]
                    []
                , span [ class "text-gray-400 text-sm" ] [ text "to" ]
                , input
                    [ type_ "number"
                    , class "w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    , placeholder "Max"
                    , Html.Attributes.min "0"
                    , Html.Attributes.max "100"
                    , value (model.maxAccuracy |> Maybe.map String.fromInt |> Maybe.withDefault "")
                    , onInput SetMaxAccuracy
                    ]
                    []
                , if model.minAccuracy /= Nothing || model.maxAccuracy /= Nothing then
                    button
                        [ onClick ClearAccuracy
                        , class "text-gray-400 hover:text-gray-600 text-sm"
                        ]
                        [ text "Clear" ]

                  else
                    text ""
                ]
            ]

        -- Max blunders filter
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Max Blunders" ]
            , div [ class "flex items-center gap-2" ]
                [ input
                    [ type_ "number"
                    , class "w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    , placeholder "Any"
                    , Html.Attributes.min "0"
                    , Html.Attributes.max "20"
                    , value (model.maxBlunders |> Maybe.map String.fromInt |> Maybe.withDefault "")
                    , onInput SetMaxBlunders
                    ]
                    []
                , span [ class "text-gray-500 text-xs" ] [ text "or fewer" ]
                , if model.maxBlunders /= Nothing then
                    button
                        [ onClick ClearBlunders
                        , class "text-gray-400 hover:text-gray-600 text-sm"
                        ]
                        [ text "Clear" ]

                  else
                    text ""
                ]
            ]

        -- Opponent rating filter
        , div []
            [ div [ class "text-sm font-medium text-gray-700 mb-2" ] [ text "Opponent Rating" ]
            , div [ class "flex flex-wrap gap-2" ]
                [ opponentRatingButton "All" "all" model.opponentRatingFilter
                , opponentRatingButton "Higher Rated" "higher" model.opponentRatingFilter
                , opponentRatingButton "Lower Rated" "lower" model.opponentRatingFilter
                ]
            ]

        -- Tag filters by category
        , viewTagFilters model
        ]


opponentRatingButton : String -> String -> String -> Html Msg
opponentRatingButton label filterValue currentFilter =
    let
        isActive =
            filterValue == currentFilter

        baseClasses =
            "px-3 py-1 text-sm rounded-full border transition-colors"

        activeClasses =
            if isActive then
                "bg-orange-500 text-white border-orange-500"

            else
                "border-gray-300 text-gray-600 hover:border-gray-400"
    in
    button
        [ onClick (SetOpponentRatingFilter filterValue)
        , class (baseClasses ++ " " ++ activeClasses)
        ]
        [ text label ]


viewTagFilters : Model -> Html Msg
viewTagFilters model =
    case model.tags of
        Loading ->
            div [ class "text-sm text-gray-500" ] [ text "Loading tags..." ]

        Failure _ ->
            text ""

        NotAsked ->
            text ""

        Success tagsWithCounts ->
            let
                categories =
                    tagsWithCounts
                        |> List.map (\tc -> tc.tag.category)
                        |> unique

                categoryOrder =
                    [ "accuracy"
                    , "advantage"
                    , "tactics"
                    , "opening"
                    , "endgame"
                    , "checkmate"
                    , "character"
                    , "opponent"
                    , "time"
                    , "teaching"
                    ]

                sortedCategories =
                    List.sortBy
                        (\cat ->
                            case indexOf cat categoryOrder of
                                Just i ->
                                    i

                                Nothing ->
                                    999
                        )
                        categories
            in
            div []
                [ div [ class "flex items-center justify-between mb-2" ]
                    [ div [ class "text-sm font-medium text-gray-700" ] [ text "Tags" ]
                    , if not (List.isEmpty model.selectedTags) then
                        button
                            [ onClick ClearTags
                            , class "text-xs text-orange-600 hover:text-orange-700"
                            ]
                            [ text ("Clear " ++ String.fromInt (List.length model.selectedTags)) ]

                      else
                        text ""
                    ]
                , div [ class "space-y-2" ]
                    (List.map (viewTagCategory model tagsWithCounts) sortedCategories)
                ]


viewTagCategory : Model -> List TagWithCount -> String -> Html Msg
viewTagCategory model tagsWithCounts category =
    let
        categoryTags =
            tagsWithCounts
                |> List.filter (\tc -> tc.tag.category == category)
                |> List.sortBy (\tc -> -tc.count)

        isExpanded =
            List.member category model.expandedCategories

        categoryLabel =
            category
                |> String.replace "_" " "
                |> capitalizeFirst
    in
    if List.isEmpty categoryTags then
        text ""

    else
        div [ class "border border-gray-100 rounded" ]
            [ button
                [ onClick (ToggleCategory category)
                , class "w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                ]
                [ span [] [ text categoryLabel ]
                , span [ class "text-gray-400" ]
                    [ text
                        (if isExpanded then
                            "−"

                         else
                            "+"
                        )
                    ]
                ]
            , if isExpanded then
                div [ class "px-3 pb-2 flex flex-wrap gap-1" ]
                    (List.map (viewTagChip model.selectedTags) categoryTags)

              else
                text ""
            ]


viewTagChip : List String -> TagWithCount -> Html Msg
viewTagChip selectedTags tc =
    let
        isSelected =
            List.member tc.tag.slug selectedTags

        baseClasses =
            "inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full cursor-pointer transition-colors"

        colorClasses =
            if isSelected then
                "bg-orange-500 text-white"

            else
                getTagSentimentClasses tc.tag

        description =
            tc.tag.description |> Maybe.withDefault ""

        hasTooltip =
            not (String.isEmpty description)
    in
    div [ class "group relative inline-block" ]
        [ button
            [ onClick (ToggleTag tc.tag.slug)
            , class (baseClasses ++ " " ++ colorClasses)
            ]
            [ text tc.tag.name
            , span [ class "opacity-75" ] [ text ("(" ++ String.fromInt tc.count ++ ")") ]
            ]
        , if hasTooltip then
            div
                [ class "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none max-w-xs text-center"
                ]
                [ text description
                , div [ class "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" ] []
                ]

          else
            text ""
        ]


timeControlButton : String -> TimeControl -> TimeControl -> Html Msg
timeControlButton label tc current =
    button
        [ onClick (SetTimeControlFilter tc)
        , class
            (if tc == current then
                "px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-medium"

             else
                "px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm hover:border-gray-300"
            )
        ]
        [ text label ]


resultButton : String -> ResultFilter -> ResultFilter -> Html Msg
resultButton label result current =
    button
        [ onClick (SetResultFilter result)
        , class
            (if result == current then
                "px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm font-medium"

             else
                "px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:border-gray-300"
            )
        ]
        [ text label ]


colorButton : String -> ColorFilter -> ColorFilter -> Html Msg
colorButton label color current =
    button
        [ onClick (SetColorFilter color)
        , class
            (if color == current then
                "px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm font-medium"

             else
                "px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:border-gray-300"
            )
        ]
        [ text label ]


viewStudentHeader : RemoteData String Student -> Html Msg
viewStudentHeader studentData =
    case studentData of
        Loading ->
            div [ class "mb-6" ]
                [ div [ class "animate-pulse" ]
                    [ div [ class "flex items-center gap-4" ]
                        [ div [ class "w-14 h-14 bg-gray-200 rounded-full" ] []
                        , div [ class "space-y-2" ]
                            [ div [ class "w-40 h-6 bg-gray-200 rounded" ] []
                            , div [ class "w-28 h-4 bg-gray-200 rounded" ] []
                            ]
                        ]
                    ]
                ]

        Failure error ->
            div [ class "mb-6 bg-red-50 border border-red-200 rounded-lg p-4" ]
                [ p [ class "text-red-600" ] [ text error ]
                ]

        NotAsked ->
            text ""

        Success student ->
            div [ class "mb-6" ]
                [ div [ class "flex items-center gap-4" ]
                    [ case student.avatarUrl of
                        Just url ->
                            img
                                [ src url
                                , class "w-14 h-14 rounded-full border-2 border-gray-200"
                                , alt (student.displayName ++ "'s avatar")
                                ]
                                []

                        Nothing ->
                            div [ class "w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-xl text-orange-600 font-semibold" ]
                                [ text (String.left 1 student.displayName |> String.toUpper) ]
                    , div []
                        [ h1 [ class "text-xl font-bold text-gray-900" ]
                            [ text student.displayName ]
                        , case student.chessComUsername of
                            Just username ->
                                a
                                    [ href ("https://www.chess.com/member/" ++ username)
                                    , target "_blank"
                                    , class "text-sm text-orange-500 hover:text-orange-600 hover:underline"
                                    ]
                                    [ text ("@" ++ username) ]

                            Nothing ->
                                text ""
                        ]
                    ]
                ]


viewGamesList : Model -> Html Msg
viewGamesList model =
    case model.games of
        NotAsked ->
            text ""

        Loading ->
            div [ class "space-y-2" ]
                (List.repeat 5
                    (div [ class "bg-white rounded-lg border border-gray-200 p-4 animate-pulse" ]
                        [ div [ class "flex items-center gap-3" ]
                            [ div [ class "w-16 h-4 bg-gray-200 rounded" ] []
                            , div [ class "w-32 h-4 bg-gray-200 rounded" ] []
                            , div [ class "flex-1" ] []
                            , div [ class "w-20 h-4 bg-gray-200 rounded" ] []
                            ]
                        ]
                    )
                )

        Failure error ->
            div [ class "bg-red-50 border border-red-200 rounded-lg p-4 text-red-600" ]
                [ text error ]

        Success gamesData ->
            case model.student of
                Success student ->
                    let
                        -- Apply client-side filters and sorting
                        filteredGames =
                            gamesData.games
                                |> filterByOpponentName model.opponentSearch student
                                |> sortGames model.sortOrder student

                        groupedGames =
                            groupGamesByDate filteredGames

                        totalPages =
                            ceiling (toFloat gamesData.total / toFloat model.limit)

                        currentPage =
                            model.offset // model.limit
                    in
                    if List.isEmpty filteredGames then
                        div [ class "bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500" ]
                            [ text "No games found matching the filters." ]

                    else
                        div []
                            [ -- Games count
                              div [ class "mb-3 text-sm text-gray-500" ]
                                [ text ("Showing " ++ String.fromInt (List.length filteredGames) ++ " of " ++ String.fromInt gamesData.total ++ " games") ]

                            -- Game rows grouped by date
                            , div [ class "space-y-4" ]
                                (List.map (viewDateGroup student) groupedGames)

                            -- Pagination
                            , if totalPages > 1 then
                                viewPagination currentPage totalPages

                              else
                                text ""
                            ]

                _ ->
                    -- Fallback for when student data isn't loaded
                    div [ class "bg-white rounded-lg border border-gray-200 divide-y divide-gray-100" ]
                        (List.map viewGameRowSimple gamesData.games)


viewDateGroup : Student -> ( String, List GameWithInsights ) -> Html Msg
viewDateGroup student ( dateStr, games ) =
    div []
        [ -- Sticky date header
          div [ class "sticky top-0 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 border-b border-gray-200 z-10" ]
            [ text dateStr ]

        -- Games for this date
        , div [ class "bg-white rounded-lg border border-gray-200 divide-y divide-gray-100" ]
            (List.map (viewGameRow student) games)
        ]


viewPagination : Int -> Int -> Html Msg
viewPagination currentPage totalPages =
    let
        maxVisiblePages =
            7

        pages =
            if totalPages <= maxVisiblePages then
                List.range 0 (totalPages - 1)

            else if currentPage < 3 then
                List.range 0 (maxVisiblePages - 1)

            else if currentPage > totalPages - 4 then
                List.range (totalPages - maxVisiblePages) (totalPages - 1)

            else
                List.range (currentPage - 3) (currentPage + 3)
    in
    div [ class "mt-4 flex items-center justify-center gap-1" ]
        ([ if currentPage > 0 then
            button
                [ onClick (GoToPage (currentPage - 1))
                , class "px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                ]
                [ text "Prev" ]

           else
            text ""
         ]
            ++ List.map
                (\page ->
                    button
                        [ onClick (GoToPage page)
                        , class
                            (if page == currentPage then
                                "px-3 py-1 text-sm bg-orange-500 text-white rounded"

                             else
                                "px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                            )
                        ]
                        [ text (String.fromInt (page + 1)) ]
                )
                pages
            ++ [ if currentPage < totalPages - 1 then
                    button
                        [ onClick (GoToPage (currentPage + 1))
                        , class "px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                        ]
                        [ text "Next" ]

                 else
                    text ""
               ]
        )


viewGameRow : Student -> GameWithInsights -> Html Msg
viewGameRow student gameWithInsights =
    let
        game =
            gameWithInsights.game

        insight =
            gameWithInsights.insight

        tags =
            gameWithInsights.tags

        studentUsernames =
            List.filterMap identity [ student.chessComUsername ]

        isStudentWhite =
            List.member (String.toLower game.whiteUsername) (List.map String.toLower studentUsernames)

        opponent =
            if isStudentWhite then
                game.blackUsername

            else
                game.whiteUsername

        opponentRating =
            if isStudentWhite then
                game.blackElo

            else
                game.whiteElo

        resultText =
            resultToTextWithColor isStudentWhite game

        chessComAnalyzeUrl =
            "https://www.chess.com/analysis/game/live/" ++ game.platformGameId
    in
    a
        [ href chessComAnalyzeUrl
        , target "_blank"
        , class "block p-4 hover:bg-orange-50 transition-colors"
        ]
        [ div [ class "flex items-start justify-between gap-4" ]
            [ -- Color indicator (circle)
              span
                [ class
                    ("w-4 h-4 rounded-full flex-shrink-0 mt-1 border "
                        ++ (if isStudentWhite then
                                "bg-white border-gray-400"

                            else
                                "bg-gray-800 border-gray-800"
                           )
                    )
                , title
                    (if isStudentWhite then
                        "Played as White"

                     else
                        "Played as Black"
                    )
                ]
                []
            , div [ class "flex-1 min-w-0" ]
                [ -- Main row: result, opponent, rating
                  div [ class "flex items-center gap-2 flex-wrap" ]
                    [ span [ class resultText.colorClass ] [ text resultText.label ]
                    , span [ class "text-gray-700" ] [ text ("vs " ++ opponent) ]
                    , case opponentRating of
                        Just rating ->
                            span [ class "text-gray-600 font-semibold" ]
                                [ text ("(" ++ String.fromInt rating ++ ")") ]

                        Nothing ->
                            text ""

                    -- Accuracy badge with consistent color scale
                    , viewAccuracyBadge insight
                    ]

                -- Opening name
                , case game.openingName of
                    Just opening ->
                        div [ class "text-sm text-blue-600 mt-1" ]
                            [ text opening ]

                    Nothing ->
                        text ""

                -- Date and error counts
                , div [ class "text-sm text-gray-500 mt-1 flex items-center gap-3" ]
                    [ text (formatDate game.playedAt)

                    -- Improved error display
                    , viewErrorCounts insight
                    ]

                -- Tags row (show all tags with sentiment colors)
                , if not (List.isEmpty tags) then
                    div [ class "mt-2 flex flex-wrap gap-1" ]
                        (tags |> List.map viewGameTagBadge)

                  else
                    text ""
                ]

            -- Open link with better visibility
            , span [ class "text-orange-500 font-medium flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity" ]
                [ text "Open →" ]
            ]
        ]


{-| Improved accuracy badge with consistent color scale
-}
viewAccuracyBadge : Maybe GameInsight -> Html Msg
viewAccuracyBadge maybeInsight =
    case maybeInsight of
        Just ins ->
            case ins.accuracyOverall of
                Just acc ->
                    let
                        colors =
                            accuracyColorClasses acc

                        phaseTooltip =
                            [ ins.accuracyOpening |> Maybe.map (\a -> "Opening: " ++ formatAccuracy a ++ "%")
                            , ins.accuracyMiddlegame |> Maybe.map (\a -> "Middlegame: " ++ formatAccuracy a ++ "%")
                            , ins.accuracyEndgame |> Maybe.map (\a -> "Endgame: " ++ formatAccuracy a ++ "%")
                            ]
                                |> List.filterMap identity
                                |> String.join " | "
                    in
                    span
                        [ class ("text-xs px-2 py-0.5 rounded-full cursor-help " ++ colors.bg ++ " " ++ colors.text)
                        , title phaseTooltip
                        ]
                        [ text (formatAccuracy acc ++ "% acc") ]

                Nothing ->
                    text ""

        Nothing ->
            text ""


{-| Improved error counts display with clear labels and colored indicators
-}
viewErrorCounts : Maybe GameInsight -> Html Msg
viewErrorCounts maybeInsight =
    case maybeInsight of
        Just ins ->
            if ins.blundersCount > 0 || ins.mistakesCount > 0 || ins.inaccuraciesCount > 0 then
                div [ class "flex items-center gap-2 text-xs" ]
                    [ if ins.blundersCount > 0 then
                        span
                            [ class "flex items-center gap-1"
                            , title "Blunders: moves losing significant material or position"
                            ]
                            [ span [ class "w-2 h-2 rounded-full bg-red-500" ] []
                            , span [ class "text-red-600 font-medium" ]
                                [ text (String.fromInt ins.blundersCount ++ " Blunder" ++ pluralize ins.blundersCount) ]
                            ]

                      else
                        text ""
                    , if ins.mistakesCount > 0 then
                        span
                            [ class "flex items-center gap-1"
                            , title "Mistakes: moves losing small material or positional advantage"
                            ]
                            [ span [ class "w-2 h-2 rounded-full bg-orange-500" ] []
                            , span [ class "text-orange-600 font-medium" ]
                                [ text (String.fromInt ins.mistakesCount ++ " Mistake" ++ pluralize ins.mistakesCount) ]
                            ]

                      else
                        text ""
                    , if ins.inaccuraciesCount > 0 then
                        span
                            [ class "flex items-center gap-1"
                            , title "Inaccuracies: slight imprecisions"
                            ]
                            [ span [ class "w-2 h-2 rounded-full bg-yellow-500" ] []
                            , span [ class "text-yellow-600 font-medium" ]
                                [ text (String.fromInt ins.inaccuraciesCount ++ " Inaccuracy" ++ pluralizeIrregular ins.inaccuraciesCount) ]
                            ]

                      else
                        text ""
                    ]

            else
                span [ class "text-green-600 text-xs font-medium" ] [ text "Clean game" ]

        Nothing ->
            text ""


pluralize : Int -> String
pluralize count =
    if count == 1 then
        ""

    else
        "s"


pluralizeIrregular : Int -> String
pluralizeIrregular count =
    if count == 1 then
        ""

    else
        " (ies)"


viewGameTagBadge : GameTag -> Html Msg
viewGameTagBadge gameTag =
    let
        description =
            gameTag.tag.description |> Maybe.withDefault ""

        moveInfo =
            case gameTag.primaryMove of
                Just move ->
                    "Move " ++ String.fromInt move

                Nothing ->
                    if not (List.isEmpty gameTag.moveNumbers) then
                        "Moves: " ++ String.join ", " (List.map String.fromInt gameTag.moveNumbers)

                    else
                        ""

        hasTooltip =
            not (String.isEmpty description) || not (String.isEmpty moveInfo)
    in
    div [ class "group relative inline-block" ]
        [ span
            [ class ("text-xs px-2 py-0.5 rounded-full " ++ getTagSentimentClasses gameTag.tag) ]
            [ text gameTag.tag.name ]
        , if hasTooltip then
            div
                [ class "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none"
                ]
                [ text description
                , if not (String.isEmpty description) && not (String.isEmpty moveInfo) then
                    span [ class "mx-1 text-gray-400" ] [ text "|" ]

                  else
                    text ""
                , if not (String.isEmpty moveInfo) then
                    span [ class "text-orange-300" ] [ text moveInfo ]

                  else
                    text ""
                , -- Arrow
                  div [ class "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" ] []
                ]

          else
            text ""
        ]


viewGameRowSimple : GameWithInsights -> Html Msg
viewGameRowSimple gameWithInsights =
    let
        game =
            gameWithInsights.game

        chessComAnalyzeUrl =
            "https://www.chess.com/analysis/game/live/" ++ game.platformGameId
    in
    a
        [ href chessComAnalyzeUrl
        , target "_blank"
        , class "block p-4 hover:bg-orange-50 transition-colors"
        ]
        [ div [ class "flex items-center justify-between" ]
            [ div [ class "flex items-center gap-3" ]
                [ div []
                    [ div [ class "flex items-center gap-2" ]
                        [ span [ class "font-medium text-gray-900" ]
                            [ text (game.whiteUsername ++ " vs " ++ game.blackUsername) ]
                        ]
                    , div [ class "text-sm text-gray-500" ]
                        [ text (formatDate game.playedAt) ]
                    ]
                ]
            , span [ class "text-orange-500 font-medium opacity-60 hover:opacity-100 transition-opacity" ]
                [ text "Open →" ]
            ]
        ]


resultToTextWithColor : Bool -> { a | result : String } -> { label : String, colorClass : String }
resultToTextWithColor isStudentWhite game =
    case game.result of
        "1-0" ->
            if isStudentWhite then
                { label = "Win", colorClass = "font-semibold text-green-600" }

            else
                { label = "Loss", colorClass = "font-semibold text-red-600" }

        "0-1" ->
            if isStudentWhite then
                { label = "Loss", colorClass = "font-semibold text-red-600" }

            else
                { label = "Win", colorClass = "font-semibold text-green-600" }

        "1/2-1/2" ->
            { label = "Draw", colorClass = "font-semibold text-gray-600" }

        _ ->
            { label = game.result, colorClass = "font-medium text-gray-900" }


formatDate : String -> String
formatDate dateStr =
    String.left 10 dateStr


formatAccuracy : Float -> String
formatAccuracy acc =
    String.fromInt (round acc)



-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================


unique : List comparable -> List comparable
unique list =
    List.foldl
        (\item acc ->
            if List.member item acc then
                acc

            else
                acc ++ [ item ]
        )
        []
        list


indexOf : a -> List a -> Maybe Int
indexOf item list =
    indexOfHelper 0 item list


indexOfHelper : Int -> a -> List a -> Maybe Int
indexOfHelper index item list =
    case list of
        [] ->
            Nothing

        x :: xs ->
            if x == item then
                Just index

            else
                indexOfHelper (index + 1) item xs


capitalizeFirst : String -> String
capitalizeFirst str =
    case String.uncons str of
        Nothing ->
            ""

        Just ( first, rest ) ->
            String.cons (Char.toUpper first) rest
