app.factory('Constants', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        GAME_ACTIONS_COUNT: 30,

        UNKNOWN: 'NA',

        STATUS_YES: 'CANPLAY',
        STATUS_NO: 'CANTPLAY',
        STATUS_WIN: 'VICTORY',
        STATUS_LOST: 'DEFEAT',
        STATUS_DRAW: 'DRAW',
        STATUS_CANCEL: 'CANCELLED',

        MOVE_OK: 'OK',
        MOVE_KO: 'FORBIDDEN',
        MOVE_DEFEAT: 'GAMEOVER',
        MOVE_NOT_YOUR_TURN: 'NOTYET',

        //HEROES
        HERO_ARCHER: 'ARCHER',
        HERO_CHAMAN: 'CHAMAN',
        HERO_GUARD: 'GUARD',
        HERO_ORC: 'ORC',
        HERO_PALADIN: 'PALADIN',
        HERO_PRIEST: 'PRIEST',

        //MOVES
        MOVE_ATTACK: 'ATTACK',
        MOVE_CHARGE: 'CHARGE',
        MOVE_CLEANSE: 'CLEANSE',
        MOVE_DEFEND: 'DEFEND',
        MOVE_FIREBOLT: 'FIREBOLT',
        MOVE_YELL: 'YELL',
        MOVE_HEAL: 'HEAL',
        MOVE_PROTECT: 'PROTECT',
        MOVE_REST: 'REST',

        //EQUIPMENT
        SHIELD: 7,
        BOMB: 2




        //EX BOARD//
        //{"playerBoards":[{"playerId":"0","playerName":"iMOBILE","fighters":null},{"playerId":"1","playerName":"Dr B. Gaius","fighters":null}],"nbrTurnsLeft":53,"playerMoves":null}

        //test id
        // 6db65c88-2a97-4b9e-a02e-26e525921a4f

    }
}]);