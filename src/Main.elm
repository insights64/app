port module Main exposing (main)

import Api.Subscription
import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Pages.Dashboard as Dashboard
import Pages.GameDetail as GameDetail
import Pages.Login as Login
import Pages.Register as Register
import Pages.StudentDetail as StudentDetail
import Pages.Subscription as Subscription
import Route exposing (Route)
import Types exposing (CoachWithSubscription, SubscriptionWithPlan, TimeRangeFilter(..), timeRangeFilterFromString, timeRangeFilterToString)
import Url exposing (Url)
import View.Layout as Layout



-- PORTS


port saveToken : String -> Cmd msg


port clearToken : () -> Cmd msg


port saveCoach : { id : String, email : String } -> Cmd msg


port identifyUser : { id : String, email : String } -> Cmd msg


port saveTimeRangeFilter : String -> Cmd msg


port redirectToUrl : String -> Cmd msg



-- MODEL


type alias Model =
    { key : Nav.Key
    , session : Session
    , page : Page
    , apiUrl : String
    , timeRangeFilter : TimeRangeFilter
    }


type Session
    = Guest
    | LoggedIn String CoachWithSubscription


type Page
    = LoginPage Login.Model
    | RegisterPage Register.Model
    | DashboardPage Dashboard.Model
    | StudentDetailPage StudentDetail.Model
    | GameDetailPage GameDetail.Model
    | SubscriptionPage Subscription.Model
    | NotFoundPage



-- INIT


type alias Flags =
    { token : Maybe String
    , coach : Maybe { id : String, email : String }
    , apiUrl : String
    , timeRangeFilter : Maybe String
    }


init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        session =
            case ( flags.token, flags.coach ) of
                ( Just token, Just coach ) ->
                    -- Convert simple coach from localStorage to CoachWithSubscription
                    -- Subscription will be fetched when needed
                    LoggedIn token
                        { id = coach.id
                        , email = coach.email
                        , createdAt = ""
                        , subscription = Nothing
                        }

                ( Just token, Nothing ) ->
                    -- Token exists but no coach data - use placeholder
                    LoggedIn token { id = "", email = "", createdAt = "", subscription = Nothing }

                _ ->
                    Guest

        timeRangeFilter =
            flags.timeRangeFilter
                |> Maybe.map timeRangeFilterFromString
                |> Maybe.withDefault Last30Days

        ( model, routeCmd ) =
            changeRouteTo (Route.fromUrl url)
                { key = key
                , session = session
                , page = NotFoundPage
                , apiUrl = flags.apiUrl
                , timeRangeFilter = timeRangeFilter
                }

        -- Fetch subscription if we have a token (to populate badge on page reload)
        subscriptionCmd =
            case flags.token of
                Just token ->
                    Api.Subscription.getMySubscription
                        { apiUrl = flags.apiUrl
                        , token = token
                        , onResponse = GotSubscription
                        }

                Nothing ->
                    Cmd.none
    in
    ( model, Cmd.batch [ routeCmd, subscriptionCmd ] )



-- UPDATE


