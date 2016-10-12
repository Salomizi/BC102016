// Creates the MainCtrl Module and Controller.
app.controller('MainCtrl', ['$scope', '$window', '$http', '$log', 'Urls', 'Constants', function($scope, $window, $http, $log, Urls, Constants) {
    $log.log('hello biach');

    var pingUrl = Urls.BASE_URL + Urls.PING;

    //only for tests
    var teamPassword = '/iMOBILE';

    var teamIdUrl = Urls.BASE_URL + Urls.USER + teamPassword;
    var teamId;

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
     * retrieve teamId
     */
    $scope.getTeamId = function () {
        if (!teamId) {
            $http.get(teamIdUrl).then(function(response) {
                $log.log(response.data);
                teamId = response.data;
            }, function(error) {
                $log.log(error);
            });
        }
    };

}]);
