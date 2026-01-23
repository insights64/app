module Pages.StudentDetail exposing (Model, Msg, init, update, view)

import Api.Students
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
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



-- ============================================================================
-- MODEL
-- ============================================================================


type alias Model =
    { studentId : String
    , student : RemoteData String Student
    , games : RemoteData String { games : List GameWithInsights, total : Int }
    , tags : RemoteData String (List TagWithCount)

    -- Filters
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

    -- UI State
    , expandedGames : Set String -- Track which game cards are expanded
    , expandedFilterSections : Set String -- Track which filter sections are expanded
    , sidebarVisible : Bool

    -- Pagination
    , limit : Int
    , offset : Int

    -- Config
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
    | ToggleGameExpanded String
    | ToggleFilterSection String
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


{-| Color palette from design spec
-}
type alias AccuracyColors =
    { bg : String, text : String, border : String, bar : String }


accuracyColorClasses : Float -> AccuracyColors
accuracyColorClasses accuracy =
    if accuracy <= 40 then
        { bg = "bg-red-50", text = "text-red-700", border = "border-red-200", bar = "bg-red-500" }

    else if accuracy <= 60 then
        { bg = "bg-orange-50", text = "text-orange-700", border = "border-orange-200", bar = "bg-orange-500" }

    else if accuracy <= 80 then
        { bg = "bg-yellow-50", text = "text-yellow-700", border = "border-yellow-200", bar = "bg-yellow-500" }

    else
        { bg = "bg-green-50", text = "text-green-700", border = "border-green-200", bar = "bg-green-500" }


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
            , "brilliant"
            , "great-find"
            , "best-move"
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
            , "blunder"
            ]
    then
        Negative

    else
        Neutral


getTagSentimentClasses : Tag -> String
getTagSentimentClasses tag =
    case getTagSentiment tag of
        Positive ->
            "bg-green-100 text-green-700"

        Negative ->
            "bg-red-100 text-red-700"

        Neutral ->
            "bg-slate-100 text-slate-600"


{-| Achievement badges (Brilliant, Great Find, etc) get special gold styling
-}
isAchievementTag : Tag -> Bool
isAchievementTag tag =
    List.member (String.toLower tag.slug)
        [ "brilliant", "great-find", "best-move", "excellent" ]


getAchievementClasses : String
getAchievementClasses =
    "bg-amber-100 text-amber-700 border border-amber-200"


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


