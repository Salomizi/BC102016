angular.module('config', []).factory('Urls', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        BASE_URL: 'http://www.codeandplay.date',
        PING: '/test-ws/ping',
        USER: '/test-ws/player/getIdEquipe/iMOBILE',

        //vs player
        INIT_PLAYER_GAME: '/test-ws/versus/next/@teamId',

        //vs bots       
        INIT_BOT_GAME: '/test-ws/practice/new/@level/@teamId',

        ID_GAME: '/test-ws/practice/next/@teamId'


        //TODO complete urls
    }
}]);