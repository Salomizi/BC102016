app.factory('Constants', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
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
        MOVE_BOMB: 'BOMB'
    }
}]);