groupGamesByDate : List GameWithInsights -> List ( String, List GameWithInsights )
groupGamesByDate games =
    games
        |> List.foldl
            (\game acc ->
                let
                    dateStr =
                        formatDateGroupLabel game.game.playedAt
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


formatDateGroupLabel : String -> String
formatDateGroupLabel dateStr =
    -- For now, just use the date portion. Could be enhanced with "Today", "Yesterday" etc.
    String.left 10 dateStr


type alias GameStats =
    { total : Int
    , wins : Int
    , losses : Int
    , draws : Int
    , avgAccuracy : Maybe Float
    , winRate : Float
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

        total =
            List.length games

        wins =
            List.length (List.filter isWin games)

        winRate =
            if total > 0 then
                toFloat wins / toFloat total * 100

            else
                0
    in
    { total = total
    , wins = wins
    , losses = List.length (List.filter isLoss games)
    , draws = List.length (List.filter isDraw games)
    , avgAccuracy = avgAcc
    , winRate = winRate
    }


{-| Get priority tags for collapsed view (max 3)
Achievement tags first, then by sentiment
-}
getPriorityTags : List GameTag -> List GameTag
getPriorityTags tags =
    let
        achievements =
            List.filter (\gt -> isAchievementTag gt.tag) tags

        nonAchievements =
            List.filter (\gt -> not (isAchievementTag gt.tag)) tags

        sorted =
            achievements ++ nonAchievements
    in
    List.take 3 sorted


{-| Group tags by category for expanded view
-}
groupTagsByCategory : List GameTag -> List ( String, List GameTag )
groupTagsByCategory tags =
    let
        categories =
            tags
                |> List.map (\gt -> gt.tag.category)
                |> unique

        categoryOrder =
            [ "tactics", "opening", "accuracy", "advantage", "endgame", "checkmate", "character", "opponent", "time" ]

        sortedCategories =
            List.sortBy
                (\cat ->
                    indexOf cat categoryOrder |> Maybe.withDefault 999
                )
                categories
    in
    sortedCategories
        |> List.map
            (\cat ->
                ( cat, List.filter (\gt -> gt.tag.category == cat) tags )
            )
        |> List.filter (\( _, tagList ) -> not (List.isEmpty tagList))



-- ============================================================================
-- VIEW
-- ============================================================================


view : Model -> Html Msg
view model =
    div [ class "min-h-screen bg-gray-50" ]
        [ -- Mobile filter toggle button
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

        -- Mobile sidebar overlay
        , if model.sidebarVisible then
            div [ class "lg:hidden fixed inset-0 bg-black/50 z-30", onClick ToggleSidebar ] []

          else
            text ""

        -- Main layout
        , div [ class "flex" ]
            [ -- Sidebar
              viewSidebar model

            -- Main content
            , div [ class "flex-1 min-w-0 p-4 lg:p-6" ]
                [ div [ class "max-w-3xl mx-auto" ]
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
                "fixed lg:sticky inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-200 lg:translate-x-0 lg:top-0 lg:h-screen"

             else
                "fixed lg:sticky inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 overflow-y-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-200 lg:top-0 lg:h-screen"
            )
        ]
        [ div [ class "p-4" ]
            [ -- Mobile close button
              div [ class "lg:hidden flex justify-between items-center mb-4" ]
                [ span [ class "font-semibold text-gray-900" ] [ text "Filters" ]
                , button
                    [ onClick ToggleSidebar
                    , class "text-gray-400 hover:text-gray-600 p-1"
                    ]
                    [ text "✕" ]
                ]

            -- Back link
            , a
                [ Route.href Route.Dashboard
                , class "inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
                ]
                [ span [ class "text-lg" ] [ text "←" ]
                , text "Dashboard"
                ]

            -- Filter header with clear button
            , div [ class "flex items-center justify-between mb-4" ]
                [ span [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide" ] [ text "Filters" ]
                , if hasActiveFilters model then
                    button
                        [ onClick ClearAllFilters
                        , class "text-xs text-red-600 hover:text-red-700 font-medium"
                        ]
                        [ text "Clear" ]

                  else
                    text ""
                ]

            -- Filter sections
            , div [ class "space-y-1" ]
                [ viewFilterSection model
                    "result"
                    "Result"
                    (model.resultFilter /= AllResults)
                    (viewResultFilter model)
                , viewFilterSection model
                    "timeControl"
                    "Time Control"
                    (model.timeControlFilter /= AllTimeControls)
                    (viewTimeControlFilter model)
                , viewFilterSection model
                    "color"
                    "Played As"
                    (model.colorFilter /= AllColors)
                    (viewColorFilter model)
                , viewFilterSection model
                    "accuracy"
                    "Accuracy"
                    (model.minAccuracy /= Nothing || model.maxAccuracy /= Nothing)
                    (viewAccuracyFilter model)
                , viewFilterSection model
                    "opponent"
                    "Opponent"
                    (model.opponentRatingFilter /= "all" || model.opponentSearch /= "")
                    (viewOpponentFilter model)
                , viewFilterSection model
                    "tags"
                    "Tags"
                    (not (List.isEmpty model.selectedTags))
                    (viewTagFilters model)
                ]

            -- Sort section (always visible)
            , div [ class "mt-6 pt-4 border-t border-gray-100" ]
                [ div [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2" ] [ text "Sort By" ]
                , select
                    [ class "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
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
        , span
            [ class
                (if isSelected then
                    "text-gray-900 font-medium"

                 else
                    "text-gray-600"
                )
            ]
            [ text label ]
        ]


viewAccuracyFilter : Model -> Html Msg
viewAccuracyFilter model =
    div []
        [ div [ class "flex items-center gap-2" ]
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
                button
                    [ onClick ClearAccuracy
                    , class "text-xs text-gray-400 hover:text-gray-600"
                    ]
                    [ text "Clear" ]

              else
                text ""
            ]
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
                    tagsWithCounts
                        |> List.sortBy (\tc -> -tc.count)
                        |> List.take 20
            in
            div []
                [ if not (List.isEmpty model.selectedTags) then
                    div [ class "flex items-center justify-between mb-2" ]
                        [ span [ class "text-xs text-gray-500" ]
                            [ text (String.fromInt (List.length model.selectedTags) ++ " selected") ]
                        , button
                            [ onClick ClearTags
                            , class "text-xs text-red-600 hover:text-red-700"
                            ]
                            [ text "Clear" ]
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
                    [ div [ class "w-14 h-14 bg-gray-200 rounded-full" ] []
                    , div [ class "space-y-2" ]
                        [ div [ class "w-40 h-6 bg-gray-200 rounded" ] []
                        , div [ class "w-28 h-4 bg-gray-200 rounded" ] []
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
                            div [ class "w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl text-gray-600 font-semibold" ]
                                [ text (String.left 1 student.displayName |> String.toUpper) ]
                    , div []
                        [ h1 [ class "text-xl font-bold text-gray-900" ]
                            [ text student.displayName ]
                        , case student.chessComUsername of
                            Just username ->
                                a
                                    [ href ("https://www.chess.com/member/" ++ username)
                                    , target "_blank"
                                    , class "text-sm text-gray-500 hover:text-gray-700"
                                    ]
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
            div [ class "mb-6 bg-white rounded-xl border border-gray-200 p-5" ]
                [ div [ class "grid grid-cols-2 lg:grid-cols-4 gap-6" ]
                    [ -- Games stat
                      div [ class "text-center" ]
                        [ div [ class "text-3xl font-bold text-gray-900" ]
                            [ text (String.fromInt gamesData.total) ]
                        , div [ class "text-sm text-gray-500 mt-1" ] [ text "Games" ]
                        ]

                    -- Accuracy stat
                    , div [ class "text-center" ]
                        [ case stats.avgAccuracy of
                            Just acc ->
                                let
                                    colors =
                                        accuracyColorClasses acc
                                in
                                div []
                                    [ div [ class ("text-3xl font-bold " ++ colors.text) ]
                                        [ text (String.fromInt (round acc) ++ "%") ]
                                    , div [ class "text-sm text-gray-500 mt-1" ] [ text "Accuracy" ]
                                    ]

                            Nothing ->
                                div []
                                    [ div [ class "text-3xl font-bold text-gray-300" ] [ text "—" ]
                                    , div [ class "text-sm text-gray-500 mt-1" ] [ text "Accuracy" ]
                                    ]
                        ]

                    -- Win Rate stat
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

                    -- Results bar
                    , div [ class "col-span-2 lg:col-span-1" ]
                        [ div [ class "text-sm text-gray-500 mb-2 text-center" ] [ text "Results" ]
                        , div [ class "h-3 rounded-full overflow-hidden bg-gray-100 flex" ]
                            [ if winPercent > 0 then
                                div
                                    [ class "bg-green-500 transition-all"
                                    , style "width" (String.fromFloat winPercent ++ "%")
                                    ]
                                    []

                              else
                                text ""
                            , if drawPercent > 0 then
                                div
                                    [ class "bg-gray-400 transition-all"
                                    , style "width" (String.fromFloat drawPercent ++ "%")
                                    ]
                                    []

                              else
                                text ""
                            , if lossPercent > 0 then
                                div
                                    [ class "bg-red-500 transition-all"
                                    , style "width" (String.fromFloat lossPercent ++ "%")
                                    ]
                                    []

                              else
                                text ""
                            ]
                        , div [ class "flex justify-between text-xs mt-2" ]
                            [ span [ class "text-green-600 font-medium" ] [ text (String.fromInt stats.wins ++ "W") ]
                            , span [ class "text-gray-500" ] [ text (String.fromInt stats.draws ++ "D") ]
                            , span [ class "text-red-600 font-medium" ] [ text (String.fromInt stats.losses ++ "L") ]
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
                        [ div [ class "flex items-center gap-3" ]
                            [ div [ class "w-3 h-3 bg-gray-200 rounded-full" ] []
                            , div [ class "w-12 h-4 bg-gray-200 rounded" ] []
                            , div [ class "w-32 h-4 bg-gray-200 rounded" ] []
                            , div [ class "flex-1" ] []
                            , div [ class "w-16 h-4 bg-gray-200 rounded" ] []
                            ]
                        ]
                    )
                )

        Failure error ->
            div [ class "bg-red-50 border border-red-200 rounded-xl p-4 text-red-600" ]
                [ text error ]

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
                            [ div [ class "text-gray-400 mb-2" ] [ text "No games found" ]
                            , if hasActiveFilters model then
                                button
                                    [ onClick ClearAllFilters
                                    , class "text-sm text-gray-600 hover:text-gray-900 underline"
                                    ]
                                    [ text "Clear filters" ]

                              else
                                text ""
                            ]

                    else
                        div []
                            [ -- Games count
                              div [ class "mb-4 text-sm text-gray-500" ]
                                [ text ("Showing " ++ String.fromInt (List.length filteredGames) ++ " of " ++ String.fromInt gamesData.total ++ " games") ]

                            -- Game cards grouped by date
                            , div [ class "space-y-6" ]
                                (List.map (viewDateGroup model student) groupedGames)

                            -- Pagination
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
        [ -- Date header
          div [ class "flex items-center gap-3 mb-3" ]
            [ div [ class "h-px flex-1 bg-gray-200" ] []
            , span [ class "text-xs font-medium text-gray-400 uppercase tracking-wide" ]
                [ text dateStr
                , span [ class "ml-2 text-gray-300" ] [ text ("· " ++ String.fromInt (List.length games) ++ " games") ]
                ]
            , div [ class "h-px flex-1 bg-gray-200" ] []
            ]

        -- Game cards
        , div [ class "space-y-3" ]
            (List.map (viewGameCard model student) games)
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
            ("bg-white rounded-xl border transition-all duration-200 "
                ++ (if isExpanded then
                        "border-gray-300 shadow-sm"

                    else
                        "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                   )
            )
        ]
        [ -- Main card content (always visible)
          div [ class "p-4" ]
            [ div [ class "flex items-start gap-3" ]
                [ -- Result dot
                  span
                    [ class ("w-3 h-3 rounded-full mt-1.5 flex-shrink-0 " ++ result.dotColor)
                    , title result.label
                    ]
                    []

                -- Main info
                , div [ class "flex-1 min-w-0" ]
                    [ -- Top row: Result, opponent, rating change
                      div [ class "flex items-center gap-2 flex-wrap" ]
                        [ span [ class ("font-semibold text-sm " ++ result.textColor) ] [ text result.label ]
                        , span [ class "text-gray-700 font-medium" ] [ text ("vs " ++ opponent) ]
                        , case opponentRating of
                            Just rating ->
                                span [ class "text-gray-500 text-sm" ] [ text (String.fromInt rating) ]

                            Nothing ->
                                text ""
                        , case ratingDiff of
                            Just diff ->
                                if diff > 0 then
                                    span [ class "text-green-600 text-sm font-medium" ] [ text ("+" ++ String.fromInt diff) ]

                                else if diff < 0 then
                                    span [ class "text-red-600 text-sm font-medium" ] [ text (String.fromInt diff) ]

                                else
                                    text ""

                            Nothing ->
                                text ""
                        ]

                    -- Opening name
                    , case game.openingName of
                        Just opening ->
                            div [ class "text-sm text-gray-600 mt-1 truncate" ]
                                [ text opening ]

                        Nothing ->
                            text ""

                    -- Metadata row
                    , div [ class "flex items-center gap-2 mt-1 text-xs text-gray-400" ]
                        [ span [] [ text (formatRelativeDate game.playedAt) ]
                        , viewAccuracyInline insight
                        ]

                    -- Priority tags (collapsed) or grouped tags (expanded)
                    , if isExpanded then
                        viewExpandedContent insight tags chessComUrl

                      else if not (List.isEmpty priorityTags) then
                        div [ class "flex items-center gap-2 mt-3" ]
                            [ div [ class "flex flex-wrap gap-1" ]
                                (List.map viewTagBadge priorityTags)
                            , if List.length tags > 3 then
                                span [ class "text-xs text-gray-400" ]
                                    [ text ("+" ++ String.fromInt (List.length tags - 3)) ]

                              else
                                text ""
                            ]

                      else
                        text ""
                    ]

                -- Right side: expand toggle
                , button
                    [ onClick (ToggleGameExpanded game.id)
                    , class "text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
                    ]
                    [ text
                        (if isExpanded then
                            "▲"

                         else
                            "▼"
                        )
                    , span [ class "sr-only" ]
                        [ text
                            (if isExpanded then
                                "Collapse"

                             else
                                "Expand"
                            )
                        ]
                    ]
                ]
            ]
        ]


viewAccuracyInline : Maybe GameInsight -> Html Msg
viewAccuracyInline maybeInsight =
    case maybeInsight of
        Just ins ->
            case ins.accuracyOverall of
                Just acc ->
                    let
                        colors =
                            accuracyColorClasses acc
                    in
                    span [ class ("font-medium " ++ colors.text) ]
                        [ text ("· " ++ String.fromInt (round acc) ++ "% accuracy") ]

                Nothing ->
                    text ""

        Nothing ->
            text ""


viewExpandedContent : Maybe GameInsight -> List GameTag -> String -> Html Msg
viewExpandedContent maybeInsight tags chessComUrl =
    div [ class "mt-4 pt-4 border-t border-gray-100 space-y-4" ]
        [ -- Performance section
          case maybeInsight of
            Just ins ->
                div []
                    [ div [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2" ]
                        [ text "Performance" ]
                    , viewAccuracyBar ins
                    , viewErrorSummary ins
                    ]

            Nothing ->
                text ""

        -- Tags grouped by category
        , if not (List.isEmpty tags) then
            let
                grouped =
                    groupTagsByCategory tags
            in
            div [ class "space-y-3" ]
                (List.map viewTagGroup grouped)

          else
            text ""

        -- Analysis link
        , a
            [ href chessComUrl
            , target "_blank"
            , class "inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium"
            ]
            [ text "View Full Analysis"
            , span [] [ text "→" ]
            ]
        ]


viewAccuracyBar : GameInsight -> Html Msg
viewAccuracyBar ins =
    case ins.accuracyOverall of
        Just acc ->
            let
                colors =
                    accuracyColorClasses acc
            in
            div [ class "mb-3" ]
                [ div [ class "flex items-center gap-3" ]
                    [ div [ class "flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" ]
                        [ div
                            [ class ("h-full rounded-full " ++ colors.bar)
                            , style "width" (String.fromFloat acc ++ "%")
                            ]
                            []
                        ]
                    , span [ class ("text-sm font-semibold " ++ colors.text) ]
                        [ text (String.fromInt (round acc) ++ "%") ]
                    ]

                -- Phase breakdown
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
        div [ class "text-sm text-green-600 font-medium" ] [ text "Clean game - no major errors" ]

    else
        div [ class "flex items-center gap-3 text-sm" ]
            (List.map
                (\( count, label, color ) ->
                    span [ class "flex items-center gap-1.5" ]
                        [ span [ class ("w-2 h-2 rounded-full " ++ color) ] []
                        , span [ class "text-gray-600" ]
                            [ text (String.fromInt count ++ " " ++ label ++ pluralize count) ]
                        ]
                )
                items
            )


viewTagGroup : ( String, List GameTag ) -> Html Msg
viewTagGroup ( category, tags ) =
    div []
        [ div [ class "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5" ]
            [ text (formatCategoryName category) ]
        , div [ class "flex flex-wrap gap-1" ]
            (List.map viewTagBadge tags)
        ]


viewTagBadge : GameTag -> Html Msg
viewTagBadge gameTag =
    let
        classes =
            if isAchievementTag gameTag.tag then
                getAchievementClasses

            else
                getTagSentimentClasses gameTag.tag
    in
    span [ class ("px-2 py-0.5 text-xs rounded-full font-medium " ++ classes) ]
        [ text gameTag.tag.name ]


viewPagination : Int -> Int -> Html Msg
viewPagination currentPage totalPages =
    let
        maxVisible =
            7

        pages =
            if totalPages <= maxVisible then
                List.range 0 (totalPages - 1)

            else if currentPage < 3 then
                List.range 0 (maxVisible - 1)

            else if currentPage > totalPages - 4 then
                List.range (totalPages - maxVisible) (totalPages - 1)

            else
                List.range (currentPage - 3) (currentPage + 3)
    in
    div [ class "mt-6 flex items-center justify-center gap-1" ]
        ([ if currentPage > 0 then
            button
                [ onClick (GoToPage (currentPage - 1))
                , class "px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                ]
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
                                "px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg font-medium"

                             else
                                "px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                            )
                        ]
                        [ text (String.fromInt (page + 1)) ]
                )
                pages
            ++ [ if currentPage < totalPages - 1 then
                    button
                        [ onClick (GoToPage (currentPage + 1))
                        , class "px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        ]
                        [ text "Next →" ]

                 else
                    text ""
               ]
        )


type alias ResultInfo =
    { label : String
    , textColor : String
    , dotColor : String
    }


getResultInfo : Bool -> String -> ResultInfo
getResultInfo isStudentWhite result =
    case result of
        "1-0" ->
            if isStudentWhite then
                { label = "Win", textColor = "text-green-600", dotColor = "bg-green-500" }

            else
                { label = "Loss", textColor = "text-red-600", dotColor = "bg-red-500" }

        "0-1" ->
            if isStudentWhite then
                { label = "Loss", textColor = "text-red-600", dotColor = "bg-red-500" }

            else
                { label = "Win", textColor = "text-green-600", dotColor = "bg-green-500" }

        "1/2-1/2" ->
            { label = "Draw", textColor = "text-gray-600", dotColor = "bg-gray-400" }

        _ ->
            { label = result, textColor = "text-gray-600", dotColor = "bg-gray-400" }


pluralize : Int -> String
pluralize count =
    if count == 1 then
        ""

    else
        "s"


formatCategoryName : String -> String
formatCategoryName cat =
    cat
        |> String.replace "_" " "
        |> capitalizeFirst


formatRelativeDate : String -> String
formatRelativeDate dateStr =
    -- Simple date formatting - just show the date part
    String.left 10 dateStr



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
