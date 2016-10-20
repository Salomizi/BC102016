// Creates the MainCtrl Module and Controller.
app.controller('MainCtrl', [
    '$scope', '$window', '$http', '$q', '$timeout', 'Urls', 'Constants', '$location', '$anchorScroll', 
    function($scope, $window, $http, $q, $timeout, Urls, Constants, $location, $anchorScroll) {
    
        var pingUrl = Urls.PING;
        var teamIdUrl = Urls.USER;
        var createBotGameUrl = Urls.INIT_BOT_GAME;
        var createVersusGameUrl = Urls.INIT_PLAYER_GAME;
        var gameStatusUrl = Urls.GAME_STATUS;
        var gameBoardUrl = Urls.GAME_BOARD;
        var gameLastMove = Urls.GAME_LAST_MOVE;
        var makeMoveUrl = Urls.GAME_MAKE_MOVE;

        var gameUrl;
        
        //max persos choisis
        var maxCharactersChosen = 3;
        var numberCharactersChosen = 0;


        //GAME variables
        $scope.teamId = null;
        $scope.gameId = null;
        $scope.botLevel = null;
        $scope.display = [];
        
        var iMOBILE = '';
        var foe = '';
        var enemyPlayedMoves = {};
        var currentTurn = -1;
        var currentActionNumber = -1;
        var staticUpperBound = 100;

        //game variables
        var mustCoverBomb = false;
        var launchedBomb = false;
        var aimed = null;

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
         * brute try to see if the foe covers evertime we aim
         */
        function forceFoeToCover (foe, foeLastMove) {
            if (foeLastMove === Constants.MOVE_COVER && foe.shield > 0) {
                return true;
            } else {
                aimed = false;
                return false;
            }
        }

        /**
         * analyse if we are in danger
         * @return number of cover we need to take
         */
        function inDanger (iMobile, foeLastMove) {
            var dangerousSituation = false;
            var minShieldToCoverBomb = 3;
            var maxCumulatedCover = 2;

            if (iMobile.shield === 0) {
                mustCoverBomb = false;
                return false;
            }

            var foeLaunchedBomb = foeLastMove === Constants.MOVE_BOMB;
            var bombLaunchFailed = launchedBomb && foeLastMove === Constants.MOVE_SHOOT;
            launchedBomb = false;

            if (mustCoverBomb) {
                //must cover
                dangerousSituation = true;
                mustCoverBomb = false;
            }
            
            if (foeLaunchedBomb || bombLaunchFailed) {
                if (iMobile.shield > minShieldToCoverBomb + 1) {
                    //cover at T+1 and T+2
                    mustCoverBomb = true;
                    dangerousSituation = true;
                } else {
                    //will only cover at T+2 to minimize strike
                    mustCoverBomb = true;
                    dangerousSituation = false;
                }
            } else if (foeLastMove === Constants.MOVE_AIM && iMobile.cumulatedCovers < maxCumulatedCover) {
                //random choice to cover or not when aimed
                if (generateRandomNumber(2) === 1) {
                    dangerousSituation = false;
                } else {
                    dangerousSituation = true;
                }
            }

            return dangerousSituation;
        }

        /**
         * analyse game board and last opponent's move
         * @return move to make
         */
        function computeNextMove (board, foeLastMove) {
            var iMobile = iMOBILE;
            var them = foe;
            var fightersObj = iMOBILE.fighters;
            var fighters = _.mapKeys(fightersObj, function(fighter) {
                return fighter.fighterClass;
            });
            var PRIEST = fighters['PRIEST'];
            var CHAMAN = fighters['CHAMAN'];
            var ORC = fighters['ORC'];
            var randomChoice;

            var priestMove = PRIEST.orderNumberInTeam;
            var chamanMove = CHAMAN.orderNumberInTeam;
            var orcMove = ORC.orderNumberInTeam;

            priestMove = priestMove + 
            chamanMove = chamanMove + 
            orcMove = orcMove + 



            if (aimed) {
                //check if foe fell in the trap
                var shouldAimAgain = forceFoeToCover(them, foeLastMove);
                if (shouldAimAgain) {
                    //he did, let's aim again to see if it is real
                    return Constants.MOVE_AIM;
                }
            }

            var inPotentialDanger = inDanger(iMobile, foeLastMove);
            if (inPotentialDanger) {
                return Constants.MOVE_COVER;
            }

            if (iMobile.bullet !== 0) {
                if (them.health === 1) {
                    //finish him !
                    return Constants.MOVE_SHOOT;
                }

                if (iMobile.focused) {
                    //if we aimed, we must shoot
                    return Constants.MOVE_SHOOT;
                } else {
                    //random choice of action -> choice between 2 numbers
                    randomChoice = generateRandomNumber(staticUpperBound);
                    if (_.inRange(randomChoice, 0, staticUpperBound * 0.41)) {
                        if (aimed === null && board.nbrActionLeft !== Constants.GAME_ACTIONS_COUNT) {
                            //try the brute force strategy
                            aimed = true;
                        }
                        return Constants.MOVE_AIM;
                    } else if (_.inRange(randomChoice, staticUpperBound * 0.41, staticUpperBound * 0.71)) {
                        return Constants.MOVE_SHOOT;
                    } else if (iMobile.bomb > 0) {
                        launchedBomb = true;
                        return Constants.MOVE_BOMB;
                    } else {
                        return Constants.MOVE_SHOOT;
                    }
                }     
            } else if (them.health === 1) {
                //try a final strike
                return Constants.MOVE_RELOAD;
            } else {
                //random choice of action
                randomChoice = generateRandomNumber(staticUpperBound);
                if (_.inRange(randomChoice, 0, staticUpperBound * 0.71)) {
                    return Constants.MOVE_RELOAD;
                } else if (iMobile.bomb > 0) {
                    launchedBomb = true;
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

                    //choose characters
                    if (board.nbrTurnsLeft > 50) {
                        chooseCharacter();
                    } else {
                        // should we compute the players names
                        if (board.playerBoards[0].playerName === 'iMOBILE') {
                            iMOBILE = board.playerBoards[0];
                            foe = board.playerBoards[1];
                        } else {
                            iMOBILE = board.playerBoards[1];
                            foe = board.playerBoards[0];
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
                                } else {
                                    gameOver = true;
                                    $scope.gameId = null;
                                }
                            // game is over
                            } else {
                                gameOver = true;
                                $scope.gameId = null;
                            }
                        });
                    }
                });
            }
        }

        /**
         * create new game
         */
        function createGame() {
            sendRequest(gameUrl).then(function(response) {
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
        $scope.getTeamId();

        /**
         * creates a bot game
         */
        $scope.createBotGame = function() {
            if ($scope.teamId && $scope.botLevel) {
                gameUrl = createBotGameUrl.replace('@level', $scope.botLevel).replace('@teamId', $scope.teamId);
                createGame();
            }
        };

        /**
         * creates versus game
         */
        $scope.createVersusGame = function() {
            if ($scope.teamId) {
                gameUrl = createVersusGameUrl.replace('@teamId', $scope.teamId);
                createGame();
            }
        };

        $scope.launchGame = function() {
            // initialize the players identifiers
            iMobile = '';
            foe = '';
            // initializes the turn number
            currentTurn = -1;
            // sets game over to false
            gameOver = false;
            // launch the game
            play();
        };

        // autoscroll to the bottom of the list
        $scope.$watch('display', 
            function() {
                $location.hash('bottom');
                $anchorScroll();
            }
        , true);

        $scope.lineColor = function(line) {
            if (line.indexOf('[BOARD]') !== -1) {
                return {
                    color: '#01d'
                };
            } else {
                return {
                    color: '#d00'
                };
            }
        }
    }
]);
