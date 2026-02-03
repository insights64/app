module Pages.Subscription exposing (Model, Msg(..), init, subscriptions, update, view)

import Api.Subscription
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Http
import Types
    exposing
        ( RemoteData(..)
        , Subscription
        , SubscriptionDetails
        , SubscriptionPlan
        , SubscriptionStatus(..)
        , UserInfo
        )



-- ============================================================================
-- MODEL
-- ============================================================================


type alias Model =
    { subscription : RemoteData String UserInfo
    , plans : RemoteData String (List SubscriptionPlan)
    , isLoading : Bool
    , error : Maybe String
    , apiUrl : String
    , token : String
    }



-- ============================================================================
-- INIT
-- ============================================================================


init : String -> String -> ( Model, Cmd Msg )
init apiUrl token =
    let
        model =
            { subscription = Loading
            , plans = Loading
            , isLoading = False
            , error = Nothing
            , apiUrl = apiUrl
            , token = token
            }
    in
    ( model
    , Cmd.batch
        [ fetchSubscription model
        , fetchPlans model
        ]
    )



-- ============================================================================
-- MSG & UPDATE
-- ============================================================================


type Msg
    = GotUserInfo (Result Http.Error UserInfo)
    | GotPlans (Result Http.Error (List SubscriptionPlan))
    | OpenBillingPortal
    | GotPortalUrl (Result Http.Error String)
    | DismissError


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotUserInfo result ->
            case result of
                Ok userInfo ->
                    ( { model | subscription = Success userInfo }, Cmd.none )

                Err err ->
                    ( { model | subscription = Failure (httpErrorToString err) }, Cmd.none )

        GotPlans result ->
            case result of
                Ok plansList ->
                    ( { model | plans = Success plansList }, Cmd.none )

                Err err ->
                    ( { model | plans = Failure (httpErrorToString err) }, Cmd.none )

        OpenBillingPortal ->
            ( { model | isLoading = True, error = Nothing }
            , Api.Subscription.createBillingPortalSession
                { apiUrl = model.apiUrl
                , token = model.token
                , onResponse = GotPortalUrl
                }
            )

        GotPortalUrl result ->
            case result of
                Ok url ->
                    ( { model | isLoading = False }, Nav.load url )

                Err err ->
                    ( { model | isLoading = False, error = Just (httpErrorToString err) }, Cmd.none )

        DismissError ->
            ( { model | error = Nothing }, Cmd.none )


fetchSubscription : Model -> Cmd Msg
fetchSubscription model =
    Api.Subscription.getUserInfo
        { apiUrl = model.apiUrl
        , token = model.token
        , onResponse = GotUserInfo
        }


fetchPlans : Model -> Cmd Msg
fetchPlans model =
    Api.Subscription.getPlans
        { apiUrl = model.apiUrl
        , token = model.token
        , onResponse = GotPlans
        }


httpErrorToString : Http.Error -> String
httpErrorToString error =
    case error of
        Http.BadUrl url ->
            "Bad URL: " ++ url

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus status ->
            "Server error: " ++ String.fromInt status

        Http.BadBody body ->
            "Invalid response: " ++ body



-- ============================================================================
-- SUBSCRIPTIONS
-- ============================================================================


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- ============================================================================
-- VIEW
-- ============================================================================


view : Model -> Html Msg
view model =
    div [ class "max-w-4xl mx-auto" ]
        [ viewHeader
        , viewError model
        , case model.subscription of
            NotAsked ->
                text ""

            Loading ->
                viewLoading

            Failure err ->
                viewLoadError err

            Success sub ->
                viewContent model sub
        ]


viewHeader : Html Msg
viewHeader =
    div [ class "mb-8" ]
        [ h1 [ class "text-2xl font-bold text-anthro-dark" ]
            [ text "Subscription" ]
        , p [ class "text-anthro-gray mt-2" ]
            [ text "View your plan and manage your subscription" ]
        ]


viewError : Model -> Html Msg
viewError model =
    case model.error of
        Just err ->
            div [ class "mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center" ]
                [ span [ class "text-red-800" ] [ text err ]
                , button
                    [ class "text-red-600 hover:text-red-800"
                    , onClick DismissError
                    ]
                    [ text "Dismiss" ]
                ]

        Nothing ->
            text ""


