module Api.Games exposing (GameDetail, getGame)

import Api
import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as Pipeline
import Types exposing (Game, MoveAnalysis, gameDecoder, moveAnalysisDecoder)


type alias GameDetail =
    { game : Game
    , pgn : Maybe String
    , moves : List MoveAnalysis
    }


gameDetailDecoder : Decoder GameDetail
gameDetailDecoder =
    Decode.succeed GameDetail
        |> Pipeline.required "game" gameDecoder
        |> Pipeline.optional "pgn" (Decode.nullable Decode.string) Nothing
        |> Pipeline.required "moves" (Decode.list moveAnalysisDecoder)


getGame :
    { token : String
    , gameId : String
    , onResponse : Result Http.Error GameDetail -> msg
    }
    -> Cmd msg
getGame config =
    Api.get
        { endpoint = Api.url [ "api", "games", config.gameId ]
        , token = Just config.token
        , decoder = gameDetailDecoder
        , onResponse = config.onResponse
        }
