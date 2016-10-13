app.factory('Urls', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        BASE_URL: 'http://www.codeandplay.date',
        PING: '/battle-ws/ping',
        USER: '/battle-ws/player/getIdEquipe/iMOBILE/CeciEstUneRevolution!',

        //vs player
        INIT_PLAYER_GAME: '/battle-ws/versus/next/@teamId',

        //vs bots       
        INIT_BOT_GAME: '/battle-ws/practice/new/@level/@teamId',
        ID_BOT_GAME: '/battle-ws/practice/next/@teamId',

        //Gameplay
        GAME_STATUS: '/battle-ws/game/status/@idPartie/@idEquipe',
        GAME_BOARD: '/battle-ws/game/board/@idPartie',
        GAME_LAST_MOVE: '/battle-ws/game/getlastmove/@idPartie',
        GAME_MAKE_MOVE: '/battle-ws/game/play/@idPartie/@idEquipe/@move'


        //TODO complete urls
    }
}]);