module Session exposing
    ( Session(..)
    , Token
    , clearToken
    , getCoach
    , getToken
    , isLoggedIn
    , saveToken
    )

import Types exposing (Coach)


type alias Token =
    String


type Session
    = Guest
    | LoggedIn Token Coach


isLoggedIn : Session -> Bool
isLoggedIn session =
    case session of
        Guest ->
            False

        LoggedIn _ _ ->
            True


getToken : Session -> Maybe Token
getToken session =
    case session of
        Guest ->
            Nothing

        LoggedIn token _ ->
            Just token


getCoach : Session -> Maybe Coach
getCoach session =
    case session of
        Guest ->
            Nothing

        LoggedIn _ coach ->
            Just coach



-- PORTS (defined in Main.elm, referenced here for convenience)


port saveToken : String -> Cmd msg


port clearToken : () -> Cmd msg
