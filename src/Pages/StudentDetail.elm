module Pages.StudentDetail exposing (Model, Msg, init, update, view)

import Api.Students
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onMouseEnter, onMouseLeave, stopPropagationOn)
import Http
import Json.Decode
import Route
import Set exposing (Set)
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



-- MODEL


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
    , opponentRatingFilter : String
    , opponentSearch : String
    , sortOrder : SortOrder
    , expandedGames : Set String
    , expandedFilterSections : Set String
    , sidebarVisible : Bool
    , hoveredGameId : Maybe String
    , limit : Int
    , offset : Int
    , apiUrl : String
    , token : String
    }


type SortOrder
    = DateNewest
    | DateOldest
    | AccuracyHigh
    | AccuracyLow
    | OpponentRatingHigh
    | OpponentRatingLow


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
      , expandedGames = Set.empty
      , expandedFilterSections = Set.fromList [ "result", "timeControl" ]
      , sidebarVisible = True
      , hoveredGameId = Nothing
      , limit = 25
      , offset = 0
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



-- MSG & UPDATE


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
    | ToggleGameExpanded String
    | ToggleFilterSection String
    | ToggleSidebar
    | LoadMore
    | GoToPage Int
    | HoverGame (Maybe String)


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
                newModel =
                    { model | minAccuracy = String.toInt str, games = Loading, offset = 0 }
            in
            ( newModel, fetchFilteredGames newModel )

        SetMaxAccuracy str ->
            let
                newModel =
                    { model | maxAccuracy = String.toInt str, games = Loading, offset = 0 }
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
                newModel =
                    { model | maxBlunders = String.toInt str, games = Loading, offset = 0 }
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

        ToggleGameExpanded gameId ->
            let
                newExpanded =
                    if Set.member gameId model.expandedGames then
                        Set.remove gameId model.expandedGames

                    else
                        Set.insert gameId model.expandedGames
            in
            ( { model | expandedGames = newExpanded }, Cmd.none )

        ToggleFilterSection section ->
            let
                newSections =
                    if Set.member section model.expandedFilterSections then
                        Set.remove section model.expandedFilterSections

                    else
                        Set.insert section model.expandedFilterSections
            in
            ( { model | expandedFilterSections = newSections }, Cmd.none )

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
                newModel =
                    { model | offset = page * model.limit, games = Loading }
            in
            ( newModel, fetchFilteredGames newModel )

        HoverGame maybeId ->
            ( { model | hoveredGameId = maybeId }, Cmd.none )


fetchFilteredGames : Model -> Cmd Msg
fetchFilteredGames model =
    let
        tagsParam =
            if List.isEmpty model.selectedTags then
                Nothing

            else
                Just (String.join "," model.selectedTags)

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



-- HELPERS


type alias AccuracyColors =
    { bg : String, text : String, bar : String }


accuracyColors : Float -> AccuracyColors
accuracyColors accuracy =
    if accuracy <= 40 then
        { bg = "bg-red-50", text = "text-red-700", bar = "bg-red-500" }

    else if accuracy <= 60 then
        { bg = "bg-orange-50", text = "text-orange-700", bar = "bg-orange-500" }

    else if accuracy <= 80 then
        { bg = "bg-yellow-50", text = "text-yellow-700", bar = "bg-yellow-500" }

    else
        { bg = "bg-green-50", text = "text-green-700", bar = "bg-green-500" }


getTagSentiment : Tag -> TagSentiment
getTagSentiment tag =
    let
        slug =
            String.toLower tag.slug
    in
    if List.member slug [ "fork-executed", "pin-created", "discovered-attack", "winning-converted", "clean-game", "high-accuracy", "delivered-checkmate", "comeback", "upset-victory", "well-prepared", "castled-kingside", "castled-queenside", "brilliant", "great-find", "best-move" ] then
        Positive

    else if List.member slug [ "fork-missed", "pin-missed", "opening-blunder", "got-checkmated", "winning-squandered", "low-accuracy", "collapsed-after-blunder", "flagged", "upset-loss", "back-rank-victim", "did-not-castle", "blunder" ] then
        Negative

    else
        Neutral


tagClasses : Tag -> String
tagClasses tag =
    case getTagSentiment tag of
        Positive ->
            "bg-green-100 text-green-700 border border-green-200"

        Negative ->
            "bg-red-100 text-red-700 border border-red-200"

        Neutral ->
            "bg-gray-100 text-gray-600 border border-gray-200"


hasActiveFilters : Model -> Bool
hasActiveFilters model =
    model.timeControlFilter /= AllTimeControls || model.resultFilter /= AllResults || model.colorFilter /= AllColors || not (List.isEmpty model.selectedTags) || model.minAccuracy /= Nothing || model.maxAccuracy /= Nothing || model.maxBlunders /= Nothing || model.opponentRatingFilter /= "all" || model.opponentSearch /= ""


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


