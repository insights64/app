module View.Layout exposing (layout, viewHeader)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Route
import Types exposing (Coach)


type alias Config msg =
    { coach : Coach
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


viewHeader : Coach -> msg -> Html msg
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
                [ span [ class "text-sm text-anthro-gray" ] [ text coach.email ]
                , button
                    [ onClick onLogout
                    , class "text-sm text-anthro-gray hover:text-anthro-dark transition"
                    ]
                    [ text "Sign out" ]
                ]
            ]
        ]
