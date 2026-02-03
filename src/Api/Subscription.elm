module Api.Subscription exposing
    ( createBillingPortalSession
    , getMySubscription
    , getPlans
    )

import Api
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Types
    exposing
        ( SubscriptionPlan
        , SubscriptionWithPlan
        , subscriptionPlansDecoder
        , subscriptionWithPlanDecoder
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


getMySubscription :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error SubscriptionWithPlan -> msg
    }
    -> Cmd msg
getMySubscription config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "subscription" ]
        , token = Just config.token
        , decoder = subscriptionWithPlanDecoder
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
