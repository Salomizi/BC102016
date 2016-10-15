app.factory('Urls', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        BASE_URL: 'http://www.codeandplay.date',
        PING: '/battle-ws/duel/ping',
        USER: '/battle-ws/duel/player/getIdEquipe/iMOBILE/CeciEstUneRevolution!',

        //vs player
        INIT_PLAYER_GAME: '/battle-ws/duel/versus/next/@teamId',

        //vs bots       
        INIT_BOT_GAME: '/battle-ws/duel/practice/new/@level/@teamId',
        ID_BOT_GAME: '/battle-ws/duel/practice/next/@teamId',

        //Gameplay
        GAME_STATUS: '/battle-ws/duel/game/status/@gameId/@teamId',
        GAME_BOARD: '/battle-ws/duel/game/board/@gameId?format=JSON',
        GAME_LAST_MOVE: '/battle-ws/duel/game/getlastmove/@gameId/@teamId',
        GAME_MAKE_MOVE: '/battle-ws/duel/game/play/@gameId/@teamId/@move'


        //TODO complete urls
    }
}]);