app.factory('Urls', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        BASE_URL: 'http://www.codeandplay.date',
        PING: '/test-ws/ping',
        USER: '/test-ws/player/getIdEquipe/iMOBILE',

        //vs player
        INIT_PLAYER_GAME: '/test-ws/versus/next/@teamId',

        //vs bots       
        INIT_BOT_GAME: '/test-ws/practice/new/@level/@teamId',
        ID_BOT_GAME: '/test-ws/practice/next/@teamId',

        //Gameplay
        GAME_STATUS: '/test-ws/game/status/@idPartie/@idEquipe',
        GAME_BOARD: '/test-ws/game/board/@idPartie',
        GAME_LAST_MOVE: '/test-ws/game/getlastmove/@idPartie',
        GAME_MAKE_MOVE: '/test-ws/game/play/@idPartie/@idEquipe/@coordX/@coordY'


        //TODO complete urls
    }
}]);