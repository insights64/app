module Pages.GameDetail exposing (Model, Msg, init, update, view)

import Api.Games exposing (GameDetail)
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Route
import Types exposing (Game, MoveAnalysis, RemoteData(..))


type alias Model =
    { gameId : String
    , gameDetail : RemoteData String GameDetail
    }


init : String -> String -> String -> ( Model, Cmd Msg )
init apiUrl token gameId =
    ( { gameId = gameId
      , gameDetail = Loading
      }
    , Api.Games.getGame
        { apiUrl = apiUrl
        , token = token
        , gameId = gameId
        , onResponse = GotGameDetail
        }
    )


type Msg
    = GotGameDetail (Result Http.Error GameDetail)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotGameDetail result ->
            case result of
                Ok detail ->
                    ( { model | gameDetail = Success detail }, Cmd.none )

                Err error ->
                    ( { model | gameDetail = Failure (httpErrorToString error) }, Cmd.none )


httpErrorToString : Http.Error -> String
httpErrorToString error =
    case error of
        Http.BadUrl _ ->
            "Invalid URL"

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus status ->
            if status == 404 then
                "Game not found"

            else
                "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error: " ++ message


view : Model -> Html Msg
view model =
    div []
        [ -- Back link
          a
            [ Route.href Route.Dashboard
            , class "inline-flex items-center gap-1 text-anthro-gray hover:text-anthro-dark mb-6"
            ]
            [ span [] [ text "←" ]
            , text "Back"
            ]
        , case model.gameDetail of
            NotAsked ->
                text ""

            Loading ->
                div [ class "text-center py-12 text-gray-500" ]
                    [ text "Loading game analysis..." ]

            Failure error ->
                div [ class "bg-red-50 border border-red-200 rounded-lg p-6 text-red-700" ]
                    [ text error ]

            Success detail ->
                viewGameDetail detail
        ]


viewGameDetail : GameDetail -> Html Msg
viewGameDetail detail =
    div []
        [ -- Game header
          viewGameHeader detail.game

        -- Move summary
        , viewMoveSummary detail.moves

        -- Move list
        , div [ class "mt-6" ]
            [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Move Analysis" ]
            , if List.isEmpty detail.moves then
                div [ class "bg-white rounded-lg shadow-card p-6 text-center text-gray-500" ]
                    [ text "Move analysis not available yet." ]

              else
                div [ class "bg-white rounded-lg shadow-card divide-y divide-gray-100" ]
                    (List.map viewMoveRow detail.moves)
            ]
        ]


viewGameHeader : Game -> Html Msg
viewGameHeader game =
    div [ class "bg-white rounded-lg shadow-card p-6 mb-6" ]
        [ div [ class "flex items-center gap-3 mb-4" ]
            [ span [ class "text-2xl text-gray-600" ]
                [ text
                    (if game.platform == "chess_com" then
                        "♞"

                     else
                        "♘"
                    )
                ]
            , div []
                [ h1 [ class "text-xl font-bold text-gray-900" ]
                    [ text (game.whiteUsername ++ " vs " ++ game.blackUsername) ]
                , div [ class "text-sm text-gray-500" ]
                    [ text (formatDate game.playedAt) ]
                ]
            ]
        , div [ class "flex items-center gap-4 text-sm" ]
            [ div
                [ class
                    ("px-3 py-1 rounded font-medium bg-anthro-gray-light text-anthro-gray border-l-2 "
                        ++ (case game.result of
                                "1-0" ->
                                    "border-anthro-green"

                                "0-1" ->
                                    "border-red-500"

                                _ ->
                                    "border-anthro-gray-mid"
                           )
                    )
                ]
                [ text (resultToText game.result) ]
            , if game.analyzed then
                span [ class "text-green-600" ] [ text "✓ Analyzed" ]

              else
                span [ class "text-gray-400" ] [ text "Pending analysis" ]
            ]
        ]


