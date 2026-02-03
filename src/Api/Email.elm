module Api.Email exposing
    ( forgotPassword
    , resetPassword
    , verifyEmail
    , resendVerification
    , getPreferences
    , updatePreferences
    , EmailPreferences
    , emailPreferencesDecoder
    )

import Api
import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type alias MessageResponse =
    { message : String }


messageResponseDecoder : Decoder MessageResponse
messageResponseDecoder =
    Decode.map MessageResponse
        (Decode.field "message" Decode.string)


type alias VerifyEmailResponse =
    { message : String
    , verified : Bool
    }


verifyEmailResponseDecoder : Decoder VerifyEmailResponse
verifyEmailResponseDecoder =
    Decode.map2 VerifyEmailResponse
        (Decode.field "message" Decode.string)
        (Decode.field "verified" Decode.bool)


type alias EmailPreferences =
    { analysisCompleteNotifications : Bool
    , weeklySummary : Bool
    , marketingEmails : Bool
    }


emailPreferencesDecoder : Decoder EmailPreferences
emailPreferencesDecoder =
    Decode.map3 EmailPreferences
        (Decode.field "analysis_complete_notifications" Decode.bool)
        (Decode.field "weekly_summary" Decode.bool)
        (Decode.field "marketing_emails" Decode.bool)


forgotPassword :
    { apiUrl : String
    , email : String
    , onResponse : Result Http.Error MessageResponse -> msg
    }
    -> Cmd msg
forgotPassword config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "auth", "forgot-password" ]
        , token = Nothing
        , body =
            Encode.object
                [ ( "email", Encode.string config.email )
                ]
        , decoder = messageResponseDecoder
        , onResponse = config.onResponse
        }


resetPassword :
    { apiUrl : String
    , token : String
    , password : String
    , onResponse : Result Http.Error MessageResponse -> msg
    }
    -> Cmd msg
resetPassword config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "auth", "reset-password" ]
        , token = Nothing
        , body =
            Encode.object
                [ ( "token", Encode.string config.token )
                , ( "password", Encode.string config.password )
                ]
        , decoder = messageResponseDecoder
        , onResponse = config.onResponse
        }


verifyEmail :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error VerifyEmailResponse -> msg
    }
    -> Cmd msg
verifyEmail config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "auth", "verify-email", config.token ]
        , token = Nothing
        , decoder = verifyEmailResponseDecoder
        , onResponse = config.onResponse
        }


resendVerification :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error MessageResponse -> msg
    }
    -> Cmd msg
resendVerification config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "auth", "resend-verification" ]
        , token = Just config.token
        , body = Encode.null
        , decoder = messageResponseDecoder
        , onResponse = config.onResponse
        }


getPreferences :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error EmailPreferences -> msg
    }
    -> Cmd msg
getPreferences config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "email-preferences" ]
        , token = Just config.token
        , decoder = emailPreferencesDecoder
        , onResponse = config.onResponse
        }


updatePreferences :
    { apiUrl : String
    , token : String
    , preferences : EmailPreferences
    , onResponse : Result Http.Error EmailPreferences -> msg
    }
    -> Cmd msg
updatePreferences config =
    Api.put
        { endpoint = Api.url config.apiUrl [ "api", "email-preferences" ]
        , token = Just config.token
        , body =
            Encode.object
                [ ( "analysis_complete_notifications", Encode.bool config.preferences.analysisCompleteNotifications )
                , ( "weekly_summary", Encode.bool config.preferences.weeklySummary )
                , ( "marketing_emails", Encode.bool config.preferences.marketingEmails )
                ]
        , decoder = emailPreferencesDecoder
        , onResponse = config.onResponse
        }
