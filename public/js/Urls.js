app.factory('Urls', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        BASE_URL: 'http://www.codeandplay.date',
        DUEL_URL: '/battle-ws/duel',
        PING: BASE_URL + DUEL_URL + '/ping',
        USER: BASE_URL + DUEL_URL + '/player/getIdEquipe/iMOBILE/CeciEstUneRevolution!',

        //vs player
        INIT_PLAYER_GAME: BASE_URL + DUEL_URL + '/versus/next/@teamId',

        //vs bots       
        INIT_BOT_GAME: BASE_URL + DUEL_URL + '/practice/new/@level/@teamId',
        ID_BOT_GAME: BASE_URL + DUEL_URL + '/practice/next/@teamId',

        //Gameplay
        GAME_STATUS: BASE_URL + DUEL_URL + '/game/status/@gameId/@teamId',
        GAME_BOARD: BASE_URL + DUEL_URL + '/game/board/@gameId?format=JSON',
        GAME_LAST_MOVE: BASE_URL + DUEL_URL + '/game/getlastmove/@gameId/@teamId',
        GAME_MAKE_MOVE: BASE_URL + DUEL_URL + '/game/play/@gameId/@teamId/@move'


        //TODO complete urls
    }
}]);