viewLoading : Html Msg
viewLoading =
    div [ class "flex justify-center items-center py-12" ]
        [ div [ class "text-anthro-gray" ] [ text "Loading subscription..." ] ]


viewLoadError : String -> Html Msg
viewLoadError err =
    div [ class "bg-red-50 border border-red-200 rounded-lg p-6 text-center" ]
        [ p [ class "text-red-800" ] [ text err ] ]


viewContent : Model -> UserInfo -> Html Msg
viewContent model userInfo =
    let
        sub =
            userInfo.subscription
    in
    div [ class "space-y-6" ]
        [ -- Current Plan Card
          viewCurrentPlan userInfo
        , -- Available Plans
          viewAvailablePlans model userInfo.plan
        , -- Manage Subscription Button
          viewManageButton model sub
        ]


viewCurrentPlan : UserInfo -> Html Msg
viewCurrentPlan userInfo =
    let
        sub =
            userInfo.subscription

        planName =
            userInfo.plan
                |> Maybe.map .displayName
                |> Maybe.withDefault "Free"

        studentLimit =
            userInfo.plan
                |> Maybe.map .studentLimit
                |> Maybe.withDefault 0

        billingPeriod =
            userInfo.details
                |> Maybe.andThen .planInterval
                |> Maybe.map formatInterval
                |> Maybe.withDefault ""
    in
    div [ class "bg-white rounded-lg shadow-sm border border-gray-200 p-6" ]
        [ div [ class "flex justify-between items-start mb-4" ]
            [ div []
                [ h2 [ class "text-lg font-semibold text-anthro-dark" ]
                    [ text "Current Plan" ]
                , div [ class "flex items-center gap-3 mt-2" ]
                    [ span [ class "text-2xl font-bold text-anthro-dark" ]
                        [ text planName ]
                    , viewStatusBadge sub.status userInfo.details
                    , if billingPeriod /= "" then
                        span [ class "text-sm text-anthro-gray bg-gray-100 px-2 py-0.5 rounded" ]
                            [ text billingPeriod ]

                      else
                        text ""
                    ]
                ]
            , div [ class "text-right" ]
                [ div [ class "text-sm text-anthro-gray" ] [ text "Student limit" ]
                , div [ class "text-2xl font-bold text-anthro-dark" ]
                    [ text (String.fromInt studentLimit) ]
                ]
            ]
        , case sub.status of
            Trialing ->
                viewTrialInfo userInfo.details

            _ ->
                viewBillingInfo userInfo.details
        ]


formatInterval : String -> String
formatInterval interval =
    case interval of
        "month" ->
            "Monthly"

        "year" ->
            "Annual"

        _ ->
            capitalize interval


viewStatusBadge : SubscriptionStatus -> Maybe SubscriptionDetails -> Html Msg
viewStatusBadge status maybeDetails =
    let
        isCancelling =
            maybeDetails
                |> Maybe.map .cancelAtPeriodEnd
                |> Maybe.withDefault False

        ( badgeClass, badgeText ) =
            if isCancelling then
                ( "bg-yellow-100 text-yellow-800", "Cancelling" )

            else
                case status of
                    Trialing ->
                        ( "bg-blue-100 text-blue-800", "Trial" )

                    Active ->
                        ( "bg-green-100 text-green-800", "Active" )

                    PastDue ->
                        ( "bg-yellow-100 text-yellow-800", "Payment Due" )

                    Cancelled ->
                        ( "bg-gray-100 text-gray-800", "Cancelled" )

                    Expired ->
                        ( "bg-red-100 text-red-800", "Expired" )
    in
    span [ class ("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " ++ badgeClass) ]
        [ text badgeText ]


