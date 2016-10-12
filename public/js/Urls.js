angular.module('config', []).factory('Urls', [function() {
    return {
        BASE_URL: 'http://www.codeandplay.date',
        PING: '/test-ws/ping',
        USER: '/test-ws/player/getIdEquipe/@teamName/@password',

        //vs player
        INIT_PLAYER_GAME: '/test-ws/versus/next/@teamId',

        //vs bots       
        INIT_BOT_GAME: '/test-ws/practice/new/@level/@teamId',

        ID_GAME: '/test-ws/practice/next/@teamId'


        //TODO complete urls
    }
}]);