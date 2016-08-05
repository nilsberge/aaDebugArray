(function () {
    'use strict';
    window.aaPixels = [];
    var pixels = window.aaPixels;
    var s = window.s;
    function update(path, len) {
        var lp;
        var count;
        for (lp = 0; lp < len; lp+=1) {
            count = lp > 0 ? '_' + lp : '';
            pixels.push(decodeURIComponent(window[path + count].getAttribute('src')));
        }
    }
    if (s) {
        if (window.AppMeasurement) {
            update('s_i_' + s.account, s._in);
        } else {
            update('s_i_' + (s._in ? s._in + '_' : '') + s.visitorNamespace, s.rc ? s.rc[s.visitorNamespace] : 0);
        }
    }
}
    ());