viewMoveSummary : List MoveAnalysis -> Html Msg
viewMoveSummary moves =
    let
        blunders =
            List.length (List.filter (\m -> m.classification == Just "blunder") moves)

        mistakes =
            List.length (List.filter (\m -> m.classification == Just "mistake") moves)

        inaccuracies =
            List.length (List.filter (\m -> m.classification == Just "inaccuracy") moves)
    in
    div [ class "bg-white rounded-lg shadow-card p-6" ]
        [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Summary" ]
        , div [ class "grid grid-cols-3 gap-4" ]
            [ div [ class "text-center" ]
                [ div [ class "text-2xl font-bold text-red-600" ] [ text (String.fromInt blunders) ]
                , div [ class "text-sm text-gray-500" ] [ text "Blunders" ]
                ]
            , div [ class "text-center" ]
                [ div [ class "text-2xl font-bold text-yellow-600" ] [ text (String.fromInt mistakes) ]
                , div [ class "text-sm text-gray-500" ] [ text "Mistakes" ]
                ]
            , div [ class "text-center" ]
                [ div [ class "text-2xl font-bold text-orange-500" ] [ text (String.fromInt inaccuracies) ]
                , div [ class "text-sm text-gray-500" ] [ text "Inaccuracies" ]
                ]
            ]
        ]


viewMoveRow : MoveAnalysis -> Html Msg
viewMoveRow move =
    let
        ( bgClass, textClass, icon ) =
            case move.classification of
                Just "blunder" ->
                    ( "bg-red-50", "text-red-700", "??" )

                Just "mistake" ->
                    ( "bg-yellow-50", "text-yellow-700", "?" )

                Just "inaccuracy" ->
                    ( "bg-orange-50", "text-orange-700", "?!" )

                Just "good" ->
                    ( "", "text-gray-700", "" )

                Just "excellent" ->
                    ( "bg-green-50", "text-green-700", "!" )

                _ ->
                    ( "", "text-gray-700", "" )

        phaseLabel =
            case move.phase of
                "opening" ->
                    "Opening"

                "middlegame" ->
                    "Middlegame"

                "endgame" ->
                    "Endgame"

                other ->
                    other
    in
    div [ class ("p-4 " ++ bgClass) ]
        [ div [ class "flex items-center justify-between" ]
            [ div [ class "flex items-center gap-3" ]
                [ span [ class "text-gray-500 font-mono w-8" ]
                    [ text (String.fromInt move.moveNumber ++ ".") ]
                , span [ class "font-mono" ]
                    [ text
                        (if move.color == "white" then
                            move.movePlayed

                         else
                            "..." ++ move.movePlayed
                        )
                    ]
                , if icon /= "" then
                    span [ class ("font-bold " ++ textClass) ] [ text icon ]

                  else
                    text ""
                ]
            , div [ class "flex items-center gap-4 text-sm" ]
                [ span [ class "text-gray-500" ] [ text phaseLabel ]
                , case move.classification of
                    Just class_ ->
                        span [ class textClass ] [ text (classificationLabel class_) ]

                    Nothing ->
                        text ""
                , case move.evalDiff of
                    Just diff ->
                        if diff > 0 then
                            span [ class "text-gray-500" ] [ text ("-" ++ String.fromInt diff ++ " cp") ]

                        else
                            text ""

                    Nothing ->
                        text ""
                ]
            ]
        , case ( move.classification, move.bestMove ) of
            ( Just c, Just best ) ->
                if c == "blunder" || c == "mistake" || c == "inaccuracy" then
                    div [ class "mt-2 text-sm text-gray-500 pl-11" ]
                        [ text ("Best was " ++ best) ]

                else
                    text ""

            _ ->
                text ""
        ]


resultToText : String -> String
resultToText result =
    case result of
        "1-0" ->
            "White wins"

        "0-1" ->
            "Black wins"

        "1/2-1/2" ->
            "Draw"

        _ ->
            result


classificationLabel : String -> String
classificationLabel class_ =
    case class_ of
        "blunder" ->
            "Blunder"

        "mistake" ->
            "Mistake"

        "inaccuracy" ->
            "Inaccuracy"

        "good" ->
            "Good"

        "excellent" ->
            "Excellent"

        other ->
            other


formatDate : String -> String
formatDate dateStr =
    String.left 10 dateStr
