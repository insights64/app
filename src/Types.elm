module Types exposing
    ( Coach
    , ColorFilter(..)
    , Game
    , GameInsight
    , GameTag
    , GameWithInsights
    , MoveAnalysis
    , RemoteData(..)
    , ResultFilter(..)
    , Student
    , Tag
    , TagWithCount
    , TimeControl(..)
    , coachDecoder
    , colorFilterToString
    , gameDecoder
    , gameInsightDecoder
    , gameTagDecoder
    , gameWithInsightsDecoder
    , gamesDecoder
    , gamesWithInsightsDecoder
    , moveAnalysisDecoder
    , resultFilterToString
    , studentDecoder
    , studentsDecoder
    , tagDecoder
    , tagWithCountDecoder
    , tagsDecoder
    , tagsWithCountsDecoder
    , timeControlToString
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Pipeline


-- REMOTE DATA


type RemoteData e a
    = NotAsked
    | Loading
    | Failure e
    | Success a



-- COACH


type alias Coach =
    { id : String
    , email : String
    }


coachDecoder : Decoder Coach
coachDecoder =
    Decode.succeed Coach
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "email" Decode.string



-- STUDENT


type alias StudentStats =
    { gameCount : Int
    , winCount : Int
    , lossCount : Int
    , drawCount : Int
    , winRate : Maybe Float
    , avgAccuracy : Maybe Float
    }


type alias Student =
    { id : String
    , coachId : String
    , displayName : String
    , chessComUsername : Maybe String
    , lastImportedAt : Maybe String
    , lastInsightAt : Maybe String
    , avatarUrl : Maybe String
    , createdAt : String
    , stats : StudentStats
    }


studentStatsDecoder : Decoder StudentStats
studentStatsDecoder =
    Decode.succeed StudentStats
        |> Pipeline.required "game_count" Decode.int
        |> Pipeline.required "win_count" Decode.int
        |> Pipeline.required "loss_count" Decode.int
        |> Pipeline.required "draw_count" Decode.int
        |> Pipeline.optional "win_rate" (Decode.nullable Decode.float) Nothing
        |> Pipeline.optional "avg_accuracy" (Decode.nullable Decode.float) Nothing


studentDecoder : Decoder Student
studentDecoder =
    Decode.succeed Student
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "coach_id" Decode.string
        |> Pipeline.required "display_name" Decode.string
        |> Pipeline.optional "chess_com_username" (Decode.nullable Decode.string) Nothing
        |> Pipeline.optional "last_imported_at" (Decode.nullable Decode.string) Nothing
        |> Pipeline.optional "last_insight_at" (Decode.nullable Decode.string) Nothing
        |> Pipeline.optional "avatar_url" (Decode.nullable Decode.string) Nothing
        |> Pipeline.required "created_at" Decode.string
        |> Pipeline.required "stats" studentStatsDecoder


studentsDecoder : Decoder (List Student)
studentsDecoder =
    Decode.field "students" (Decode.list studentDecoder)



-- TAG


type alias Tag =
    { id : String
    , slug : String
    , name : String
    , category : String
    , description : Maybe String
    , color : Maybe String
    , priority : Int
    }


tagDecoder : Decoder Tag
tagDecoder =
    Decode.succeed Tag
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "slug" Decode.string
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "category" Decode.string
        |> Pipeline.optional "description" (Decode.nullable Decode.string) Nothing
        |> Pipeline.optional "color" (Decode.nullable Decode.string) Nothing
        |> Pipeline.required "priority" Decode.int


tagsDecoder : Decoder (List Tag)
tagsDecoder =
    Decode.field "tags" (Decode.list tagDecoder)


type alias TagWithCount =
    { tag : Tag
    , count : Int
    }


tagWithCountDecoder : Decoder TagWithCount
tagWithCountDecoder =
    Decode.succeed TagWithCount
        |> Pipeline.required "tag" tagDecoder
        |> Pipeline.required "count" Decode.int


tagsWithCountsDecoder : Decoder (List TagWithCount)
tagsWithCountsDecoder =
    Decode.field "tags" (Decode.list tagWithCountDecoder)



-- GAME


type alias Game =
    { id : String
    , studentId : String
    , platform : String
    , platformGameId : String
    , whiteUsername : String
    , blackUsername : String
    , whiteElo : Maybe Int
    , blackElo : Maybe Int
    , result : String
    , playedAt : String
    , analyzed : Bool
    , openingName : Maybe String
    , createdAt : String
    }


gameDecoder : Decoder Game
gameDecoder =
    Decode.succeed Game
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "student_id" Decode.string
        |> Pipeline.required "platform" Decode.string
        |> Pipeline.required "platform_game_id" Decode.string
        |> Pipeline.required "white_username" Decode.string
        |> Pipeline.required "black_username" Decode.string
        |> Pipeline.optional "white_elo" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "black_elo" (Decode.nullable Decode.int) Nothing
        |> Pipeline.required "result" Decode.string
        |> Pipeline.required "played_at" Decode.string
        |> Pipeline.required "analyzed" Decode.bool
        |> Pipeline.optional "opening_name" (Decode.nullable Decode.string) Nothing
        |> Pipeline.required "created_at" Decode.string


gamesDecoder : Decoder (List Game)
gamesDecoder =
    Decode.field "games" (Decode.list gameDecoder)



-- GAME INSIGHT


type alias GameInsight =
    { id : String
    , gameId : String
    , playerColor : String
    , opponentRating : Maybe Int
    , ratingDiff : Maybe Int
    , accuracyOverall : Maybe Float
    , accuracyOpening : Maybe Float
    , accuracyMiddlegame : Maybe Float
    , accuracyEndgame : Maybe Float
    , inaccuraciesCount : Int
    , mistakesCount : Int
    , blundersCount : Int
    , bestMovesCount : Int
    , excellentMovesCount : Int
    , worstMoveEvalLoss : Maybe Int
    , maxAdvantage : Maybe Int
    , maxDisadvantage : Maybe Int
    , criticalMomentsCount : Int
    , decisiveAdvantageReached : Bool
    , decisiveAdvantageSquandered : Bool
    , phaseDecided : Maybe String
    }


gameInsightDecoder : Decoder GameInsight
gameInsightDecoder =
    Decode.succeed GameInsight
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "game_id" Decode.string
        |> Pipeline.required "player_color" Decode.string
        |> Pipeline.optional "opponent_rating" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "rating_diff" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "accuracy_overall" (Decode.nullable Decode.float) Nothing
        |> Pipeline.optional "accuracy_opening" (Decode.nullable Decode.float) Nothing
        |> Pipeline.optional "accuracy_middlegame" (Decode.nullable Decode.float) Nothing
        |> Pipeline.optional "accuracy_endgame" (Decode.nullable Decode.float) Nothing
        |> Pipeline.required "inaccuracies_count" Decode.int
        |> Pipeline.required "mistakes_count" Decode.int
        |> Pipeline.required "blunders_count" Decode.int
        |> Pipeline.required "best_moves_count" Decode.int
        |> Pipeline.required "excellent_moves_count" Decode.int
        |> Pipeline.optional "worst_move_eval_loss" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "max_advantage" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "max_disadvantage" (Decode.nullable Decode.int) Nothing
        |> Pipeline.required "critical_moments_count" Decode.int
        |> Pipeline.required "decisive_advantage_reached" Decode.bool
        |> Pipeline.required "decisive_advantage_squandered" Decode.bool
        |> Pipeline.optional "phase_decided" (Decode.nullable Decode.string) Nothing



-- GAME TAG


type alias GameTag =
    { id : String
    , gameId : String
    , tag : Tag
    , moveNumbers : List Int
    , primaryMove : Maybe Int
    , confidence : Float
    }


gameTagDecoder : Decoder GameTag
gameTagDecoder =
    Decode.succeed GameTag
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "game_id" Decode.string
        |> Pipeline.required "tag" tagDecoder
        |> Pipeline.optional "move_numbers" (Decode.list Decode.int) []
        |> Pipeline.optional "primary_move" (Decode.nullable Decode.int) Nothing
        |> Pipeline.required "confidence" Decode.float



-- GAME WITH INSIGHTS


type alias GameWithInsights =
    { game : Game
    , insight : Maybe GameInsight
    , tags : List GameTag
    }


gameWithInsightsDecoder : Decoder GameWithInsights
gameWithInsightsDecoder =
    Decode.succeed GameWithInsights
        |> Pipeline.required "game" gameDecoder
        |> Pipeline.optional "insight" (Decode.nullable gameInsightDecoder) Nothing
        |> Pipeline.optional "tags" (Decode.list gameTagDecoder) []


gamesWithInsightsDecoder : Decoder { games : List GameWithInsights, total : Int }
gamesWithInsightsDecoder =
    Decode.succeed (\games total -> { games = games, total = total })
        |> Pipeline.required "games" (Decode.list gameWithInsightsDecoder)
        |> Pipeline.required "total" Decode.int



-- MOVE ANALYSIS


type alias MoveAnalysis =
    { id : String
    , gameId : String
    , moveNumber : Int
    , color : String
    , fenBefore : String
    , movePlayed : String
    , bestMove : Maybe String
    , evalBeforeCp : Maybe Int
    , evalAfterCp : Maybe Int
    , evalDiff : Maybe Int
    , classification : Maybe String
    , phase : String
    }


moveAnalysisDecoder : Decoder MoveAnalysis
moveAnalysisDecoder =
    Decode.succeed MoveAnalysis
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "game_id" Decode.string
        |> Pipeline.required "move_number" Decode.int
        |> Pipeline.required "color" Decode.string
        |> Pipeline.required "fen_before" Decode.string
        |> Pipeline.required "move_played" Decode.string
        |> Pipeline.optional "best_move" (Decode.nullable Decode.string) Nothing
        |> Pipeline.optional "eval_before_cp" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "eval_after_cp" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "eval_diff" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "classification" (Decode.nullable Decode.string) Nothing
        |> Pipeline.required "phase" Decode.string



-- TIME CONTROL FILTER


type TimeControl
    = AllTimeControls
    | Bullet
    | Blitz
    | Rapid


timeControlToString : TimeControl -> String
timeControlToString tc =
    case tc of
        AllTimeControls ->
            "all"

        Bullet ->
            "bullet"

        Blitz ->
            "blitz"

        Rapid ->
            "rapid"



-- RESULT FILTER


type ResultFilter
    = AllResults
    | WinsOnly
    | LossesOnly
    | DrawsOnly


resultFilterToString : ResultFilter -> String
resultFilterToString rf =
    case rf of
        AllResults ->
            "all"

        WinsOnly ->
            "win"

        LossesOnly ->
            "loss"

        DrawsOnly ->
            "draw"



-- COLOR FILTER


type ColorFilter
    = AllColors
    | WhiteOnly
    | BlackOnly


colorFilterToString : ColorFilter -> String
colorFilterToString cf =
    case cf of
        AllColors ->
            "all"

        WhiteOnly ->
            "white"

        BlackOnly ->
            "black"