viewTrialInfo : Maybe SubscriptionDetails -> Html Msg
viewTrialInfo maybeDetails =
    case maybeDetails of
        Just details ->
            if details.cancelAtPeriodEnd then
                div [ class "mt-4 p-4 bg-yellow-50 rounded-lg" ]
                    [ div [ class "flex items-center" ]
                        [ span [ class "text-yellow-800 font-medium" ] [ text "Cancellation Scheduled" ]
                        ]
                    , case details.trialEnd of
                        Just endsAt ->
                            p [ class "text-sm text-yellow-700 mt-1" ]
                                [ text ("Your subscription will end on " ++ formatDate endsAt) ]

                        Nothing ->
                            case details.currentPeriodEnd of
                                "" ->
                                    text ""

                                periodEnd ->
                                    p [ class "text-sm text-yellow-700 mt-1" ]
                                        [ text ("Your subscription will end on " ++ formatDate periodEnd) ]
                    ]

            else
                div [ class "mt-4 p-4 bg-blue-50 rounded-lg" ]
                    [ div [ class "flex items-center" ]
                        [ span [ class "text-blue-800 font-medium" ] [ text "Free Trial" ]
                        ]
                    , case details.trialEnd of
                        Just endsAt ->
                            p [ class "text-sm text-blue-700 mt-1" ]
                                [ text ("Trial ends: " ++ formatDate endsAt) ]

                        Nothing ->
                            text ""
                    , p [ class "text-sm text-blue-600 mt-2" ]
                        [ text "Add a payment method to continue after your trial ends." ]
                    ]

        Nothing ->
            div [ class "mt-4 p-4 bg-blue-50 rounded-lg" ]
                [ div [ class "flex items-center" ]
                    [ span [ class "text-blue-800 font-medium" ] [ text "Free Trial" ]
                    ]
                , p [ class "text-sm text-blue-600 mt-2" ]
                    [ text "Add a payment method to continue after your trial ends." ]
                ]


viewBillingInfo : Maybe SubscriptionDetails -> Html Msg
viewBillingInfo maybeDetails =
    case maybeDetails of
        Just details ->
            div [ class "mt-4 text-sm text-anthro-gray" ]
                [ div [ class "flex justify-between" ]
                    [ span [] [ text "Billing period" ]
                    , span [ class "font-medium text-anthro-dark" ]
                        [ text (details.planInterval |> Maybe.withDefault "monthly" |> capitalize) ]
                    ]
                , div [ class "flex justify-between mt-2" ]
                    [ span [] [ text "Current period ends" ]
                    , span [ class "font-medium text-anthro-dark" ]
                        [ text (formatDate details.currentPeriodEnd) ]
                    ]
                , if details.cancelAtPeriodEnd then
                    p [ class "mt-3 text-yellow-700 bg-yellow-50 p-2 rounded" ]
                        [ text "Your subscription will end at the end of the current period." ]

                  else
                    text ""
                ]

        Nothing ->
            text ""


viewAvailablePlans : Model -> Maybe SubscriptionPlan -> Html Msg
viewAvailablePlans model maybeCurrentPlan =
    case model.plans of
        Success plans ->
            div [ class "bg-white rounded-lg shadow-sm border border-gray-200 p-6" ]
                [ h3 [ class "text-lg font-semibold text-anthro-dark mb-4" ]
                    [ text "Available Plans" ]
                , div [ class "grid grid-cols-1 md:grid-cols-2 gap-4" ]
                    (List.map (viewPlanCard maybeCurrentPlan) plans)
                ]

        Loading ->
            div [ class "bg-white rounded-lg shadow-sm border border-gray-200 p-6" ]
                [ h3 [ class "text-lg font-semibold text-anthro-dark mb-4" ]
                    [ text "Available Plans" ]
                , div [ class "text-anthro-gray text-center py-4" ]
                    [ text "Loading plans..." ]
                ]

        _ ->
            text ""


