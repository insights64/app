module View.Layout exposing (layout)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Route
import Types exposing (CoachWithSubscription, SubscriptionStatus(..), UserInfo)


type alias Config msg =
    { coach : CoachWithSubscription
    , onLogout : msg
    , content : Html msg
    }


layout : Config msg -> Html msg
layout config =
    div [ class "min-h-screen bg-anthro-light" ]
        [ viewHeader config.coach config.onLogout
        , main_ [ class "max-w-6xl mx-auto px-4 py-8" ]
            [ config.content ]
        ]


viewHeader : CoachWithSubscription -> msg -> Html msg
viewHeader coach onLogout =
    header [ class "bg-anthro-light/95 backdrop-blur-sm border-b border-anthro-gray-light sticky top-0 z-50" ]
        [ div [ class "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" ]
            [ a [ Route.href Route.Dashboard, class "flex items-center gap-3 hover:opacity-80 transition" ]
                [ -- Logo: 2x2 chessboard
                  div [ class "w-8 h-8 rounded grid grid-cols-2 grid-rows-2 overflow-hidden" ]
                    [ span [ class "bg-anthro-orange" ] []
                    , span [ class "bg-anthro-dark" ] []
                    , span [ class "bg-anthro-dark" ] []
                    , span [ class "bg-anthro-orange" ] []
                    ]
                , span [ class "font-semibold text-anthro-dark tracking-tight" ] [ text "Insights64" ]
                ]
            , div [ class "flex items-center gap-4" ]
                [ -- Email with subscription badge - links to subscription page
                  a
                    [ Route.href Route.Subscription
                    , class "flex items-center gap-2 text-sm text-anthro-gray hover:text-anthro-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-anthro-cream"
                    ]
                    [ text coach.email
                    , viewSubscriptionBadge coach.subscription
                    ]
                , button
                    [ onClick onLogout
                    , class "text-sm text-anthro-gray hover:text-anthro-dark transition-colors px-3 py-1.5 rounded-lg hover:bg-anthro-cream"
                    ]
                    [ text "Sign out" ]
                ]
            ]
        ]


viewSubscriptionBadge : Maybe UserInfo -> Html msg
viewSubscriptionBadge maybeUserInfo =
    case maybeUserInfo of
        Just userInfo ->
            let
                planName =
                    userInfo.plan
                        |> Maybe.map .displayName
                        |> Maybe.withDefault "Free"

                ( badgeClass, badgeText ) =
                    case userInfo.subscription.status of
                        Trialing ->
                            ( "bg-blue-100 text-blue-700", "Trial" )

                        Active ->
                            ( "bg-green-100 text-green-700", planName )

                        PastDue ->
                            ( "bg-yellow-100 text-yellow-700", "Payment Due" )

                        Cancelled ->
                            ( "bg-gray-100 text-gray-600", "Cancelled" )

                        Expired ->
                            ( "bg-red-100 text-red-700", "Expired" )
            in
            span [ class ("px-2 py-0.5 text-xs font-medium rounded-full " ++ badgeClass) ]
                [ text badgeText ]

        Nothing ->
            -- No subscription info loaded yet - show nothing
            text ""
