module Pages.Dashboard exposing (Model, Msg(..), init, subscriptions, update, view)

import Api.Email
import Api.Students
import Api.Subscription
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onSubmit, stopPropagationOn)
import Http
import Json.Decode as Decode exposing (Decoder)
import Process
import Route
import Task
import Time
import Types exposing (ChessComPlayer, RemoteData(..), Student, UserInfo, TimeRangeFilter(..))



-- ============================================================================
-- MODEL
-- ============================================================================


type alias Model =
    { students : RemoteData String (List Student)
    , userInfo : RemoteData String UserInfo
    , showAddModal : Bool
    , newStudentChessCom : String
    , addError : Maybe String
    , isAdding : Bool
    , timeRangeFilter : TimeRangeFilter
    , showArchived : Bool
    , archivingStudentId : Maybe String
    , openMenuStudentId : Maybe String
    , resendStatus : ResendStatus
    , chessComLookup : RemoteData String ChessComPlayer
    , debounceCounter : Int
    , apiUrl : String
    , token : String
    }


type ResendStatus
    = ResendIdle
    | ResendSending
    | ResendSuccess
    | ResendError String



-- ============================================================================
-- INIT
-- ============================================================================


init : String -> String -> TimeRangeFilter -> Maybe UserInfo -> ( Model, Cmd Msg )
init apiUrl token initialTimeRange maybeUserInfo =
    let
        ( userInfoState, userInfoCmd ) =
            case maybeUserInfo of
                Just info ->
                    ( Success info, Cmd.none )

                Nothing ->
                    ( Loading, Api.Subscription.getUserInfo { apiUrl = apiUrl, token = token, onResponse = GotUserInfo } )

        model =
            { students = Loading
            , userInfo = userInfoState
            , showAddModal = False
            , newStudentChessCom = ""
            , addError = Nothing
            , isAdding = False
            , timeRangeFilter = initialTimeRange
            , showArchived = False
            , archivingStudentId = Nothing
            , openMenuStudentId = Nothing
            , resendStatus = ResendIdle
            , chessComLookup = NotAsked
            , debounceCounter = 0
            , apiUrl = apiUrl
            , token = token
            }
    in
    ( model
    , Cmd.batch
        [ fetchStudents model
        , userInfoCmd
        ]
    )



-- ============================================================================
-- MSG & UPDATE
-- ============================================================================


type Msg
    = GotStudents (Result Http.Error (List Student))
    | GotUserInfo (Result Http.Error UserInfo)
    | SetTimeRangeFilter TimeRangeFilter
    | ShowAddModal
    | HideAddModal
    | NewStudentChessComChanged String
    | SubmitNewStudent { apiUrl : String, token : String }
    | GotNewStudent (Result Http.Error Student)
    | PollProgress Time.Posix
    | ToggleShowArchived
    | ToggleStudentMenu String
    | CloseStudentMenu
    | ArchiveStudent String
    | UnarchiveStudent String
    | GotArchiveResult (Result Http.Error Student)
    | DebounceCheckUsername Int
    | GotChessComLookup (Result Http.Error ChessComPlayer)
    | ResendVerificationEmail
    | GotResendResult (Result Http.Error Api.Email.MessageResponse)
    | NoOp


periodToString : TimeRangeFilter -> String
periodToString filter =
    case filter of
        Last7Days ->
            "7days"

        Last30Days ->
            "30days"


fetchStudents : Model -> Cmd Msg
fetchStudents model =
    Api.Students.getStudents
        { apiUrl = model.apiUrl
        , token = model.token
        , period = periodToString model.timeRangeFilter
        , onResponse = GotStudents
        }


fetchUserInfo : Model -> Cmd Msg
fetchUserInfo model =
    Api.Subscription.getUserInfo
        { apiUrl = model.apiUrl
        , token = model.token
        , onResponse = GotUserInfo
        }


