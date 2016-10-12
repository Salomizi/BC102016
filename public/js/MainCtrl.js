// Creates the MainCtrl Module and Controller.
angular.module('mainModule', []).controller('MainCtrl', ['$scope', '$window', '$http', '$log', 'Urls', function($scope, $window, $http, $log, Urls) {
    $log.log('hello biach');

    var pingUrl = Urls.BASE_URL + Urls.PING;
    $http.get(pingUrl).then(function(response) {
        $log.log(response.data);
    }, function(error) {
        $log.log(error);
    });
}]);