type Msg
    = UrlRequested Browser.UrlRequest
    | UrlChanged Url
    | LoginMsg Login.Msg
    | RegisterMsg Register.Msg
    | DashboardMsg Dashboard.Msg
    | StudentDetailMsg StudentDetail.Msg
    | GameDetailMsg GameDetail.Msg
    | SubscriptionMsg Subscription.Msg
    | GotSubscription (Result Http.Error SubscriptionWithPlan)
    | Logout
    | SetTimeRangeFilter TimeRangeFilter


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.page ) of
        ( UrlRequested urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        ( UrlChanged url, _ ) ->
            changeRouteTo (Route.fromUrl url) model

        ( LoginMsg subMsg, LoginPage subModel ) ->
            let
                ( newSubModel, subCmd, maybeAuth ) =
                    Login.update model.apiUrl subMsg subModel
            in
            case maybeAuth of
                Just { token, coach } ->
                    ( { model | session = LoggedIn token coach }
                    , Cmd.batch
                        [ saveToken token
                        , saveCoach { id = coach.id, email = coach.email }
                        , identifyUser { id = coach.id, email = coach.email }
                        , Route.replaceUrl model.key Route.Dashboard
                        ]
                    )

                Nothing ->
                    ( { model | page = LoginPage newSubModel }
                    , Cmd.map LoginMsg subCmd
                    )

        ( RegisterMsg subMsg, RegisterPage subModel ) ->
            let
                ( newSubModel, subCmd, maybeAuth ) =
                    Register.update model.apiUrl subMsg subModel
            in
            case maybeAuth of
                Just { token, coach } ->
                    ( { model | session = LoggedIn token coach }
                    , Cmd.batch
                        [ saveToken token
                        , saveCoach { id = coach.id, email = coach.email }
                        , identifyUser { id = coach.id, email = coach.email }
                        , Route.replaceUrl model.key Route.Dashboard
                        ]
                    )

                Nothing ->
                    ( { model | page = RegisterPage newSubModel }
                    , Cmd.map RegisterMsg subCmd
                    )

        ( DashboardMsg subMsg, DashboardPage subModel ) ->
            case model.session of
                LoggedIn token _ ->
                    let
                        ( newSubModel, subCmd ) =
                            Dashboard.update model.apiUrl token subMsg subModel

                        -- Check if the time range filter changed
                        ( updatedModel, extraCmd ) =
                            if newSubModel.timeRangeFilter /= model.timeRangeFilter then
                                ( { model
                                    | page = DashboardPage newSubModel
                                    , timeRangeFilter = newSubModel.timeRangeFilter
                                  }
                                , saveTimeRangeFilter (timeRangeFilterToString newSubModel.timeRangeFilter)
                                )

                            else
                                ( { model | page = DashboardPage newSubModel }
                                , Cmd.none
                                )
                    in
                    ( updatedModel
                    , Cmd.batch [ Cmd.map DashboardMsg subCmd, extraCmd ]
                    )

                Guest ->
                    ( model, Route.replaceUrl model.key Route.Login )

        ( StudentDetailMsg subMsg, StudentDetailPage subModel ) ->
            let
                ( newSubModel, subCmd ) =
                    StudentDetail.update subMsg subModel

                -- Check if the time range filter changed
                ( updatedModel, extraCmd ) =
                    if newSubModel.timeRangeFilter /= model.timeRangeFilter then
                        ( { model
                            | page = StudentDetailPage newSubModel
                            , timeRangeFilter = newSubModel.timeRangeFilter
                          }
                        , saveTimeRangeFilter (timeRangeFilterToString newSubModel.timeRangeFilter)
                        )

                    else
                        ( { model | page = StudentDetailPage newSubModel }
                        , Cmd.none
                        )
            in
            ( updatedModel
            , Cmd.batch [ Cmd.map StudentDetailMsg subCmd, extraCmd ]
            )

        ( GameDetailMsg subMsg, GameDetailPage subModel ) ->
            let
                ( newSubModel, subCmd ) =
                    GameDetail.update subMsg subModel
            in
            ( { model | page = GameDetailPage newSubModel }
            , Cmd.map GameDetailMsg subCmd
            )

        ( SubscriptionMsg subMsg, SubscriptionPage subModel ) ->
            let
                ( newSubModel, subCmd ) =
                    Subscription.update subMsg subModel
            in
            ( { model | page = SubscriptionPage newSubModel }
            , Cmd.map SubscriptionMsg subCmd
            )

        ( GotSubscription result, _ ) ->
            case result of
                Ok subWithPlan ->
                    case model.session of
                        LoggedIn token coach ->
                            ( { model
                                | session =
                                    LoggedIn token
                                        { coach | subscription = Just subWithPlan }
                              }
                            , Cmd.none
                            )

                        Guest ->
                            ( model, Cmd.none )

                Err _ ->
                    -- Silently fail - badge just won't show
                    ( model, Cmd.none )

        ( Logout, _ ) ->
            ( { model | session = Guest }
            , Cmd.batch
                [ clearToken ()
                , Route.replaceUrl model.key Route.Login
                ]
            )

        ( SetTimeRangeFilter filter, _ ) ->
            ( { model | timeRangeFilter = filter }
            , saveTimeRangeFilter (timeRangeFilterToString filter)
            )

        -- Catch-all for mismatched messages and pages
        _ ->
            ( model, Cmd.none )


changeRouteTo : Route -> Model -> ( Model, Cmd Msg )
changeRouteTo route model =
    case route of
        Route.Login ->
            case model.session of
                LoggedIn _ _ ->
                    ( model, Route.replaceUrl model.key Route.Dashboard )

                Guest ->
                    ( { model | page = LoginPage Login.init }, Cmd.none )

        Route.Register ->
            case model.session of
                LoggedIn _ _ ->
                    ( model, Route.replaceUrl model.key Route.Dashboard )

                Guest ->
                    ( { model | page = RegisterPage Register.init }, Cmd.none )

        Route.Dashboard ->
            case model.session of
                LoggedIn token _ ->
                    let
                        ( subModel, subCmd ) =
                            Dashboard.init model.apiUrl token model.timeRangeFilter
                    in
                    ( { model | page = DashboardPage subModel }
                    , Cmd.map DashboardMsg subCmd
                    )

                Guest ->
                    ( model, Route.replaceUrl model.key Route.Login )

        Route.StudentDetail studentId ->
            case model.session of
                LoggedIn token _ ->
                    let
                        ( subModel, subCmd ) =
                            StudentDetail.init model.apiUrl token studentId model.timeRangeFilter
                    in
                    ( { model | page = StudentDetailPage subModel }
                    , Cmd.map StudentDetailMsg subCmd
                    )

                Guest ->
                    ( model, Route.replaceUrl model.key Route.Login )

        Route.GameDetail gameId ->
            case model.session of
                LoggedIn token _ ->
                    let
                        ( subModel, subCmd ) =
                            GameDetail.init model.apiUrl token gameId
                    in
                    ( { model | page = GameDetailPage subModel }
                    , Cmd.map GameDetailMsg subCmd
                    )

                Guest ->
                    ( model, Route.replaceUrl model.key Route.Login )

        Route.Subscription ->
            case model.session of
                LoggedIn token _ ->
                    let
                        ( subModel, subCmd ) =
                            Subscription.init model.apiUrl token
                    in
                    ( { model | page = SubscriptionPage subModel }
                    , Cmd.map SubscriptionMsg subCmd
                    )

                Guest ->
                    ( model, Route.replaceUrl model.key Route.Login )

        Route.NotFound ->
            ( { model | page = NotFoundPage }, Cmd.none )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "Insights64"
    , body =
        [ case model.page of
            LoginPage subModel ->
                Html.map LoginMsg (Login.view subModel)

            RegisterPage subModel ->
                Html.map RegisterMsg (Register.view subModel)

            DashboardPage subModel ->
                case model.session of
                    LoggedIn token coach ->
                        Layout.layout
                            { coach = coach
                            , onLogout = Logout
                            , content = Html.map DashboardMsg (Dashboard.view model.apiUrl token subModel)
                            }

                    Guest ->
                        text ""

            StudentDetailPage subModel ->
                case model.session of
                    LoggedIn _ coach ->
                        Layout.layout
                            { coach = coach
                            , onLogout = Logout
                            , content = Html.map StudentDetailMsg (StudentDetail.view subModel)
                            }

                    Guest ->
                        text ""

            GameDetailPage subModel ->
                case model.session of
                    LoggedIn _ coach ->
                        Layout.layout
                            { coach = coach
                            , onLogout = Logout
                            , content = Html.map GameDetailMsg (GameDetail.view subModel)
                            }

                    Guest ->
                        text ""

            SubscriptionPage subModel ->
                case model.session of
                    LoggedIn _ coach ->
                        Layout.layout
                            { coach = coach
                            , onLogout = Logout
                            , content = Html.map SubscriptionMsg (Subscription.view subModel)
                            }

                    Guest ->
                        text ""

            NotFoundPage ->
                viewNotFound
        ]
    }


viewNotFound : Html Msg
viewNotFound =
    div [ class "min-h-screen flex items-center justify-center bg-cream" ]
        [ div [ class "text-center" ]
            [ div [ class "text-6xl text-gray-300 mb-4" ] [ text "N" ]
            , h1 [ class "text-2xl font-bold text-gray-900 mb-2" ] [ text "Page Not Found" ]
            , p [ class "text-gray-600 mb-6" ] [ text "The page you're looking for doesn't exist." ]
            , a
                [ Route.href Route.Dashboard
                , class "inline-block bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-subtle hover:shadow-card"
                ]
                [ text "Go to Dashboard" ]
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.page of
        DashboardPage subModel ->
            Sub.map DashboardMsg (Dashboard.subscriptions subModel)

        _ ->
            Sub.none



-- MAIN


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = UrlRequested
        , onUrlChange = UrlChanged
        }
