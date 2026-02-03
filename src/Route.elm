module Route exposing (Route(..), fromUrl, href, pushUrl, replaceUrl)

import Browser.Navigation as Nav
import Html exposing (Attribute)
import Html.Attributes as Attr
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, string)


type Route
    = Login
    | Register
    | Dashboard
    | StudentDetail String
    | GameDetail String
    | Subscription
    | NotFound


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Dashboard Parser.top
        , Parser.map Login (s "login")
        , Parser.map Register (s "register")
        , Parser.map Dashboard (s "dashboard")
        , Parser.map StudentDetail (s "students" </> string)
        , Parser.map GameDetail (s "games" </> string)
        , Parser.map Subscription (s "subscription")
        ]


fromUrl : Url -> Route
fromUrl url =
    Parser.parse parser url
        |> Maybe.withDefault NotFound


href : Route -> Attribute msg
href route =
    Attr.href (routeToString route)


pushUrl : Nav.Key -> Route -> Cmd msg
pushUrl key route =
    Nav.pushUrl key (routeToString route)


replaceUrl : Nav.Key -> Route -> Cmd msg
replaceUrl key route =
    Nav.replaceUrl key (routeToString route)


routeToString : Route -> String
routeToString route =
    "/" ++ String.join "/" (routeToPieces route)


routeToPieces : Route -> List String
routeToPieces route =
    case route of
        Login ->
            [ "login" ]

        Register ->
            [ "register" ]

        Dashboard ->
            [ "dashboard" ]

        StudentDetail id ->
            [ "students", id ]

        GameDetail id ->
            [ "games", id ]

        Subscription ->
            [ "subscription" ]

        NotFound ->
            [ "not-found" ]
