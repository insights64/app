module Types exposing
    ( Coach
    , Game
    , MoveAnalysis
    , RatingHistory
    , RemoteData(..)
    , Student
    , WeaknessSummary
    , coachDecoder
    , gameDecoder
    , gamesDecoder
    , moveAnalysisDecoder
    , ratingHistoryDecoder
    , ratingsDecoder
    , studentDecoder
    , studentsDecoder
    , weaknessDecoder
    , weaknessesDecoder
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


type alias Student =
    { id : String
    , coachId : String
    , displayName : String
    , chessComUsername : Maybe String
    , lastImportedAt : Maybe String
    , lastInsightAt : Maybe String
    , avatarUrl : Maybe String
    , createdAt : String
    }


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


studentsDecoder : Decoder (List Student)
studentsDecoder =
    Decode.field "students" (Decode.list studentDecoder)



-- WEAKNESS SUMMARY


type alias WeaknessSummary =
    { id : String
    , studentId : String
    , category : String
    , platform : Maybe String
    , score : Float
    , totalPositions : Int
    , mistakes : Int
    , updatedAt : String
    }


weaknessDecoder : Decoder WeaknessSummary
weaknessDecoder =
    Decode.succeed WeaknessSummary
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "student_id" Decode.string
        |> Pipeline.required "category" Decode.string
        |> Pipeline.optional "platform" (Decode.nullable Decode.string) Nothing
        |> Pipeline.required "score" Decode.float
        |> Pipeline.required "total_positions" Decode.int
        |> Pipeline.required "mistakes" Decode.int
        |> Pipeline.required "updated_at" Decode.string


weaknessesDecoder : Decoder (List WeaknessSummary)
weaknessesDecoder =
    Decode.field "weaknesses" (Decode.list weaknessDecoder)



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
        |> Pipeline.required "created_at" Decode.string


gamesDecoder : Decoder (List Game)
gamesDecoder =
    Decode.field "games" (Decode.list gameDecoder)



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



-- RATING HISTORY


type alias RatingHistory =
    { id : String
    , studentId : String
    , platform : String
    , timeControl : String
    , rating : Int
    , rd : Maybe Int
    , gamesPlayed : Maybe Int
    , win : Maybe Int
    , loss : Maybe Int
    , draw : Maybe Int
    , recordedAt : String
    }


ratingHistoryDecoder : Decoder RatingHistory
ratingHistoryDecoder =
    Decode.succeed RatingHistory
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "student_id" Decode.string
        |> Pipeline.required "platform" Decode.string
        |> Pipeline.required "time_control" Decode.string
        |> Pipeline.required "rating" Decode.int
        |> Pipeline.optional "rd" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "games_played" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "win" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "loss" (Decode.nullable Decode.int) Nothing
        |> Pipeline.optional "draw" (Decode.nullable Decode.int) Nothing
        |> Pipeline.required "recorded_at" Decode.string


ratingsDecoder : Decoder (List RatingHistory)
ratingsDecoder =
    Decode.field "ratings" (Decode.list ratingHistoryDecoder)
