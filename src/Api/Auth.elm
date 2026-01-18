module Api.Auth exposing (login, register)

import Api
import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Types exposing (Coach, coachDecoder)


type alias AuthResponse =
    { token : String
    , coach : Coach
    }


authResponseDecoder : Decoder AuthResponse
authResponseDecoder =
    Decode.map2 AuthResponse
        (Decode.field "token" Decode.string)
        (Decode.field "coach" coachDecoder)


login :
    { apiUrl : String
    , email : String
    , password : String
    , onResponse : Result Http.Error AuthResponse -> msg
    }
    -> Cmd msg
login config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "auth", "login" ]
        , token = Nothing
        , body =
            Encode.object
                [ ( "email", Encode.string config.email )
                , ( "password", Encode.string config.password )
                ]
        , decoder = authResponseDecoder
        , onResponse = config.onResponse
        }


register :
    { apiUrl : String
    , email : String
    , password : String
    , onResponse : Result Http.Error AuthResponse -> msg
    }
    -> Cmd msg
register config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "auth", "register" ]
        , token = Nothing
        , body =
            Encode.object
                [ ( "email", Encode.string config.email )
                , ( "password", Encode.string config.password )
                ]
        , decoder = authResponseDecoder
        , onResponse = config.onResponse
        }