viewPlanCard : Maybe SubscriptionPlan -> SubscriptionPlan -> Html Msg
viewPlanCard maybeCurrentPlan plan =
    let
        isCurrentPlan =
            maybeCurrentPlan
                |> Maybe.map (\current -> plan.name == current.name)
                |> Maybe.withDefault False

        borderClass =
            if isCurrentPlan then
                "border-2 border-anthro-orange"

            else
                "border border-gray-200"
    in
    div [ class ("rounded-lg p-4 " ++ borderClass) ]
        [ div [ class "flex justify-between items-start" ]
            [ h4 [ class "font-semibold text-anthro-dark" ]
                [ text plan.displayName ]
            , if isCurrentPlan then
                span [ class "text-xs bg-anthro-orange text-white px-2 py-0.5 rounded-full" ]
                    [ text "Current" ]

              else
                text ""
            ]
        , div [ class "text-2xl font-bold text-anthro-dark mt-2" ]
            [ text (String.fromInt plan.studentLimit)
            , span [ class "text-sm font-normal text-anthro-gray" ] [ text " students" ]
            ]
        , viewPlanPricing plan
        , -- Plan features
          viewPlanFeatures plan
        ]


viewPlanPricing : SubscriptionPlan -> Html Msg
viewPlanPricing plan =
    if plan.monthlyPriceCents > 0 then
        let
            monthlyPrice =
                plan.monthlyPriceCents // 100

            annualPrice =
                plan.annualPriceCents // 100

            annualMonthly =
                annualPrice // 12

            savings =
                (monthlyPrice * 12) - annualPrice
        in
        div [ class "mt-3 space-y-1" ]
            [ div [ class "flex items-baseline gap-2" ]
                [ span [ class "text-lg font-semibold text-anthro-dark" ]
                    [ text ("$" ++ String.fromInt monthlyPrice) ]
                , span [ class "text-sm text-anthro-gray" ] [ text "/month" ]
                ]
            , div [ class "flex items-baseline gap-2" ]
                [ span [ class "text-lg font-semibold text-anthro-dark" ]
                    [ text ("$" ++ String.fromInt annualPrice) ]
                , span [ class "text-sm text-anthro-gray" ] [ text "/year" ]
                , if savings > 0 then
                    span [ class "text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded" ]
                        [ text ("Save $" ++ String.fromInt savings) ]

                  else
                    text ""
                ]
            ]

    else
        div [ class "text-sm text-green-600 mt-2" ] [ text "Free" ]


viewPlanFeatures : SubscriptionPlan -> Html Msg
viewPlanFeatures plan =
    let
        features =
            case plan.name of
                "coach" ->
                    [ "Up to " ++ String.fromInt plan.studentLimit ++ " students"
                    , "Game import from Chess.com"
                    , "AI-powered game analysis"
                    , "Student progress tracking"
                    ]

                "academy" ->
                    [ "Up to " ++ String.fromInt plan.studentLimit ++ " students"
                    , "Everything in Coach plan"
                    , "Priority support"
                    ]

                _ ->
                    [ "Up to " ++ String.fromInt plan.studentLimit ++ " students" ]
    in
    ul [ class "mt-3 space-y-1" ]
        (List.map
            (\feature ->
                li [ class "text-sm text-anthro-gray flex items-center gap-2" ]
                    [ span [ class "text-green-500" ] [ text "✓" ]
                    , text feature
                    ]
            )
            features
        )


viewManageButton : Model -> Subscription -> Html Msg
viewManageButton model sub =
    div [ class "bg-white rounded-lg shadow-sm border border-gray-200 p-6" ]
        [ h3 [ class "text-lg font-semibold text-anthro-dark mb-2" ]
            [ text "Manage Your Subscription" ]
        , p [ class "text-sm text-anthro-gray mb-4" ]
            [ text "Change your plan, update payment methods, view invoices, or cancel your subscription." ]
        , if sub.stripeCustomerId /= "local_dev" then
            button
                [ class "w-full px-4 py-3 bg-anthro-dark text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium"
                , onClick OpenBillingPortal
                , disabled model.isLoading
                ]
                [ if model.isLoading then
                    text "Opening..."

                  else
                    text "Manage Subscription"
                ]

          else
            div [ class "text-sm text-anthro-gray bg-gray-50 p-3 rounded-lg" ]
                [ text "Billing portal not available in development mode." ]
        ]


capitalize : String -> String
capitalize str =
    String.toUpper (String.left 1 str) ++ String.dropLeft 1 str


formatDate : String -> String
formatDate isoDate =
    -- Simple date formatting - just show the date part
    String.left 10 isoDate
