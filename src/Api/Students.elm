module Api.Students exposing (createStudent, deleteStudent, getStudent, getStudentGames, getStudentRatings, getStudentWeaknesses, getStudents)

import Api
import Http
import Json.Encode as Encode
import Types exposing (Game, RatingHistory, Student, WeaknessSummary, gamesDecoder, ratingsDecoder, studentDecoder, studentsDecoder, weaknessesDecoder)


getStudents :
    { apiUrl : String
    , token : String
    , onResponse : Result Http.Error (List Student) -> msg
    }
    -> Cmd msg
getStudents config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "students" ]
        , token = Just config.token
        , decoder = studentsDecoder
        , onResponse = config.onResponse
        }


getStudent :
    { apiUrl : String
    , token : String
    , studentId : String
    , onResponse : Result Http.Error Student -> msg
    }
    -> Cmd msg
getStudent config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId ]
        , token = Just config.token
        , decoder = studentDecoder
        , onResponse = config.onResponse
        }


createStudent :
    { apiUrl : String
    , token : String
    , chessComUsername : Maybe String
    , lichessUsername : Maybe String
    , onResponse : Result Http.Error Student -> msg
    }
    -> Cmd msg
createStudent config =
    Api.post
        { endpoint = Api.url config.apiUrl [ "api", "students" ]
        , token = Just config.token
        , body =
            Encode.object
                [ ( "chess_com_username"
                  , case config.chessComUsername of
                        Just username ->
                            Encode.string username

                        Nothing ->
                            Encode.null
                  )
                , ( "lichess_username"
                  , case config.lichessUsername of
                        Just username ->
                            Encode.string username

                        Nothing ->
                            Encode.null
                  )
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


getStudentWeaknesses :
    { apiUrl : String
    , token : String
    , studentId : String
    , onResponse : Result Http.Error (List WeaknessSummary) -> msg
    }
    -> Cmd msg
getStudentWeaknesses config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId, "weaknesses" ]
        , token = Just config.token
        , decoder = weaknessesDecoder
        , onResponse = config.onResponse
        }


getStudentGames :
    { apiUrl : String
    , token : String
    , studentId : String
    , onResponse : Result Http.Error (List Game) -> msg
    }
    -> Cmd msg
getStudentGames config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId, "games" ]
        , token = Just config.token
        , decoder = gamesDecoder
        , onResponse = config.onResponse
        }


getStudentRatings :
    { apiUrl : String
    , token : String
    , studentId : String
    , onResponse : Result Http.Error (List RatingHistory) -> msg
    }
    -> Cmd msg
getStudentRatings config =
    Api.get
        { endpoint = Api.url config.apiUrl [ "api", "students", config.studentId, "ratings" ]
        , token = Just config.token
        , decoder = ratingsDecoder
        , onResponse = config.onResponse
        }
