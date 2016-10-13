// Creates the MainCtrl Module and Controller.
app.controller('MainCtrl', ['$scope', '$window', '$http', '$q', '$log', '$timeout', 'Urls', 'Constants', function($scope, $window, $http, $q, $log, $timeout, Urls, Constants) {
    $log.log('hello biach');

    var pingUrl = Urls.BASE_URL + Urls.PING;
    var teamIdUrl = Urls.BASE_URL + Urls.USER;
    var createBotGameUrl = Urls.BASE_URL + Urls.INIT_BOT_GAME;
    var gameStatusUrl = Urls.GAME_STATUS;
    var gameBoardUrl = Urls.GAME_BOARD;
    var makeMoveUrl = Urls.GAME_MAKE_MOVE;

    //GAME variables
    $scope.teamId = null;
    $scope.gameId = null;
    $scope.botLevel = null;

    /**
     * generic request
     * $http does not work with the test API
     * @param url : request url
     * @return request response
     */
    function sendRequest (url) {
        var deferred = $q.defer();
        var req = new XMLHttpRequest();
        req.open('GET', url, true); 
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                deferred.resolve(req.response);
            }
        };
        req.onerror = function onError (error) {
            $log.log('[REQUEST] error : ' + error);
            deferred.reject();
        };

        $timeout(function() {
            req.send(null);       
        }, 200);

        return deferred.promise;
    }

    /**
     * test ping -> response = pong
     */
    function testPing () {
        sendRequest(pingUrl).then(function(response) {
            $log.log(response);
        });
    }
    testPing();

    /**
     * generic error handling
     */
    function logError (error) {
        $log.error(error);
    }

    /**
     * analyse game board
     * @return move to make
     */
    function computeNextMove (board) {
        //TODO intelligence de batard
        return Constants.MOVE_SHOOT;
    }

    /**
     * analyse status
     */
    function computeGameStatus (status) {
        if (status === Constants.STATUS_YES) {
            return true;
        } else if (status === Constants.STATUS_NO) {
            return false;
        } else {
            //something went wrong, or we won !
            $log.log(status);
            return null;
        }
    }

    /**
     * analyse move response
     */
    function continueGame (moveResult) {

    }


    /**
     * play game
     */
    var gameOver = false;
    function play () {
        //update urls
        gameBoardUrl = gameBoardUrl.replace('@idPartie', $scope.gameId);
        gameStatusUrl = gameStatusUrl.replace('@idPartie', $scope.gameId);

        if (!gameOver) {
            sendRequest(gameBoardUrl).then(function(board) {
                var nextMove = computeNextMove(board);
                sendRequest(gameStatusUrl).then(function(status) {
                    var canPlay = computeGameStatus(status);
                    if (status !== null && status) {
                        makeMoveUrl = makeMoveUrl.replace('@move', nextMove);
                        sendRequest(makeMoveUrl).then(function(result) {
                            //var canContinue = 
                        });
                    } else {
                        gameOver = true;
                    }
                });
            });
        }
    }


    /**
     * retrieve teamId
     */
    $scope.getTeamId = function () {
        if (!$scope.teamId) {
           sendRequest(teamIdUrl).then(function(response) {
                $log.log(response);
                $scope.teamId = response;
            }, logError);
        }
    };

    /**
     * create new bot game
     */
    var level = 1;
    $scope.createGame = function() {
        if ($scope.teamId && $scope.botLevel) {
            createBotGameUrl = createBotGameUrl.replace('@level', $scope.botLevel).replace('@teamId', $scope.teamId);
            sendRequest(createBotGameUrl).then(function(response) {
                $log.log(response);

                if (response !== Constants.UNKNOWN) {
                    //game created
                    $scope.gameId = response;
                    //play();
                } else {
                    //game not created yet
                    $timeout($scope.createGame(), 300);
                }
            }, logError);
        }
    };

}]);
