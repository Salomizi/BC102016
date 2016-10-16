app.factory('Constants', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        GAME_ACTIONS_COUNT: 30,

        UNKNOWN: 'NA',

        STATUS_YES: 'CANPLAY',
        STATUS_NO: 'CANTPLAY',
        STATUS_WIN: 'VICTORY',
        STATUS_LOST: 'DEFEAT',
        STATUS_CANCEL: 'CANCELLED',

        MOVE_OK: 'OK',
        MOVE_KO: 'FORBIDDEN',
        MOVE_DEFEAT: 'GAMEOVER',
        MOVE_NOT_YOUR_TURN: 'NOTYET',

        //MOVES
        MOVE_SHOOT: 'SHOOT',
        MOVE_RELOAD: 'RELOAD',
        MOVE_COVER: 'COVER',
        MOVE_AIM: 'AIM',
        MOVE_BOMB: 'BOMB',

        //EQUIPMENT
        SHIELD: 7,
        BOMB: 2




        //EX BOARD//
        /*EX_BOARD: {
            "nbrActionLeft":30,
            "player1": 
                {"name":"iMOBILE","health":10,"bullet":1,"shield":7,"bomb":2,"focused":false,"cumulatedCovers":0},
            "player2":
                {"name":"Tank","health":10,"bullet":1,"shield":7,"bomb":2,"focused":false,"cumulatedCovers":0}
        }*/

        //test id
        // 6db65c88-2a97-4b9e-a02e-26e525921a4f

    }
}]);