module Api.Students exposing
    ( archiveStudent
    , createStudent
    , deleteStudent
    , getStudent
    , getStudentGames
    , getStudentTags
    , getStudents
    , lookupChessComPlayer
    )

import Api
import Http
import Json.Encode as Encode
import Types
    exposing
        ( ChessComPlayer
        , GameWithInsights
        , Student
        , TagWithCount
        , chessComPlayerDecoder
        , gamesWithInsightsDecoder
        , studentDecoder
        , studentsDecoder
        , tagsWithCountsDecoder
        )


getStudents :
    { apiUrl : String
    , token : String
    , period : String
    , onResponse : Result Http.Error (List Student) -> msg
    }
    -> Cmd msg
getStudents config =
    let
        queryParams =
            if String.isEmpty config.period then
                []

            else
                [ ( "period", config.period ) ]
    in
    Api.getWithQuery
        { endpoint = Api.url config.apiUrl [ "api", "students" ]
        , token = Just config.token
        , queryParams = queryParams
        , decoder = studentsDecoder
        , onResponse = config.onResponse
        }


getStudent :
    { apiUrl : String
    , token : String
    , studentId : String
    , period : String
    , onResponse : Result Http.Error Student -> msg
    }
    -> Cmd msg
getStudent config =
    let
        queryParams =
            if String.isEmpty config.period then
                []

            else
                [ ( "period", config.period ) ]
    in
    Api.getWithQuery
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId ]
        , token = Just config.token
        , queryParams = queryParams
        , decoder = studentDecoder
        , onResponse = config.onResponse
        }


createStudent :
    { apiUrl : String
    , token : String
    , chessComUsername : String
    , onResponse : Result Http.Error Student -> msg
    }
    -> Cmd msg
createStudent config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "students" ]
        , token = Just config.token
        , body =
            Encode.object
                [ ( "chess_com_username", Encode.string config.chessComUsername )
                ]
        , decoder = studentDecoder
        , onResponse = config.onResponse
        }


deleteStudent :
    { apiUrl : String
    , token : String
    , studentId : String
    , onResponse : Result Http.Error () -> msg
    }
    -> Cmd msg
deleteStudent config =
    Api.delete
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId ]
        , token = config.token
        , onResponse = config.onResponse
        }


{-| Get student's games with insights and tags.
Unified endpoint supporting all filters and pagination.
-}
getStudentGames :
    { apiUrl : String
    , token : String
    , studentId : String
    , timeControl : String
    , result : String
    , color : String
    , tags : Maybe String -- comma-separated tag slugs
    , minAccuracy : Maybe Int
    , maxAccuracy : Maybe Int
    , maxBlunders : Maybe Int
    , minRatingDiff : Maybe Int
    , maxRatingDiff : Maybe Int
    , period : String
    , limit : Int
    , offset : Int
    , onResponse : Result Http.Error { games : List GameWithInsights, total : Int } -> msg
    }
    -> Cmd msg
getStudentGames config =
    let
        baseParams =
            [ ( "time_control", config.timeControl )
            , ( "result", config.result )
            , ( "color", config.color )
            , ( "limit", String.fromInt config.limit )
            , ( "offset", String.fromInt config.offset )
            ]

        periodParams =
            if String.isEmpty config.period then
                []

            else
                [ ( "period", config.period ) ]

        tagParams =
            case config.tags of
                Just t ->
                    [ ( "tags", t ) ]

                Nothing ->
                    []

        minAccuracyParams =
            case config.minAccuracy of
                Just acc ->
                    [ ( "min_accuracy", String.fromInt acc ) ]

                Nothing ->
                    []

        maxAccuracyParams =
            case config.maxAccuracy of
                Just acc ->
                    [ ( "max_accuracy", String.fromInt acc ) ]

                Nothing ->
                    []

        maxBlundersParams =
            case config.maxBlunders of
                Just b ->
                    [ ( "max_blunders", String.fromInt b ) ]

                Nothing ->
                    []

        minRatingDiffParams =
            case config.minRatingDiff of
                Just rd ->
                    [ ( "min_rating_diff", String.fromInt rd ) ]

                Nothing ->
                    []

        maxRatingDiffParams =
            case config.maxRatingDiff of
                Just rd ->
                    [ ( "max_rating_diff", String.fromInt rd ) ]

                Nothing ->
                    []

        allParams =
            baseParams ++ periodParams ++ tagParams ++ minAccuracyParams ++ maxAccuracyParams ++ maxBlundersParams ++ minRatingDiffParams ++ maxRatingDiffParams
    in
    Api.getWithQuery
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId, "games", "insights" ]
        , token = Just config.token
        , queryParams = allParams
        , decoder = gamesWithInsightsDecoder
        , onResponse = config.onResponse
        }


{-| Get tag counts for a student (for filter UI)
-}
getStudentTags :
    { apiUrl : String
    , token : String
    , studentId : String
    , period : String
    , onResponse : Result Http.Error (List TagWithCount) -> msg
    }
    -> Cmd msg
getStudentTags config =
    let
        queryParams =
            if String.isEmpty config.period then
                []

            else
                [ ( "period", config.period ) ]
    in
    Api.getWithQuery
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId, "tags" ]
        , token = Just config.token
        , queryParams = queryParams
        , decoder = tagsWithCountsDecoder
        , onResponse = config.onResponse
        }


{-| Archive or unarchive a student
-}
archiveStudent :
    { apiUrl : String
    , token : String
    , studentId : String
    , archived : Bool
    , onResponse : Result Http.Error Student -> msg
    }
    -> Cmd msg
archiveStudent config =
    Api.patch
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId, "archive" ]
        , token = config.token
        , body =
            Encode.object
                [ ( "archived", Encode.bool config.archived )
                ]
        , decoder = studentDecoder
        , onResponse = config.onResponse
        }


{-| Look up a Chess.com player profile by username
-}
lookupChessComPlayer :
    { apiUrl : String
    , token : String
    , username : String
    , onResponse : Result Http.Error ChessComPlayer -> msg
    }
    -> Cmd msg
lookupChessComPlayer config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "chess-com", "player", config.username ]
        , token = Just config.token
        , decoder = chessComPlayerDecoder
        , onResponse = config.onResponse
        }