update : String -> String -> Msg -> Model -> ( Model, Cmd Msg )
update apiUrl token msg model =
    case msg of
        GotStudents result ->
            case result of
                Ok students ->
                    ( { model | students = Success students }, Cmd.none )

                Err error ->
                    ( { model | students = Failure (httpErrorToString error) }, Cmd.none )

        GotUserInfo result ->
            case result of
                Ok info ->
                    ( { model | userInfo = Success info }, Cmd.none )

                Err error ->
                    ( { model | userInfo = Failure (httpErrorToString error) }, Cmd.none )

        SetTimeRangeFilter filter ->
            let
                newModel =
                    { model
                        | timeRangeFilter = filter
                        , students = Loading
                    }
            in
            ( newModel, fetchStudents newModel )

        ShowAddModal ->
            ( { model
                | showAddModal = True
                , newStudentChessCom = ""
                , addError = Nothing
                , chessComLookup = NotAsked
                , debounceCounter = 0
              }
            , Cmd.none
            )

        HideAddModal ->
            ( { model | showAddModal = False }, Cmd.none )

        NewStudentChessComChanged username ->
            let
                newCounter =
                    model.debounceCounter + 1

                trimmed =
                    String.trim username

                ( lookupState, debounceCmd ) =
                    if String.isEmpty trimmed then
                        ( NotAsked, Cmd.none )

                    else
                        ( Loading
                        , Process.sleep 500
                            |> Task.perform (\_ -> DebounceCheckUsername newCounter)
                        )
            in
            ( { model
                | newStudentChessCom = username
                , addError = Nothing
                , debounceCounter = newCounter
                , chessComLookup = lookupState
              }
            , debounceCmd
            )

        DebounceCheckUsername counter ->
            if counter == model.debounceCounter then
                let
                    trimmed =
                        String.trim model.newStudentChessCom
                in
                if String.isEmpty trimmed then
                    ( model, Cmd.none )

                else
                    ( model
                    , Api.Students.lookupChessComPlayer
                        { apiUrl = apiUrl
                        , token = token
                        , username = trimmed
                        , onResponse = GotChessComLookup
                        }
                    )

            else
                ( model, Cmd.none )

        GotChessComLookup result ->
            case result of
                Ok player ->
                    ( { model | chessComLookup = Success player }, Cmd.none )

                Err _ ->
                    ( { model | chessComLookup = Failure "Player not found on Chess.com" }, Cmd.none )

        SubmitNewStudent config ->
            if String.isEmpty model.newStudentChessCom then
                ( { model | addError = Just "Please enter a Chess.com username" }, Cmd.none )

            else
                ( { model | isAdding = True, addError = Nothing }
                , Api.Students.createStudent
                    { apiUrl = config.apiUrl
                    , token = config.token
                    , chessComUsername = model.newStudentChessCom
                    , onResponse = GotNewStudent
                    }
                )

        GotNewStudent result ->
            case result of
                Ok newStudent ->
                    let
                        updatedStudents =
                            case model.students of
                                Success students ->
                                    Success (newStudent :: students)

                                _ ->
                                    Success [ newStudent ]

                        -- Update userInfo with incremented student count
                        updatedUserInfo =
                            case model.userInfo of
                                Success info ->
                                    let
                                        newCount =
                                            info.studentCount + 1

                                        newIsAtLimit =
                                            case info.plan of
                                                Just plan ->
                                                    newCount >= plan.studentLimit

                                                Nothing ->
                                                    False
                                    in
                                    Success { info | studentCount = newCount, isAtLimit = newIsAtLimit }

                                other ->
                                    other
                    in
                    ( { model
                        | students = updatedStudents
                        , userInfo = updatedUserInfo
                        , showAddModal = False
                        , isAdding = False
                        , newStudentChessCom = ""
                        , chessComLookup = NotAsked
                        , debounceCounter = 0
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | isAdding = False
                        , addError = Just (httpErrorToString error)
                      }
                    , Cmd.none
                    )

        PollProgress _ ->
            ( model, fetchStudents model )

        ToggleShowArchived ->
            ( { model | showArchived = not model.showArchived }, Cmd.none )

        ToggleStudentMenu studentId ->
            if model.openMenuStudentId == Just studentId then
                ( { model | openMenuStudentId = Nothing }, Cmd.none )

            else
                ( { model | openMenuStudentId = Just studentId }, Cmd.none )

        CloseStudentMenu ->
            ( { model | openMenuStudentId = Nothing }, Cmd.none )

        ArchiveStudent studentId ->
            ( { model | archivingStudentId = Just studentId, openMenuStudentId = Nothing }
            , Api.Students.archiveStudent
                { apiUrl = apiUrl
                , token = token
                , studentId = studentId
                , archived = True
                , onResponse = GotArchiveResult
                }
            )

        UnarchiveStudent studentId ->
            ( { model | archivingStudentId = Just studentId, openMenuStudentId = Nothing }
            , Api.Students.archiveStudent
                { apiUrl = apiUrl
                , token = token
                , studentId = studentId
                , archived = False
                , onResponse = GotArchiveResult
                }
            )

        GotArchiveResult result ->
            case result of
                Ok updatedStudent ->
                    let
                        -- Find the old student to determine if archiving or unarchiving
                        wasArchived =
                            case model.students of
                                Success students ->
                                    List.any (\s -> s.id == updatedStudent.id && s.archivedAt /= Nothing) students

                                _ ->
                                    False

                        isNowArchived =
                            updatedStudent.archivedAt /= Nothing

                        updatedStudents =
                            case model.students of
                                Success students ->
                                    Success
                                        (List.map
                                            (\s ->
                                                if s.id == updatedStudent.id then
                                                    updatedStudent

                                                else
                                                    s
                                            )
                                            students
                                        )

                                _ ->
                                    model.students

                        -- Update userInfo based on archive/unarchive action
                        updatedUserInfo =
                            case model.userInfo of
                                Success info ->
                                    let
                                        countDelta =
                                            if wasArchived && not isNowArchived then
                                                1  -- Unarchiving: count goes up

                                            else if not wasArchived && isNowArchived then
                                                -1  -- Archiving: count goes down

                                            else
                                                0

                                        newCount =
                                            info.studentCount + countDelta

                                        newIsAtLimit =
                                            case info.plan of
                                                Just plan ->
                                                    newCount >= plan.studentLimit

                                                Nothing ->
                                                    False
                                    in
                                    Success { info | studentCount = newCount, isAtLimit = newIsAtLimit }

                                other ->
                                    other
                    in
                    ( { model
                        | students = updatedStudents
                        , userInfo = updatedUserInfo
                        , archivingStudentId = Nothing
                      }
                    , Cmd.none
                    )

                Err _ ->
                    ( { model | archivingStudentId = Nothing }, Cmd.none )

        ResendVerificationEmail ->
            ( { model | resendStatus = ResendSending }
            , Api.Email.resendVerification
                { apiUrl = apiUrl
                , token = token
                , onResponse = GotResendResult
                }
            )

        GotResendResult result ->
            case result of
                Ok _ ->
                    ( { model | resendStatus = ResendSuccess }, Cmd.none )

                Err error ->
                    ( { model | resendStatus = ResendError (httpErrorToString error) }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


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
            "Server error (status " ++ String.fromInt status ++ ")"

        Http.BadBody message ->
            "Error: " ++ message


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.students of
        Success students ->
            if hasAnalysisInProgress students then
                Time.every 5000 PollProgress

            else
                Sub.none

        _ ->
            Sub.none


hasAnalysisInProgress : List Student -> Bool
hasAnalysisInProgress students =
    List.any
        (\s ->
            s.stats.gameCount == 0 || s.stats.analyzedCount < s.stats.gameCount
        )
        students



-- ============================================================================
-- HELPERS
-- ============================================================================


type StudentLimitStatus
    = UnderLimit
    | AtLimit
    | LimitUnknown


isAtStudentLimitFromUserInfo : RemoteData String UserInfo -> StudentLimitStatus
isAtStudentLimitFromUserInfo userInfoRemote =
    case userInfoRemote of
        Success info ->
            if info.isAtLimit then
                AtLimit

            else
                UnderLimit

        _ ->
            LimitUnknown


getInitials : String -> String
getInitials name =
    name
        |> String.words
        |> List.map (String.left 1 >> String.toUpper)
        |> List.take 2
        |> String.join ""


formatRelativeTime : Maybe String -> String
formatRelativeTime maybeDate =
    case maybeDate of
        Just date ->
            -- Simple formatting - just show the date for now
            "Last sync: " ++ String.left 10 date

        Nothing ->
            "Not synced yet"



-- ============================================================================
-- VIEW
-- ============================================================================


view : String -> String -> Model -> Html Msg
view apiUrl token model =
    div [ class "min-h-screen" ]
        [ -- Backdrop to close menu when clicking outside
          if model.openMenuStudentId /= Nothing then
            div
                [ class "fixed inset-0 z-0"
                , onClick CloseStudentMenu
                ]
                []

          else
            text ""

        -- Email verification banner
        , viewVerificationBanner model

        -- Dashboard content
        , case model.students of
            NotAsked ->
                text ""

            Loading ->
                viewLoading model

            Failure error ->
                viewError error

            Success students ->
                let
                    archivedCount =
                        List.length (List.filter (\s -> s.archivedAt /= Nothing) students)

                    filteredStudents =
                        if model.showArchived then
                            students

                        else
                            List.filter (\s -> s.archivedAt == Nothing) students
                in
                div []
                    [ if List.isEmpty filteredStudents then
                        if model.showArchived || archivedCount == 0 then
                            viewEmptyState model

                        else
                            div [ class "py-12 text-center" ]
                                [ p [ class "text-gray-500" ] [ text "All students are archived." ]
                                , button
                                    [ onClick ToggleShowArchived
                                    , class "mt-4 text-sm font-medium text-gray-700 hover:text-gray-900"
                                    ]
                                    [ text "Show archived students" ]
                                ]

                      else
                        viewDashboard model filteredStudents archivedCount
                    ]

        -- Add student modal
        , if model.showAddModal then
            viewAddModal apiUrl token model

          else
            text ""
        ]


viewVerificationBanner : Model -> Html Msg
viewVerificationBanner model =
    case model.userInfo of
        Success info ->
            if info.emailVerified then
                text ""

            else
                div [ class "mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4" ]
                    [ div [ class "flex items-center justify-between" ]
                        [ div [ class "flex items-center gap-3" ]
                            [ span [ class "text-amber-600 text-lg" ] [ text "!" ]
                            , div []
                                [ p [ class "text-sm font-medium text-amber-800" ]
                                    [ text "Please verify your email address" ]
                                , p [ class "text-sm text-amber-700 mt-0.5" ]
                                    [ text "Check your inbox for a verification link." ]
                                ]
                            ]
                        , case model.resendStatus of
                            ResendSending ->
                                span [ class "text-sm text-amber-600" ] [ text "Sending..." ]

                            ResendSuccess ->
                                span [ class "text-sm text-green-600 font-medium" ] [ text "Verification email sent!" ]

                            ResendError err ->
                                div [ class "text-right" ]
                                    [ p [ class "text-sm text-red-600" ] [ text err ]
                                    , button
                                        [ onClick ResendVerificationEmail
                                        , class "text-sm font-medium text-amber-700 hover:text-amber-900 underline mt-1"
                                        ]
                                        [ text "Try again" ]
                                    ]

                            ResendIdle ->
                                button
                                    [ onClick ResendVerificationEmail
                                    , class "text-sm font-medium text-amber-700 hover:text-amber-900 underline"
                                    ]
                                    [ text "Resend verification email" ]
                        ]
                    ]

        _ ->
            text ""


viewLoading : Model -> Html Msg
viewLoading model =
    div []
        [ -- Header with title and controls (real content, not skeleton)
          div [ class "mb-8" ]
            [ div [ class "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" ]
                [ div []
                    [ h1 [ class "text-2xl font-bold text-gray-900" ] [ text "Your Students" ]
                    , p [ class "text-gray-500 mt-1" ] [ text "Loading..." ]
                    ]
                , div [ class "flex flex-wrap items-center gap-2 sm:gap-4" ]
                    [ viewTimeRangeFilter model.timeRangeFilter
                    , viewAddStudentButton
                    ]
                ]
            ]

        -- Card skeletons only
        , div [ class "grid grid-cols-1 md:grid-cols-2 gap-4" ]
            (List.repeat 2
                (div [ class "bg-white rounded-xl border border-gray-200 p-5 animate-pulse" ]
                    [ div [ class "flex items-center gap-4 mb-4" ]
                        [ div [ class "w-14 h-14 bg-gray-200 rounded-full" ] []
                        , div [ class "flex-1 space-y-2" ]
                            [ div [ class "h-5 w-32 bg-gray-200 rounded" ] []
                            , div [ class "h-4 w-24 bg-gray-200 rounded" ] []
                            ]
                        ]
                    , div [ class "grid grid-cols-3 gap-3" ]
                        [ div [ class "h-16 bg-gray-100 rounded-lg" ] []
                        , div [ class "h-16 bg-gray-100 rounded-lg" ] []
                        , div [ class "h-16 bg-gray-100 rounded-lg" ] []
                        ]
                    ]
                )
            )
        ]


viewError : String -> Html Msg
viewError error =
    div [ class "py-12 text-center" ]
        [ div [ class "inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4" ]
            [ span [ class "text-2xl" ] [ text "!" ]
            ]
        , h3 [ class "text-lg font-medium text-gray-900 mb-2" ] [ text "Failed to load students" ]
        , p [ class "text-red-600" ] [ text error ]
        ]


viewTimeRangeFilter : TimeRangeFilter -> Html Msg
viewTimeRangeFilter currentFilter =
    let
        pillButton filter label =
            button
                [ onClick (SetTimeRangeFilter filter)
                , class
                    (if currentFilter == filter then
                        "px-4 py-2 text-sm font-medium rounded-full bg-gray-900 text-white transition-colors"

                     else
                        "px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    )
                ]
                [ text label ]
    in
    div [ class "flex items-center gap-2" ]
        [ pillButton Last7Days "Last 7 days"
        , pillButton Last30Days "Last 30 days"
        ]


viewAddStudentButton : Html Msg
viewAddStudentButton =
    button
        [ onClick ShowAddModal
        , class "bg-anthro-dark hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-subtle hover:shadow-card flex items-center gap-2"
        ]
        [ span [ class "text-lg leading-none" ] [ text "+" ]
        , text "Add Student"
        ]


viewUpgradeButton : Html Msg
viewUpgradeButton =
    a
        [ Route.href Route.Subscription
        , class "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-subtle hover:shadow-card flex items-center gap-2"
        ]
        [ span [ class "text-lg leading-none" ] [ text "↑" ]
        , text "Upgrade Plan"
        ]


viewDashboard : Model -> List Student -> Int -> Html Msg
viewDashboard model students archivedCount =
    let
        displayStudentCount =
            List.length students

        totalGames =
            List.sum (List.map (\s -> s.stats.gameCount) students)

        studentCountText =
            case model.userInfo of
                Success info ->
                    case info.plan of
                        Just plan ->
                            String.fromInt info.studentCount ++ "/" ++ String.fromInt plan.studentLimit ++ " students"

                        Nothing ->
                            String.fromInt info.studentCount ++ " student" ++ pluralize info.studentCount

                _ ->
                    String.fromInt displayStudentCount ++ " student" ++ pluralize displayStudentCount
    in
    div []
        [ -- Header with title, time range filter, archive toggle, and add button
          div [ class "mb-8" ]
            [ div [ class "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" ]
                [ div []
                    [ h1 [ class "text-2xl font-bold text-gray-900" ] [ text "Your Students" ]
                    , p [ class "text-gray-500 mt-1 flex items-center gap-1" ]
                        [ text studentCountText
                        , if totalGames > 0 then
                            span [ class "text-gray-400" ]
                                [ text (" · " ++ String.fromInt totalGames ++ " games analyzed") ]

                          else
                            text ""
                        , if archivedCount > 0 then
                            button
                                [ onClick ToggleShowArchived
                                , class
                                    (if model.showArchived then
                                        "text-gray-600 hover:text-gray-800 transition-colors ml-1"

                                     else
                                        "text-gray-400 hover:text-gray-600 transition-colors ml-1"
                                    )
                                ]
                                [ text
                                    (" · "
                                        ++ (if model.showArchived then
                                                "Hide archived (" ++ String.fromInt archivedCount ++ ")"

                                            else
                                                "Show archived (" ++ String.fromInt archivedCount ++ ")"
                                           )
                                    )
                                ]

                          else
                            text ""
                        ]
                    ]
                , div [ class "flex flex-wrap items-center gap-2 sm:gap-4" ]
                    [ viewTimeRangeFilter model.timeRangeFilter
                    , case isAtStudentLimitFromUserInfo model.userInfo of
                        AtLimit ->
                            viewUpgradeButton

                        _ ->
                            viewAddStudentButton
                    ]
                ]
            ]

        -- Student cards grid
        , div
            [ class
                (if displayStudentCount == 1 then
                    "max-w-md"

                 else if displayStudentCount == 2 then
                    "grid grid-cols-1 md:grid-cols-2 gap-4"

                 else
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                )
            ]
            (List.map (viewStudentCard model) students)
        ]


viewStudentCard : Model -> Student -> Html Msg
viewStudentCard model student =
    let
        awaitingImport =
            student.lastImportedAt == Nothing

        noGamesInPeriod =
            student.lastImportedAt /= Nothing && student.stats.gameCount == 0

        hasAlerts =
            not (List.isEmpty (getStudentAlerts student))

        analysisInProgress =
            student.stats.gameCount > 0 && student.stats.analyzedCount < student.stats.gameCount

        isArchived =
            student.archivedAt /= Nothing

        isArchiving =
            model.archivingStudentId == Just student.id

        isMenuOpen =
            model.openMenuStudentId == Just student.id

        statusInfo =
            if isArchived then
                { dotColor = "bg-gray-400"
                , dotAnimation = ""
                , statusText = "Archived"
                , statusClass = "text-gray-500"
                }

            else if awaitingImport then
                { dotColor = "bg-amber-400"
                , dotAnimation = ""
                , statusText = "Awaiting import"
                , statusClass = "text-amber-600"
                }

            else if noGamesInPeriod then
                { dotColor = "bg-gray-400"
                , dotAnimation = ""
                , statusText = "No games"
                , statusClass = "text-gray-500"
                }

            else if analysisInProgress then
                { dotColor = "bg-blue-500"
                , dotAnimation = " animate-pulse"
                , statusText = String.fromInt student.stats.analyzedCount ++ "/" ++ String.fromInt student.stats.gameCount ++ " analyzed"
                , statusClass = "text-blue-600"
                }

            else
                { dotColor = "bg-green-500"
                , dotAnimation = ""
                , statusText = String.fromInt student.stats.gameCount ++ " games"
                , statusClass = "text-green-600"
                }
    in
    div
        [ class
            ("relative bg-white rounded-xl overflow-hidden transition-all duration-200 shadow-card hover:shadow-elevated border border-transparent hover:border-gray-200 "
                ++ (if isArchived then
                        "opacity-75"

                    else if hasAlerts then
                        "border-l-4 border-l-amber-400"

                    else
                        ""
                   )
            )
        ]
        [ -- Three-dots menu button (positioned absolute top-right)
          div [ class "absolute top-3 right-3 z-10" ]
            [ button
                [ onClick (ToggleStudentMenu student.id)
                , class "w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                , stopPropagationOn "click" (Decode.succeed ( ToggleStudentMenu student.id, True ))
                ]
                [ -- Three dots icon (vertical)
                  span [ class "flex flex-col gap-1" ]
                    [ span [ class "w-1 h-1 bg-current rounded-full" ] []
                    , span [ class "w-1 h-1 bg-current rounded-full" ] []
                    , span [ class "w-1 h-1 bg-current rounded-full" ] []
                    ]
                ]

            -- Dropdown menu
            , if isMenuOpen then
                div
                    [ class "absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
                    , stopPropagationOn "click" (Decode.succeed ( NoOp, True ))
                    ]
                    [ if isArchived then
                        button
                            [ onClick (UnarchiveStudent student.id)
                            , class "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            , disabled isArchiving
                            ]
                            [ text
                                (if isArchiving then
                                    "Unarchiving..."

                                 else
                                    "Unarchive"
                                )
                            ]

                      else
                        button
                            [ onClick (ArchiveStudent student.id)
                            , class "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            , disabled isArchiving
                            ]
                            [ text
                                (if isArchiving then
                                    "Archiving..."

                                 else
                                    "Archive"
                                )
                            ]
                    ]

              else
                text ""
            ]
        , a
            [ Route.href (Route.StudentDetail student.id)
            , class "block p-5 group"
            ]
            [ -- Header: Avatar, name, last active
              div [ class "flex items-start gap-4" ]
                [ -- Avatar
                  case student.avatarUrl of
                    Just url ->
                        img
                            [ src url
                            , alt student.displayName
                            , class
                                ("w-14 h-14 rounded-full object-cover flex-shrink-0"
                                    ++ (if isArchived then
                                            " grayscale"

                                        else
                                            ""
                                       )
                                )
                            ]
                            []

                    Nothing ->
                        div [ class "w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0" ]
                            [ span [ class "text-gray-600 font-semibold text-xl" ]
                                [ text (getInitials student.displayName) ]
                            ]

                -- Name and username
                , div [ class "flex-1 min-w-0 pr-6" ]
                    [ div [ class "flex items-center gap-2" ]
                        [ h3 [ class "font-semibold text-gray-900 group-hover:text-gray-700 transition-colors truncate" ]
                            [ text student.displayName ]
                        , if isArchived then
                            span [ class "px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-500" ]
                                [ text "Archived" ]

                          else
                            text ""
                        ]
                    , case student.chessComUsername of
                        Just username ->
                            p [ class "text-sm text-gray-500 truncate" ]
                                [ text ("@" ++ username) ]

                        Nothing ->
                            text ""
                    ]
                ]

            -- Last active (below avatar section)
            , div [ class "mt-2 text-right" ]
                [ p [ class "text-xs text-gray-400" ]
                    [ text
                        (case student.lastImportedAt of
                            Just date ->
                                "Last sync: " ++ String.left 10 date

                            Nothing ->
                                "Not synced"
                        )
                    ]
                ]

            -- Stats row
            , div [ class "flex items-center justify-around mt-4 pt-4 border-t border-anthro-gray-light" ]
                [ viewStatCell (String.fromInt student.stats.gameCount) "games" Nothing
                , case student.stats.winRate of
                    Just rate ->
                        viewStatCell (String.fromInt (round rate) ++ "%") "win rate" Nothing

                    Nothing ->
                        viewStatCell "—" "win rate" Nothing
                , case student.stats.avgAccuracy of
                    Just acc ->
                        viewStatCell (String.fromInt (round acc) ++ "%") "accuracy" Nothing

                    Nothing ->
                        viewStatCell "—" "accuracy" Nothing
                ]

            -- Alert row (shown when student needs attention)
            , if not isArchived then
                viewAlertRow student

              else
                text ""

            -- Footer: CTA and sync status
            , div [ class "mt-4 pt-4 border-t border-gray-100 flex items-center justify-between" ]
                [ span [ class "text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" ]
                    [ text "View Games →" ]
                , span [ class ("text-xs flex items-center gap-1.5 " ++ statusInfo.statusClass) ]
                    [ span [ class ("w-1.5 h-1.5 rounded-full " ++ statusInfo.dotColor ++ statusInfo.dotAnimation) ] []
                    , text statusInfo.statusText
                    ]
                ]
            ]
        ]


viewAlertRow : Student -> Html Msg
viewAlertRow student =
    let
        alerts =
            getStudentAlerts student
    in
    case List.head alerts of
        Just alert ->
            div [ class "mt-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2" ]
                [ span [] [ text "!" ]
                , text alert
                ]

        Nothing ->
            text ""


getStudentAlerts : Student -> List String
getStudentAlerts student =
    let
        importAlert =
            if student.lastImportedAt == Nothing then
                [ "Games not imported yet" ]

            else if student.stats.gameCount == 0 then
                [ "No games in selected period" ]

            else
                []

        lowAccuracy =
            case student.stats.avgAccuracy of
                Just acc ->
                    if acc < 50 then
                        [ "Low average accuracy (" ++ String.fromInt (round acc) ++ "%)" ]

                    else
                        []

                Nothing ->
                    []

        losingRecord =
            if student.stats.gameCount > 5 then
                case student.stats.winRate of
                    Just rate ->
                        if rate < 30 then
                            [ "Struggling with recent games" ]

                        else
                            []

                    Nothing ->
                        []

            else
                []
    in
    importAlert ++ lowAccuracy ++ losingRecord


viewStatCell : String -> String -> Maybe String -> Html Msg
viewStatCell value label maybeTrend =
    div [ class "text-center px-3" ]
        [ div [ class "text-lg font-bold text-gray-900" ] [ text value ]
        , div [ class "text-xs text-gray-500 mt-0.5" ] [ text label ]
        , case maybeTrend of
            Just trend ->
                div
                    [ class
                        (if String.startsWith "+" trend then
                            "text-xs text-green-600 font-medium mt-1"

                         else if String.startsWith "-" trend then
                            "text-xs text-red-600 font-medium mt-1"

                         else
                            "text-xs text-gray-400 mt-1"
                        )
                    ]
                    [ text trend ]

            Nothing ->
                text ""
        ]


viewEmptyState : Model -> Html Msg
viewEmptyState model =
    div [ class "py-16" ]
        [ div [ class "max-w-md mx-auto text-center" ]
            [ -- Icon
              div [ class "w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center" ]
                [ span [ class "text-4xl" ] [ text "+" ]
                ]

            -- Text
            , h2 [ class "text-xl font-bold text-gray-900 mb-2" ]
                [ text "No students yet" ]
            , p [ class "text-gray-500 mb-8" ]
                [ text "Add your first student to start tracking their chess progress and identifying areas for improvement." ]

            -- CTA
            , case isAtStudentLimitFromUserInfo model.userInfo of
                AtLimit ->
                    a
                        [ Route.href Route.Subscription
                        , class "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-subtle hover:shadow-card inline-flex items-center gap-2"
                        ]
                        [ text "Upgrade to Add Students" ]

                _ ->
                    button
                        [ onClick ShowAddModal
                        , class "bg-anthro-dark hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-subtle hover:shadow-card inline-flex items-center gap-2"
                        ]
                        [ span [ class "text-lg leading-none" ] [ text "+" ]
                        , text "Add Student"
                        ]
            ]
        ]


viewAddModal : String -> String -> Model -> Html Msg
viewAddModal apiUrl token model =
    div
        [ class "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        , onClick HideAddModal
        ]
        [ div
            [ class "bg-white rounded-xl shadow-modal max-w-md w-full"
            , Html.Events.stopPropagationOn "click" (Decode.succeed ( NoOp, True ))
            ]
            [ -- Header
              div [ class "flex items-center justify-between p-5 border-b border-gray-100" ]
                [ h2 [ class "text-lg font-semibold text-gray-900" ] [ text "Add Student" ]
                , button
                    [ onClick HideAddModal
                    , class "text-gray-400 hover:text-gray-600 p-1"
                    ]
                    [ text "✕" ]
                ]

            -- Form
            , Html.form
                [ onSubmit (SubmitNewStudent { apiUrl = apiUrl, token = token })
                , class "p-5"
                ]
                [ -- Error message
                  case model.addError of
                    Just errorMsg ->
                        div [ class "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" ]
                            [ text errorMsg ]

                    Nothing ->
                        text ""

                -- Chess.com username input
                , div [ class "mb-4" ]
                    [ label [ class "block text-sm font-medium text-gray-700 mb-1.5" ]
                        [ text "Chess.com Username" ]
                    , input
                        [ type_ "text"
                        , class "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-anthro-dark focus:border-anthro-dark outline-none transition-shadow"
                        , placeholder "Enter username"
                        , value model.newStudentChessCom
                        , onInput NewStudentChessComChanged
                        , disabled model.isAdding
                        ]
                        []
                    ]

                -- Player lookup result
                , viewChessComLookup model.chessComLookup

                -- Buttons
                , div [ class "flex justify-end gap-3" ]
                    [ button
                        [ type_ "button"
                        , onClick HideAddModal
                        , class "px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        , disabled model.isAdding
                        ]
                        [ text "Cancel" ]
                    , button
                        [ type_ "submit"
                        , class "bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        , disabled (model.isAdding || not (isLookupSuccess model.chessComLookup))
                        ]
                        [ if model.isAdding then
                            text "Adding..."

                          else
                            text "Add Student"
                        ]
                    ]
                ]
            ]
        ]


isLookupSuccess : RemoteData String ChessComPlayer -> Bool
isLookupSuccess lookup =
    case lookup of
        Success _ ->
            True

        _ ->
            False


viewChessComLookup : RemoteData String ChessComPlayer -> Html Msg
viewChessComLookup lookup =
    case lookup of
        NotAsked ->
            text ""

        Loading ->
            div [ class "mb-6 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3" ]
                [ div [ class "w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" ] []
                , text "Looking up player..."
                ]

        Success player ->
            div [ class "mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3" ]
                [ case player.avatarUrl of
                    Just url ->
                        img
                            [ src url
                            , alt (Maybe.withDefault player.username player.name)
                            , class "w-10 h-10 rounded-full object-cover flex-shrink-0"
                            ]
                            []

                    Nothing ->
                        div [ class "w-10 h-10 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0" ]
                            [ span [ class "text-green-700 font-semibold text-sm" ]
                                [ text (getInitials (Maybe.withDefault player.username player.name)) ]
                            ]
                , div []
                    [ p [ class "text-sm font-medium text-gray-900" ]
                        [ text (Maybe.withDefault player.username player.name) ]
                    , p [ class "text-xs text-gray-500" ]
                        [ text ("@" ++ player.username) ]
                    ]
                ]

        Failure errorMsg ->
            div [ class "mb-6 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" ]
                [ text errorMsg ]


pluralize : Int -> String
pluralize count =
    if count == 1 then
        ""

    else
        "s"
