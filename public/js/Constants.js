app.factory('Constants', [function() {

    ///////INFO AT http://codeandplay.date/public/api.html /////////////////////////

    return {
        UNKNOWN: 'NA',

        STATUS_YES: 'OUI',
        STATUS_NO: 'NON',
        STATUS_WIN: 'GAGNE',
        STATUS_LOST: 'PERDU',
        STATUS_CANCEL: 'ANNULE',

        MOVE_OK: 'OK',
        MOVE_KO: 'KO',
        MOVE_WIN: 'GAGNE',
        MOVE_NOT_YOUR_TURN: 'PTT'
    }
}]);