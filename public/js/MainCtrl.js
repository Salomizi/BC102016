// Creates the MainCtrl Module and Controller.
app.controller('MainCtrl', ['$scope', '$window', '$http', '$q', '$timeout', 'Urls', 'Constants', function($scope, $window, $http, $q, $timeout, Urls, Constants) {
    
    var pingUrl = Urls.PING;
    var teamIdUrl = Urls.USER;
    var createBotGameUrl = Urls.INIT_BOT_GAME;
    var gameStatusUrl = Urls.GAME_STATUS;
    var gameBoardUrl = Urls.GAME_BOARD;
    var gameLastMove = Urls.GAME_LAST_MOVE;
    var makeMoveUrl = Urls.GAME_MAKE_MOVE;

    //GAME variables
    $scope.teamId = null;
    $scope.gameId = null;
    $scope.botLevel = null;
    $scope.display = [];
    
    var iMobile = '';
    var foe = '';
    enemyPlayedMoves = {};
<<<<<<< HEAD
    var currentTurn = -1;
=======
    var currentActionNumber = -1;
    var staticUpperBound = 100;
>>>>>>> 2172df6278f802eb1ccfe476c977c3fdf48b3ead

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
        });
    }
    testPing();

    /**
     * generic error handling
     */
    function logError (error) {
        $scope.display.push('[ERROR] ' + error);
    }

    /**
     * generate random number
     * @return random number between 0 and the given bound
     */
    function generateRandomNumber (upperBound) {
        return Math.floor((Math.random() * upperBound) + 1);
    }

    /**
     * analyse if we are in danger
     * @return number of cover we need to take
     */
    var mustCoverBomb = false;
    function inDanger (player1, foeLastMove) {
        var minShieldToCoverBomb = 3;
        var maxCumulatedCover = 2;

        if (player1.shield === 0) {
            return false;
        }

        if (foeLastMove === Constants.MOVE_BOMB) {
            if (mustCoverBomb) {
                //need to cover
                mustCoverBomb = false;
                return true;
            } else if (player1.shield > minShieldToCoverBomb + 1) {
                //cover at T+1
                return true;
            } else {
                //will only cover at T+2 to minimize strike
                mustCoverBomb = true;
                return false;
            }
        } else if (foeLastMove === Constants.MOVE_AIM && player1.cumulatedCovers < maxCumulatedCover) {
            if (generateRandomNumber(2) === 1) {
                return false;
            } else {
                return true;
            }
        }

        return null;
    }

    /**
     * analyse game board and last opponent's move
     * @return move to make
     */
    function computeNextMove (board, foeLastMove) {
        var player1 = board[iMobile];
        var player2 = board[foe];
        var randomChoice;

        //TODO intelligence de batard

        var inPotentialDanger = inDanger(player1, foeLastMove);
        if (inPotentialDanger) {
            return Constants.MOVE_COVER;
        }

        if (player1.bullet !== 0) {
            if (player1.focused) {
                //if we aimed, we must shoot
                return Constants.MOVE_SHOOT;
            } else {
                //random choice of action -> choice between 2 numbers
                randomChoice = generateRandomNumber(staticUpperBound);
                if (_.inRange(randomChoice, 0, staticUpperBound * 0.41)) {
                    return Constants.MOVE_AIM;
                } else if (_.inRange(randomChoice, staticUpperBound * 0.41, staticUpperBound * 0.71)) {
                    return Constants.MOVE_SHOOT;
                } else if (player1.bomb > 0) {
                    return Constants.MOVE_BOMB;
                } else {
                    return Constants.MOVE_SHOOT;
                }
            }     
        } else {
            //random choice of action
            randomChoice = generateRandomNumber(staticUpperBound);
            if (_.inRange(randomChoice, 0, staticUpperBound * 0.71)) {
                return Constants.MOVE_RELOAD;
            } else if (player1.bomb > 0) {
                return Constants.MOVE_BOMB;
            } else {
                return Constants.MOVE_RELOAD;
            }
        }
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
            return null;
        }
    }

    /**
     * analyse move response
     */
    function continueGame (moveResult) {
        if (moveResult === Constants.MOVE_KO) {
            logError('hum hum, something went wrong');
            return false;
        } else if (moveResult === Constants.MOVE_DEFEAT) {
            $scope.display.push('[GAME] you\'ve lost bitch');
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
                // display the board data
                $scope.display.push('[BOARD] state ' + board);
                // parse the data to JSON                
                board = JSON.parse(board);
                // should we compute the players names
                if (iMobile.length === 0) {
                    if (board.player1.name === 'iMobile') {
                        iMobile = 'player1';
                        foe = 'player2';
                    } else {
                        iMobile = 'player2';
                        foe = 'player1';
                    }
                }
                // we store the current turn number
                currentTurn = board.nbrActionLeft;
                // get game status
                sendRequest(gameStatusUrl).then(function(status) {
                    // game is running
                    if (status !== null && status) {
                        // can we play
                        if (computeGameStatus(status)) {
                            // retrieve the last foe's move
                            sendRequest(gameLastMove).then(function(lastMove) {
                                $scope.display.push('[GAME] ' + board.player2.name + ' -- lastMove ' + lastMove);
                                enemyPlayedMoves[board.nbrActionLeft] = lastMove;
                                // compute our next move
                                var nextMove = computeNextMove(board, lastMove);
                                $scope.display.push('[GAME] ' + board.player1.name + ' -- nextMove ' + nextMove);
                                var newMoveUrl = angular.copy(makeMoveUrl).replace('@move', nextMove);
                                sendRequest(newMoveUrl).then(function(result) {
                                    // can we continue
                                    var canContinue = continueGame(result);
                                    if (canContinue) {
                                        play();
                                    }
                                });
                            });
                        }
                    // game is over
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
                $scope.display.push(response)

                if (response !== Constants.UNKNOWN) {
                    //game created
                    $scope.gameId = response;
                    //update urls
                    gameBoardUrl = gameBoardUrl.replace('@gameId', $scope.gameId);
                    gameStatusUrl = gameStatusUrl.replace('@gameId', $scope.gameId).replace('@teamId', $scope.teamId);
                    gameLastMove = gameLastMove.replace('@gameId', $scope.gameId).replace('@teamId', $scope.teamId);
                    makeMoveUrl = makeMoveUrl.replace('@gameId', $scope.gameId).replace('@teamId', $scope.teamId);

                } else {
                    //game not created yet
                    $timeout($scope.createGame(), 300);
                }
            }, logError);
        }
    };

    $scope.launchGame = function() {
        // initialize the players identifiers
        iMobile = '';
        foe = '';
        // initializes the turn number
        currentTurn = -1;
        // launch the game
        play();
    };

}]);
