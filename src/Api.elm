module Api exposing
    ( Endpoint
    , apiUrl
    , delete
    , get
    , post
    , url
    )

import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Endpoint
    = Endpoint String


apiUrl : String
apiUrl =
    "http://localhost:8080"


url : List String -> Endpoint
url paths =
    Endpoint (apiUrl ++ "/" ++ String.join "/" paths)


unwrap : Endpoint -> String
unwrap (Endpoint str) =
    str



-- HTTP HELPERS


get :
    { endpoint : Endpoint
    , token : Maybe String
    , decoder : Decoder a
    , onResponse : Result Http.Error a -> msg
    }
    -> Cmd msg
get config =
    Http.request
        { method = "GET"
        , headers = authHeader config.token
        , url = unwrap config.endpoint
        , body = Http.emptyBody
        , expect = Http.expectJson config.onResponse config.decoder
        , timeout = Nothing
        , tracker = Nothing
        }


post :
    { endpoint : Endpoint
    , token : Maybe String
    , body : Encode.Value
    , decoder : Decoder a
    , onResponse : Result Http.Error a -> msg
    }
    -> Cmd msg
post config =
    Http.request
        { method = "POST"
        , headers = authHeader config.token
        , url = unwrap config.endpoint
        , body = Http.jsonBody config.body
        , expect = Http.expectJson config.onResponse config.decoder
        , timeout = Nothing
        , tracker = Nothing
        }


delete :
    { endpoint : Endpoint
    , token : String
    , onResponse : Result Http.Error () -> msg
    }
    -> Cmd msg
delete config =
    Http.request
        { method = "DELETE"
        , headers = authHeader (Just config.token)
        , url = unwrap config.endpoint
        , body = Http.emptyBody
        , expect = Http.expectWhatever config.onResponse
        , timeout = Nothing
        , tracker = Nothing
        }


authHeader : Maybe String -> List Http.Header
authHeader maybeToken =
    case maybeToken of
        Just token ->
            [ Http.header "Authorization" ("Bearer " ++ token) ]

        Nothing ->
            []