sortGames : SortOrder -> Student -> List GameWithInsights -> List GameWithInsights
sortGames order student games =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername ]

        getOpponentRating g =
            let
                isWhite =
                    List.member (String.toLower g.game.whiteUsername) (List.map String.toLower studentUsernames)
            in
            if isWhite then
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
            List.sortBy getAccuracy games

        OpponentRatingHigh ->
            List.sortBy (\g -> -(getOpponentRating g)) games

        OpponentRatingLow ->
            List.sortBy getOpponentRating games


filterByOpponentName : String -> Student -> List GameWithInsights -> List GameWithInsights
filterByOpponentName searchStr student games =
    if String.isEmpty searchStr then
        games

    else
        let
            search =
                String.toLower searchStr

            studentUsernames =
                List.filterMap identity [ student.chessComUsername ] |> List.map String.toLower
        in
        List.filter
            (\g ->
                let
                    isWhite =
                        List.member (String.toLower g.game.whiteUsername) studentUsernames

                    opponent =
                        String.toLower
                            (if isWhite then
                                g.game.blackUsername

                             else
                                g.game.whiteUsername
                            )
                in
                String.contains search opponent
            )
            games


groupGamesByDate : List GameWithInsights -> List ( String, List GameWithInsights )
groupGamesByDate games =
    games
        |> List.foldl
            (\game acc ->
                let
                    dateStr =
                        String.left 10 game.game.playedAt
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


type alias GameStats =
    { total : Int, wins : Int, losses : Int, draws : Int, avgAccuracy : Maybe Float }


calculateStats : Student -> List GameWithInsights -> GameStats
calculateStats student games =
    let
        studentUsernames =
            List.filterMap identity [ student.chessComUsername ] |> List.map String.toLower

        isWin g =
            let
                isWhite =
                    List.member (String.toLower g.game.whiteUsername) studentUsernames
            in
            (isWhite && g.game.result == "1-0") || (not isWhite && g.game.result == "0-1")

        isLoss g =
            let
                isWhite =
                    List.member (String.toLower g.game.whiteUsername) studentUsernames
            in
            (isWhite && g.game.result == "0-1") || (not isWhite && g.game.result == "1-0")

        accuracies =
            List.filterMap (\g -> g.insight |> Maybe.andThen .accuracyOverall) games

        avgAcc =
            if List.isEmpty accuracies then
                Nothing

            else
                Just (List.sum accuracies / toFloat (List.length accuracies))
    in
    { total = List.length games
    , wins = List.length (List.filter isWin games)
    , losses = List.length (List.filter isLoss games)
    , draws = List.length (List.filter (\g -> g.game.result == "1/2-1/2") games)
    , avgAccuracy = avgAcc
    }


getPriorityTags : List GameTag -> List GameTag
getPriorityTags tags =
    List.take 3 tags


groupTagsByCategory : List GameTag -> List ( String, List GameTag )
groupTagsByCategory tags =
    let
        categories =
            tags |> List.map (\gt -> gt.tag.category) |> unique
    in
    categories
        |> List.map (\cat -> ( cat, List.filter (\gt -> gt.tag.category == cat) tags ))
        |> List.filter (\( _, tagList ) -> not (List.isEmpty tagList))


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


formatDateLabel : String -> String
formatDateLabel dateStr =
    let
        parts =
            String.split "-" dateStr
    in
    case parts of
        [ year, month, day ] ->
            let
                monthName =
                    case month of
                        "01" -> "Jan"
                        "02" -> "Feb"
                        "03" -> "Mar"
                        "04" -> "Apr"
                        "05" -> "May"
                        "06" -> "Jun"
                        "07" -> "Jul"
                        "08" -> "Aug"
                        "09" -> "Sep"
                        "10" -> "Oct"
                        "11" -> "Nov"
                        "12" -> "Dec"
                        _ -> month

                dayNum =
                    String.toInt day |> Maybe.withDefault 0 |> String.fromInt
            in
            monthName ++ " " ++ dayNum ++ ", " ++ year

        _ ->
            dateStr


pluralize : Int -> String
pluralize count =
    if count == 1 then
        ""

    else
        "s"



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "min-h-screen" ]
        [ -- Mobile filter toggle
          div [ class "lg:hidden fixed bottom-4 right-4 z-40" ]
            [ button
                [ onClick ToggleSidebar
                , class "bg-gray-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                ]
                [ text "Filters"
                , if countActiveFilters model > 0 then
                    span [ class "bg-white text-gray-900 text-xs px-2 py-0.5 rounded-full font-medium" ]
                        [ text (String.fromInt (countActiveFilters model)) ]

                  else
                    text ""
                ]
            ]

        -- Mobile overlay
        , if model.sidebarVisible then
            div [ class "lg:hidden fixed inset-0 bg-black/50 z-30", onClick ToggleSidebar ] []

          else
            text ""

        -- Main layout
        , div [ class "flex" ]
            [ viewSidebar model
            , div [ class "flex-1 min-w-0 p-4 lg:p-6" ]
                [ div [ class "max-w-4xl mx-auto" ]
                    [ viewStudentHeader model.student
                    , viewStatsHeader model
                    , viewGamesList model
                    ]
                ]
            ]
        ]


viewSidebar : Model -> Html Msg
viewSidebar model =
    div
        [ class
            (if model.sidebarVisible then
                "fixed lg:sticky inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-200 lg:translate-x-0 lg:top-0 lg:h-screen shadow-lg lg:shadow-none"

             else
                "fixed lg:sticky inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 overflow-y-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-200 lg:top-0 lg:h-screen"
            )
        ]
        [ div [ class "p-4" ]
            [ -- Mobile close
              div [ class "lg:hidden flex justify-between items-center mb-4" ]
                [ span [ class "font-semibold text-gray-900" ] [ text "Filters" ]
                , button [ onClick ToggleSidebar, class "text-gray-400 hover:text-gray-600 p-1" ] [ text "✕" ]
                ]

            -- Back link
            , a [ Route.href Route.Dashboard, class "inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6" ]
                [ span [ class "text-lg" ] [ text "←" ], text "Dashboard" ]

            -- Filter header
            , div [ class "flex items-center justify-between mb-4" ]
                [ div [ class "flex items-center gap-2" ]
                    [ span [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide" ] [ text "Filters" ]
                    , if countActiveFilters model > 0 then
                        span [ class "bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-full font-medium" ]
                            [ text (String.fromInt (countActiveFilters model)) ]

                      else
                        text ""
                    ]
                , if hasActiveFilters model then
                    button [ onClick ClearAllFilters, class "text-xs text-red-600 hover:text-red-700 font-medium" ]
                        [ text "Clear all" ]

                  else
                    text ""
                ]

            -- Filters
            , div [ class "space-y-1" ]
                [ viewFilterSection model "result" "Result" (model.resultFilter /= AllResults) (viewResultFilter model)
                , viewFilterSection model "timeControl" "Time Control" (model.timeControlFilter /= AllTimeControls) (viewTimeControlFilter model)
                , viewFilterSection model "color" "Played As" (model.colorFilter /= AllColors) (viewColorFilter model)
                , viewFilterSection model "accuracy" "Accuracy" (model.minAccuracy /= Nothing || model.maxAccuracy /= Nothing) (viewAccuracyFilter model)
                , viewFilterSection model "opponent" "Opponent" (model.opponentRatingFilter /= "all" || model.opponentSearch /= "") (viewOpponentFilter model)
                , viewFilterSection model "tags" "Tags" (not (List.isEmpty model.selectedTags)) (viewTagFilters model)
                ]

            -- Sort
            , div [ class "mt-6 pt-4 border-t border-gray-100" ]
                [ div [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2" ] [ text "Sort By" ]
                , select
                    [ class "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                    , onInput
                        (\str ->
                            case str of
                                "date-newest" -> SetSortOrder DateNewest
                                "date-oldest" -> SetSortOrder DateOldest
                                "accuracy-high" -> SetSortOrder AccuracyHigh
                                "accuracy-low" -> SetSortOrder AccuracyLow
                                "rating-high" -> SetSortOrder OpponentRatingHigh
                                "rating-low" -> SetSortOrder OpponentRatingLow
                                _ -> SetSortOrder DateNewest
                        )
                    ]
                    [ option [ value "date-newest", selected (model.sortOrder == DateNewest) ] [ text "Date (Newest)" ]
                    , option [ value "date-oldest", selected (model.sortOrder == DateOldest) ] [ text "Date (Oldest)" ]
                    , option [ value "accuracy-high", selected (model.sortOrder == AccuracyHigh) ] [ text "Accuracy (High)" ]
                    , option [ value "accuracy-low", selected (model.sortOrder == AccuracyLow) ] [ text "Accuracy (Low)" ]
                    , option [ value "rating-high", selected (model.sortOrder == OpponentRatingHigh) ] [ text "Opp. Rating (High)" ]
                    , option [ value "rating-low", selected (model.sortOrder == OpponentRatingLow) ] [ text "Opp. Rating (Low)" ]
                    ]
                ]
            ]
        ]


viewFilterSection : Model -> String -> String -> Bool -> Html Msg -> Html Msg
viewFilterSection model sectionId label hasActiveFilter content =
    let
        isExpanded =
            Set.member sectionId model.expandedFilterSections
    in
    div [ class "border-b border-gray-100 last:border-0" ]
        [ button
            [ onClick (ToggleFilterSection sectionId)
            , class "w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 -mx-2 px-2 rounded"
            ]
            [ div [ class "flex items-center gap-2" ]
                [ span [ class "text-sm font-medium text-gray-700" ] [ text label ]
                , if hasActiveFilter then
                    span [ class "w-2 h-2 rounded-full bg-green-500" ] []

                  else
                    text ""
                ]
            , span [ class "text-gray-400 text-xs" ]
                [ text
                    (if isExpanded then
                        "▼"

                     else
                        "▶"
                    )
                ]
            ]
        , if isExpanded then
            div [ class "pb-3" ] [ content ]

          else
            text ""
        ]


viewResultFilter : Model -> Html Msg
viewResultFilter model =
    div [ class "space-y-1" ]
        [ viewRadioOption "All" (model.resultFilter == AllResults) (SetResultFilter AllResults)
        , viewRadioOption "Wins" (model.resultFilter == WinsOnly) (SetResultFilter WinsOnly)
        , viewRadioOption "Losses" (model.resultFilter == LossesOnly) (SetResultFilter LossesOnly)
        , viewRadioOption "Draws" (model.resultFilter == DrawsOnly) (SetResultFilter DrawsOnly)
        ]


viewTimeControlFilter : Model -> Html Msg
viewTimeControlFilter model =
    div [ class "space-y-1" ]
        [ viewRadioOption "All" (model.timeControlFilter == AllTimeControls) (SetTimeControlFilter AllTimeControls)
        , viewRadioOption "Bullet" (model.timeControlFilter == Bullet) (SetTimeControlFilter Bullet)
        , viewRadioOption "Blitz" (model.timeControlFilter == Blitz) (SetTimeControlFilter Blitz)
        , viewRadioOption "Rapid" (model.timeControlFilter == Rapid) (SetTimeControlFilter Rapid)
        ]


viewColorFilter : Model -> Html Msg
viewColorFilter model =
    div [ class "space-y-1" ]
        [ viewRadioOption "All" (model.colorFilter == AllColors) (SetColorFilter AllColors)
        , viewRadioOption "White" (model.colorFilter == WhiteOnly) (SetColorFilter WhiteOnly)
        , viewRadioOption "Black" (model.colorFilter == BlackOnly) (SetColorFilter BlackOnly)
        ]


viewRadioOption : String -> Bool -> Msg -> Html Msg
viewRadioOption label isSelected msg =
    button
        [ onClick msg
        , class "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50"
        ]
        [ span
            [ class
                (if isSelected then
                    "w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center"

                 else
                    "w-4 h-4 rounded-full border-2 border-gray-300"
                )
            ]
            [ if isSelected then
                span [ class "w-2 h-2 rounded-full bg-gray-900" ] []

              else
                text ""
            ]
        , span [ class (if isSelected then "text-gray-900 font-medium" else "text-gray-600") ] [ text label ]
        ]


viewAccuracyFilter : Model -> Html Msg
viewAccuracyFilter model =
    div [ class "flex items-center gap-2" ]
        [ input
            [ type_ "number"
            , class "w-16 px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            , placeholder "Min"
            , Html.Attributes.min "0"
            , Html.Attributes.max "100"
            , value (model.minAccuracy |> Maybe.map String.fromInt |> Maybe.withDefault "")
            , onInput SetMinAccuracy
            ]
            []
        , span [ class "text-gray-400 text-sm" ] [ text "–" ]
        , input
            [ type_ "number"
            , class "w-16 px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            , placeholder "Max"
            , Html.Attributes.min "0"
            , Html.Attributes.max "100"
            , value (model.maxAccuracy |> Maybe.map String.fromInt |> Maybe.withDefault "")
            , onInput SetMaxAccuracy
            ]
            []
        , if model.minAccuracy /= Nothing || model.maxAccuracy /= Nothing then
            button [ onClick ClearAccuracy, class "text-xs text-gray-400 hover:text-gray-600" ] [ text "Clear" ]

          else
            text ""
        ]


viewOpponentFilter : Model -> Html Msg
viewOpponentFilter model =
    div [ class "space-y-3" ]
        [ input
            [ type_ "text"
            , class "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            , placeholder "Search opponent..."
            , value model.opponentSearch
            , onInput SetOpponentSearch
            ]
            []
        , div [ class "space-y-1" ]
            [ viewRadioOption "Any rating" (model.opponentRatingFilter == "all") (SetOpponentRatingFilter "all")
            , viewRadioOption "Higher rated" (model.opponentRatingFilter == "higher") (SetOpponentRatingFilter "higher")
            , viewRadioOption "Lower rated" (model.opponentRatingFilter == "lower") (SetOpponentRatingFilter "lower")
            ]
        ]


viewTagFilters : Model -> Html Msg
viewTagFilters model =
    case model.tags of
        Loading ->
            div [ class "text-sm text-gray-400" ] [ text "Loading..." ]

        Failure _ ->
            text ""

        NotAsked ->
            text ""

        Success tagsWithCounts ->
            let
                sortedTags =
                    tagsWithCounts |> List.sortBy (\tc -> -tc.count) |> List.take 20
            in
            div []
                [ if not (List.isEmpty model.selectedTags) then
                    div [ class "flex items-center justify-between mb-2" ]
                        [ span [ class "text-xs text-gray-500" ] [ text (String.fromInt (List.length model.selectedTags) ++ " selected") ]
                        , button [ onClick ClearTags, class "text-xs text-red-600 hover:text-red-700" ] [ text "Clear" ]
                        ]

                  else
                    text ""
                , div [ class "flex flex-wrap gap-1" ]
                    (List.map (viewFilterTagChip model.selectedTags) sortedTags)
                ]


viewFilterTagChip : List String -> TagWithCount -> Html Msg
viewFilterTagChip selectedTags tc =
    let
        isSelected =
            List.member tc.tag.slug selectedTags
    in
    button
        [ onClick (ToggleTag tc.tag.slug)
        , class
            (if isSelected then
                "px-2 py-1 text-xs rounded-full bg-gray-900 text-white"

             else
                "px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            )
        ]
        [ text (tc.tag.name ++ " (" ++ String.fromInt tc.count ++ ")") ]


viewStudentHeader : RemoteData String Student -> Html Msg
viewStudentHeader studentData =
    case studentData of
        Loading ->
            div [ class "mb-6 animate-pulse" ]
                [ div [ class "flex items-center gap-4" ]
                    [ div [ class "w-16 h-16 bg-gray-200 rounded-full" ] []
                    , div [ class "space-y-2" ]
                        [ div [ class "w-40 h-6 bg-gray-200 rounded" ] []
                        , div [ class "w-28 h-4 bg-gray-200 rounded" ] []
                        ]
                    ]
                ]

        Failure error ->
            div [ class "mb-6 bg-red-50 border border-red-200 rounded-lg p-4" ]
                [ p [ class "text-red-600" ] [ text error ] ]

        NotAsked ->
            text ""

        Success student ->
            div [ class "mb-6" ]
                [ div [ class "flex items-center gap-4" ]
                    [ case student.avatarUrl of
                        Just url ->
                            img [ src url, class "w-16 h-16 rounded-full border-2 border-gray-200 shadow-sm", alt student.displayName ] []

                        Nothing ->
                            div [ class "w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl text-gray-600 font-semibold shadow-sm" ]
                                [ text (String.left 1 student.displayName |> String.toUpper) ]
                    , div []
                        [ h1 [ class "text-2xl font-bold text-gray-900" ] [ text student.displayName ]
                        , case student.chessComUsername of
                            Just username ->
                                a [ href ("https://www.chess.com/member/" ++ username), target "_blank", class "text-sm text-gray-500 hover:text-gray-700" ]
                                    [ text ("@" ++ username) ]

                            Nothing ->
                                text ""
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
            div [ class "mb-6 bg-white rounded-xl border border-gray-200 p-5 shadow-sm" ]
                [ div [ class "grid grid-cols-2 lg:grid-cols-4 gap-6" ]
                    [ div [ class "text-center" ]
                        [ div [ class "text-3xl font-bold text-gray-900" ] [ text (String.fromInt gamesData.total) ]
                        , div [ class "text-sm text-gray-500 mt-1" ] [ text "Games" ]
                        ]
                    , div [ class "text-center" ]
                        [ case stats.avgAccuracy of
                            Just acc ->
                                let
                                    colors =
                                        accuracyColors acc
                                in
                                div []
                                    [ div [ class ("text-3xl font-bold " ++ colors.text) ] [ text (String.fromInt (round acc) ++ "%") ]
                                    , div [ class "text-sm text-gray-500 mt-1" ] [ text "Accuracy" ]
                                    ]

                            Nothing ->
                                div []
                                    [ div [ class "text-3xl font-bold text-gray-300" ] [ text "—" ]
                                    , div [ class "text-sm text-gray-500 mt-1" ] [ text "Accuracy" ]
                                    ]
                        ]
                    , div [ class "text-center" ]
                        [ div [ class "text-3xl font-bold text-gray-900" ]
                            [ text
                                (if totalGames > 0 then
                                    String.fromInt (round winPercent) ++ "%"

                                 else
                                    "—"
                                )
                            ]
                        , div [ class "text-sm text-gray-500 mt-1" ] [ text "Win Rate" ]
                        ]
                    , div [ class "col-span-2 lg:col-span-1" ]
                        [ div [ class "text-sm text-gray-500 mb-2 text-center" ] [ text "Results" ]
                        , div [ class "h-4 rounded-full overflow-hidden bg-gray-100 flex" ]
                            [ if winPercent > 0 then
                                div [ class "bg-green-500 transition-all", style "width" (String.fromFloat winPercent ++ "%"), title (String.fromInt (round winPercent) ++ "% wins") ] []

                              else
                                text ""
                            , if drawPercent > 0 then
                                div [ class "bg-gray-400 transition-all", style "width" (String.fromFloat drawPercent ++ "%"), title (String.fromInt (round drawPercent) ++ "% draws") ] []

                              else
                                text ""
                            , if lossPercent > 0 then
                                div [ class "bg-red-500 transition-all", style "width" (String.fromFloat lossPercent ++ "%"), title (String.fromInt (round lossPercent) ++ "% losses") ] []

                              else
                                text ""
                            ]
                        , div [ class "flex justify-between text-xs mt-2 font-medium" ]
                            [ span [ class "text-green-600" ] [ text (String.fromInt stats.wins ++ "W") ]
                            , span [ class "text-gray-500" ] [ text (String.fromInt stats.draws ++ "D") ]
                            , span [ class "text-red-600" ] [ text (String.fromInt stats.losses ++ "L") ]
                            ]
                        ]
                    ]
                ]

        _ ->
            text ""


viewGamesList : Model -> Html Msg
viewGamesList model =
    case model.games of
        NotAsked ->
            text ""

        Loading ->
            div [ class "space-y-3" ]
                (List.repeat 5
                    (div [ class "bg-white rounded-xl border border-gray-200 p-4 animate-pulse" ]
                        [ div [ class "flex items-center gap-4" ]
                            [ div [ class "w-16 h-8 bg-gray-200 rounded-lg" ] []
                            , div [ class "flex-1 space-y-2" ]
                                [ div [ class "w-48 h-4 bg-gray-200 rounded" ] []
                                , div [ class "w-32 h-3 bg-gray-200 rounded" ] []
                                ]
                            , div [ class "w-16 h-6 bg-gray-200 rounded" ] []
                            ]
                        ]
                    )
                )

        Failure error ->
            div [ class "bg-red-50 border border-red-200 rounded-xl p-6 text-red-600" ] [ text error ]

        Success gamesData ->
            case model.student of
                Success student ->
                    let
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
                        div [ class "bg-white rounded-xl border border-gray-200 p-12 text-center" ]
                            [ div [ class "text-6xl mb-4" ] [ text "♟" ]
                            , div [ class "text-gray-600 mb-2 font-medium" ] [ text "No games found" ]
                            , div [ class "text-sm text-gray-400 mb-4" ] [ text "Try adjusting your filters" ]
                            , if hasActiveFilters model then
                                button [ onClick ClearAllFilters, class "text-sm text-gray-700 hover:text-gray-900 font-medium underline" ]
                                    [ text "Clear all filters" ]

                              else
                                text ""
                            ]

                    else
                        div []
                            [ div [ class "mb-4" ]
                                [ span [ class "text-sm text-gray-500" ]
                                    [ text ("Showing " ++ String.fromInt (model.offset + 1) ++ "-" ++ String.fromInt (model.offset + List.length filteredGames) ++ " of " ++ String.fromInt gamesData.total ++ " games") ]
                                ]
                            , div [ class "space-y-6" ] (List.map (viewDateGroup model student) groupedGames)
                            , if totalPages > 1 then
                                viewPagination currentPage totalPages

                              else
                                text ""
                            ]

                _ ->
                    text ""


viewDateGroup : Model -> Student -> ( String, List GameWithInsights ) -> Html Msg
viewDateGroup model student ( dateStr, games ) =
    div []
        [ div [ class "sticky top-0 z-10 py-3" ]
            [ div [ class "flex items-center gap-3" ]
                [ div [ class "h-px flex-1 bg-gray-200" ] []
                , span [ class "text-xs font-medium text-gray-400 px-2" ]
                    [ text (formatDateLabel dateStr)
                    , span [ class "ml-1 text-gray-300" ] [ text ("· " ++ String.fromInt (List.length games) ++ " games") ]
                    ]
                , div [ class "h-px flex-1 bg-gray-200" ] []
                ]
            ]
        , div [ class "space-y-2" ] (List.map (viewGameCard model student) games)
        ]


viewGameCard : Model -> Student -> GameWithInsights -> Html Msg
viewGameCard model student gameWithInsights =
    let
        game =
            gameWithInsights.game

        insight =
            gameWithInsights.insight

        tags =
            gameWithInsights.tags

        isExpanded =
            Set.member game.id model.expandedGames

        isHovered =
            model.hoveredGameId == Just game.id

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

        studentRating =
            if isStudentWhite then
                game.whiteElo

            else
                game.blackElo

        ratingDiff =
            Maybe.map2 (-) opponentRating studentRating

        result =
            getResultInfo isStudentWhite game.result

        chessComUrl =
            "https://www.chess.com/analysis/game/live/" ++ game.platformGameId

        priorityTags =
            getPriorityTags tags
    in
    div
        [ class
            ("bg-white rounded-xl border transition-all duration-200 cursor-pointer "
                ++ (if isExpanded then
                        "border-gray-300 shadow-md"

                    else if isHovered then
                        "border-gray-300 shadow-sm"

                    else
                        "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                   )
            )
        , onClick (ToggleGameExpanded game.id)
        , onMouseEnter (HoverGame (Just game.id))
        , onMouseLeave (HoverGame Nothing)
        ]
        [ div [ class "p-4" ]
            [ div [ class "flex items-start gap-4" ]
                [ -- Large result badge
                  div [ class ("flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center font-bold text-sm " ++ result.badgeClasses) ]
                    [ text result.label ]

                -- Main info
                , div [ class "flex-1 min-w-0" ]
                    [ div [ class "flex items-center gap-2 flex-wrap" ]
                        [ span [ class "font-semibold text-gray-900" ] [ text opponent ]
                        , case opponentRating of
                            Just rating ->
                                span [ class "text-gray-500 text-sm" ] [ text ("(" ++ String.fromInt rating ++ ")") ]

                            Nothing ->
                                text ""
                        , case ratingDiff of
                            Just diff ->
                                if diff > 0 then
                                    span [ class "text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium" ]
                                        [ text ("+" ++ String.fromInt diff) ]

                                else if diff < 0 then
                                    span [ class "text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-medium" ]
                                        [ text (String.fromInt diff) ]

                                else
                                    text ""

                            Nothing ->
                                text ""
                        , span
                            [ class "w-4 h-4 rounded border border-gray-300 flex-shrink-0"
                            , style "background"
                                (if isStudentWhite then
                                    "#fff"

                                 else
                                    "#374151"
                                )
                            , title
                                (if isStudentWhite then
                                    "Played as White"

                                 else
                                    "Played as Black"
                                )
                            ]
                            []
                        ]
                    , case game.openingName of
                        Just opening ->
                            div [ class "text-sm text-gray-500 mt-1 truncate" ] [ text opening ]

                        Nothing ->
                            text ""
                    , div [ class "flex items-center gap-3 mt-2 text-sm" ]
                        [ span [ class "text-gray-400" ] [ text (String.left 10 game.playedAt) ]
                        , viewAccuracyBadge insight
                        ]
                    , if isExpanded then
                        viewExpandedContent insight tags chessComUrl

                      else if not (List.isEmpty priorityTags) then
                        div [ class "flex items-center gap-2 mt-3" ]
                            [ div [ class "flex flex-wrap gap-1.5" ] (List.map viewTagBadge priorityTags)
                            , if List.length tags > 3 then
                                span [ class "text-xs text-gray-400 font-medium" ] [ text ("+" ++ String.fromInt (List.length tags - 3) ++ " more") ]

                              else
                                text ""
                            ]

                      else
                        text ""
                    ]

                -- Expand indicator
                , div [ class "flex flex-col items-end gap-2" ]
                    [ span [ class "text-gray-400 text-sm" ]
                        [ text
                            (if isExpanded then
                                "▲"

                             else
                                "▼"
                            )
                        ]
                    , if isHovered && not isExpanded then
                        a
                            [ href chessComUrl
                            , target "_blank"
                            , class "text-xs text-gray-500 hover:text-gray-700 font-medium"
                            , stopPropagationOn "click" (Json.Decode.succeed ( HoverGame Nothing, True ))
                            ]
                            [ text "Analyze →" ]

                      else
                        text ""
                    ]
                ]
            ]
        ]


viewAccuracyBadge : Maybe GameInsight -> Html Msg
viewAccuracyBadge maybeInsight =
    case maybeInsight of
        Just ins ->
            case ins.accuracyOverall of
                Just acc ->
                    let
                        colors =
                            accuracyColors acc
                    in
                    span [ class ("px-2 py-0.5 rounded text-xs font-semibold " ++ colors.bg ++ " " ++ colors.text) ]
                        [ text (String.fromInt (round acc) ++ "% accuracy") ]

                Nothing ->
                    text ""

        Nothing ->
            text ""


viewExpandedContent : Maybe GameInsight -> List GameTag -> String -> Html Msg
viewExpandedContent maybeInsight tags chessComUrl =
    div [ class "mt-4 pt-4 border-t border-gray-100 space-y-4" ]
        [ case maybeInsight of
            Just ins ->
                div []
                    [ div [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2" ] [ text "Performance" ]
                    , viewAccuracyBar ins
                    , viewErrorSummary ins
                    ]

            Nothing ->
                text ""
        , if not (List.isEmpty tags) then
            let
                grouped =
                    groupTagsByCategory tags
            in
            div [ class "space-y-3" ] (List.map viewTagGroup grouped)

          else
            text ""
        , div [ class "flex items-center gap-4 pt-2" ]
            [ a
                [ href chessComUrl
                , target "_blank"
                , class "inline-flex items-center gap-1.5 text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium"
                , stopPropagationOn "click" (Json.Decode.succeed ( HoverGame Nothing, True ))
                ]
                [ text "View Analysis", span [] [ text "→" ] ]
            ]
        ]


viewAccuracyBar : GameInsight -> Html Msg
viewAccuracyBar ins =
    case ins.accuracyOverall of
        Just acc ->
            let
                colors =
                    accuracyColors acc
            in
            div [ class "mb-3" ]
                [ div [ class "flex items-center gap-3" ]
                    [ div [ class "flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden" ]
                        [ div [ class ("h-full rounded-full " ++ colors.bar), style "width" (String.fromFloat acc ++ "%") ] [] ]
                    , span [ class ("text-sm font-bold " ++ colors.text) ] [ text (String.fromInt (round acc) ++ "%") ]
                    ]
                , div [ class "flex gap-4 mt-2 text-xs text-gray-500" ]
                    [ case ins.accuracyOpening of
                        Just a ->
                            span [] [ text ("Opening: " ++ String.fromInt (round a) ++ "%") ]

                        Nothing ->
                            text ""
                    , case ins.accuracyMiddlegame of
                        Just a ->
                            span [] [ text ("Middle: " ++ String.fromInt (round a) ++ "%") ]

                        Nothing ->
                            text ""
                    , case ins.accuracyEndgame of
                        Just a ->
                            span [] [ text ("End: " ++ String.fromInt (round a) ++ "%") ]

                        Nothing ->
                            text ""
                    ]
                ]

        Nothing ->
            text ""


viewErrorSummary : GameInsight -> Html Msg
viewErrorSummary ins =
    let
        items =
            [ ( ins.blundersCount, "Blunder", "bg-red-500" )
            , ( ins.mistakesCount, "Mistake", "bg-orange-500" )
            , ( ins.inaccuraciesCount, "Inaccuracy", "bg-yellow-500" )
            ]
                |> List.filter (\( count, _, _ ) -> count > 0)
    in
    if List.isEmpty items then
        div [ class "flex items-center gap-2 text-sm text-green-600 font-medium" ]
            [ span [ class "text-lg" ] [ text "✓" ], text "Clean game - no major errors" ]

    else
        div [ class "flex items-center gap-4 text-sm" ]
            (List.map
                (\( count, label, color ) ->
                    span [ class "flex items-center gap-1.5" ]
                        [ span [ class ("w-2.5 h-2.5 rounded-full " ++ color) ] []
                        , span [ class "text-gray-600 font-medium" ] [ text (String.fromInt count ++ " " ++ label ++ pluralize count) ]
                        ]
                )
                items
            )


viewTagGroup : ( String, List GameTag ) -> Html Msg
viewTagGroup ( category, tags ) =
    div []
        [ div [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5" ]
            [ text (String.replace "_" " " category) ]
        , div [ class "flex flex-wrap gap-1.5" ] (List.map viewTagBadge tags)
        ]


viewTagBadge : GameTag -> Html Msg
viewTagBadge gameTag =
    span
        [ class ("px-2.5 py-1 text-xs rounded-full font-medium " ++ tagClasses gameTag.tag)
        , title (gameTag.tag.description |> Maybe.withDefault gameTag.tag.name)
        ]
        [ text gameTag.tag.name ]


viewPagination : Int -> Int -> Html Msg
viewPagination currentPage totalPages =
    let
        pages =
            if totalPages <= 7 then
                List.range 0 (totalPages - 1)

            else if currentPage < 3 then
                List.range 0 6

            else if currentPage > totalPages - 4 then
                List.range (totalPages - 7) (totalPages - 1)

            else
                List.range (currentPage - 3) (currentPage + 3)
    in
    div [ class "mt-6 flex items-center justify-center gap-1" ]
        ([ if currentPage > 0 then
            button [ onClick (GoToPage (currentPage - 1)), class "px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium" ]
                [ text "← Prev" ]

           else
            text ""
         ]
            ++ List.map
                (\page ->
                    button
                        [ onClick (GoToPage page)
                        , class
                            (if page == currentPage then
                                "px-3 py-2 text-sm bg-gray-900 text-white rounded-lg font-medium"

                             else
                                "px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                            )
                        ]
                        [ text (String.fromInt (page + 1)) ]
                )
                pages
            ++ [ if currentPage < totalPages - 1 then
                    button [ onClick (GoToPage (currentPage + 1)), class "px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium" ]
                        [ text "Next →" ]

                 else
                    text ""
               ]
        )


type alias ResultInfo =
    { label : String, badgeClasses : String }


getResultInfo : Bool -> String -> ResultInfo
getResultInfo isStudentWhite result =
    case result of
        "1-0" ->
            if isStudentWhite then
                { label = "WIN", badgeClasses = "bg-green-100 text-green-700 border border-green-200" }

            else
                { label = "LOSS", badgeClasses = "bg-red-100 text-red-700 border border-red-200" }

        "0-1" ->
            if isStudentWhite then
                { label = "LOSS", badgeClasses = "bg-red-100 text-red-700 border border-red-200" }

            else
                { label = "WIN", badgeClasses = "bg-green-100 text-green-700 border border-green-200" }

        "1/2-1/2" ->
            { label = "DRAW", badgeClasses = "bg-gray-100 text-gray-600 border border-gray-200" }

        _ ->
            { label = result, badgeClasses = "bg-gray-100 text-gray-600 border border-gray-200" }
