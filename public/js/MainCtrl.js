// Creates the MainCtrl Module and Controller.
app.controller('MainCtrl', ['$scope', '$window', '$http', '$q', '$log', '$timeout', 'Urls', 'Constants', function($scope, $window, $http, $q, $log, $timeout, Urls, Constants) {
    $log.log('hello biach');

    var pingUrl = Urls.BASE_URL + Urls.PING;
    var teamIdUrl = Urls.BASE_URL + Urls.USER;
    var createBotGameUrl = Urls.BASE_URL + Urls.INIT_BOT_GAME;
    var gameStatusUrl = Urls.BASE_URL + Urls.GAME_STATUS;
    var gameBoardUrl = Urls.BASE_URL + Urls.GAME_BOARD;
    var makeMoveUrl = Urls.BASE_URL + Urls.GAME_MAKE_MOVE;

    //GAME variables
    $scope.teamId = null;
    $scope.gameId = null;
    $scope.botLevel = null;
    $scope.display = [];

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
            $scope.display.push('[REQUEST] error : ' + error);
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
            $scope.display.push(response);
            $log.log(response);
        });
    }
    testPing();

    /**
     * generic error handling
     */
    function logError (error) {
        $scope.display.push(error);
        $log.error(error);
    }

    /**
     * analyse game board
     * @return move to make
     */
    function computeNextMove (board) {
        board = JSON.parse(board);
        var player1 = board.player1;
        var player2 = board.player2;
        //TODO intelligence de batard
        /*if (player1.bullet !== 0) {
            return Constants.MOVE_SHOOT;
        } else {
            if (player1.bomb !== 0) {
                return Constants.MOVE_BOMB;
            } else if (player2.focused && player1.shield !== 0) {
                return Constants.MOVE_COVER;
            } else if (player1.bullet !== 0 && !player1.focused) {
                return Constants.MOVE_AIM;
            } else {
                var randomChoice = Math.floor((Math.random() * 10) + 1) > 6 && player1.shield !== 0;
                if (randomChoice) {
                    return Constants.MOVE_COVER;
                } else {
                    return Constants.MOVE_RELOAD;
                }
            }
        }*/
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
            $scope.display.push(status);
            $log.log(status);
            return null;
        }
    }

    /**
     * analyse move response
     */
    function continueGame (moveResult) {
        if (moveResult === Constants.MOVE_KO) {
            $scope.display.push('[GAME] hum hum, something went wrong');
            $log.log('[GAME] hum hum, something went wrong');
            return false;
        } else if (moveResult === Constants.MOVE_DEFEAT) {
            $scope.display.push('[GAME] you\'ve lost bitch');
            $log.log('[GAME] you\'ve lost bitch');
            return false;
        } else if (moveResult === Constants.MOVE_NOT_YOUR_TURN) {
            return true;
        } else if (moveResult === Constants.MOVE_OK) {
            return true;
        }

        return false;
    }


    /**
     * play game
     */
    var gameOver = false;
    function play () {
        if (!gameOver) {
            sendRequest(gameBoardUrl).then(function(board) {
                $scope.display.push('[BOARD] state ' + board);                
                $log.log('[BOARD] state ' + board);
                var nextMove = computeNextMove(board);
                sendRequest(gameStatusUrl).then(function(status) {
                    var canPlay = computeGameStatus(status);
                    if (status !== null && status) {
                        var newMoveUrl = angular.copy(makeMoveUrl).replace('@move', nextMove);
                        sendRequest(newMoveUrl).then(function(result) {
                            var canContinue = continueGame(result);
                            if (canContinue) {
                                play();
                            }
                        });
                    } else {
                        gameOver = true;
                        $scope.gameId = null;
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
               $scope.display.push(response);
                $log.log(response);
                $scope.teamId = response;
            }, logError);
        }
    };

    /**
     * create new bot game
     */
    $scope.createGame = function() {
        if ($scope.teamId && $scope.botLevel) {
            createBotGameUrl = createBotGameUrl.replace('@level', $scope.botLevel).replace('@teamId', $scope.teamId);
            sendRequest(createBotGameUrl).then(function(response) {
                $scope.display.push(response);
                $log.log(response);

                if (response !== Constants.UNKNOWN) {
                    //game created
                    $scope.gameId = response;
                    //update urls
                    gameBoardUrl = gameBoardUrl.replace('@gameId', $scope.gameId);
                    gameStatusUrl = gameStatusUrl.replace('@gameId', $scope.gameId).replace('@teamId', $scope.teamId);
                    makeMoveUrl = makeMoveUrl.replace('@gameId', $scope.gameId).replace('@teamId', $scope.teamId);

                } else {
                    //game not created yet
                    $timeout($scope.createGame(), 300);
                }
            }, logError);
        }
    };

    $scope.launchGame = function() {
        play();
    };

}]);
