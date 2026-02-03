module Api.Subscription exposing
    ( createBillingPortalSession
    , getPlans
    , getUserInfo
    )

import Api
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Types
    exposing
        ( SubscriptionPlan
        , UserInfo
        , subscriptionPlansDecoder
        , userInfoDecoder
        )


getPlans :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error (List SubscriptionPlan) -> msg
    }
    -> Cmd msg
getPlans config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "subscription", "plans" ]
        , token = Just config.token
        , decoder = subscriptionPlansDecoder
        , onResponse = config.onResponse
        }


createBillingPortalSession :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error String -> msg
    }
    -> Cmd msg
createBillingPortalSession config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "subscription", "portal" ]
        , token = Just config.token
        , body = Encode.object []
        , decoder = Decode.field "portal_url" Decode.string
        , onResponse = config.onResponse
        }


getUserInfo :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error UserInfo -> msg
    }
    -> Cmd msg
getUserInfo config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "user-info" ]
        , token = Just config.token
        , decoder = userInfoDecoder
        , onResponse = config.onResponse
        }
