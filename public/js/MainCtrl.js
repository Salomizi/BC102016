// Creates the MainCtrl Module and Controller.
app.controller('MainCtrl', ['$scope', '$window', '$http', '$log', '$timeout', 'Urls', 'Constants', function($scope, $window, $http, $log, $timeout, Urls, Constants) {
    $log.log('hello biach');

    var pingUrl = Urls.BASE_URL + Urls.PING;
    var createBotGameUrl = Urls.BASE_URL + Urls.INIT_BOT_GAME;
    //only for tests
    var teamPassword = '/iMOBILE';
    var teamIdUrl = Urls.BASE_URL + Urls.USER + teamPassword;

    //GAME variables
    var teamId;
    var botGameId;

    /**
     * test ping -> response = pong
     */
    function testPing () {
        $http.get(pingUrl).then(function(response) {
            $log.log(response.data);
        }, function(error) {
            $log.log(error);
        });
    }

    /**
     * generic http call
     */
    function sendRequest (url) {
        return $http.get(url);
    }

    /**
     * generic error handling
     */
    function logError (error) {
        $log.error(error);
    }

    /**
     * retrieve teamId
     */
    $scope.getTeamId = function () {
        if (!teamId) {
           sendRequest(teamIdUrl).then(function(response) {
                $log.log(response.data);
                teamId = response.data;
            }, logError);
        }
    };

    /**
     * create new bot game
     */
    var level = 1;
    $scope.createGame = function() {
        if (teamId) {
            createBotGameUrl = createBotGameUrl.replace('@level', level).replace('@teamId', teamId);
            sendRequest(createBotGameUrl).then(function(response) {
                var data = response.data;
                $log.log(data);

                if (data !== Constants.UNKNOWN) {
                    //game created
                    botGameId = data;
                } else {
                    //game not created yet
                    $timeout($scope.createGame(), 200);
                }
            }, logError);
        }
    };

}]);
