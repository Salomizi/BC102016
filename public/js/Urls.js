app.factory('Urls', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        BASE_URL: 'http://www.codeandplay.date',
        PING: '/battle-ws/duel/ping',
        USER: '/battle-ws/duel/player/getIdEquipe/iMOBILE/CeciEstUneRevolution!',

        //vs player
        INIT_PLAYER_GAME: '/battle-ws/duel/versus/next/iMOBILE',

        //vs bots       
        INIT_BOT_GAME: '/battle-ws/duel/practice/new/@level/iMOBILE',
        ID_BOT_GAME: '/battle-ws/duel/practice/next/iMOBILE',

        //Gameplay
        GAME_STATUS: '/battle-ws/duel/game/status/@idPartie/iMOBILE',
        GAME_BOARD: '/battle-ws/duel/game/board/@idPartie',
        GAME_LAST_MOVE: '/battle-ws/duel/game/getlastmove/@idPartie',
        GAME_MAKE_MOVE: '/battle-ws/duel/game/play/@idPartie/iMOBILE/@move'


        //TODO complete urls
    }
}]);