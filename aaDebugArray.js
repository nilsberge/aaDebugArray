(function () {
    'use strict';
    function updateRequestsForDebug() {
        window.aaDebugArray = window.aaDebugArray || [];
        var aaDebugArray = window.aaDebugArray;
        var s = window.s;

        function update(path, len) {
            var lp;
            var count;
            var sourceObj;
            var reqSrc;
            function getAttr(attr) {
                return this[attr];
            }
            for (lp = 0; lp < len; lp += 1) {
                // checks for all requests up to current count with each call to this function (delete below should ensure few loops)
                count = lp > 0 ? '_' + lp : '';
                sourceObj = window[path + count];
                if (sourceObj) {
                    if (sourceObj.getAttribute) {
                        reqSrc = sourceObj.getAttribute('src');
                    } else {
                        if (sourceObj.responseURL) {
                            reqSrc = s.kb;
                        }
                    }
                    if (reqSrc) {
                        if (aaDebugArray.indexOf(reqSrc) < 0) {
                            aaDebugArray.push(reqSrc);
                            window['s_i_DEBUG_' + aaDebugArray.length] = {
                                src: reqSrc,
                                getAttribute: getAttr
                            };
                            // delete original request property to avoid duplicates in standard debugger
                            delete window[path + count];
                        }
                    }
                }
            }
        }

        if (s) {
            var reqCounter = s.rc ? s.rc[s.visitorNamespace] : 0;
            var a161Prefix = 's_i_' + (s.account && s.account.replace(/,/g, '_'));
            var h254Prefix = 's_i_' + (s._in ? s._in + '_' : '') + s.visitorNamespace;
            var h275Prefix = 's_i_' + (s._in !== undefined ? s._in + '_' : '') + s.visitorNamespace;

            if (window.AppMeasurement) {
                update(a161Prefix, s._in);
            } else {
                if (window[h254Prefix + (reqCounter > 1 ? '_' + (reqCounter - 1) : '')]) {
                    update(h254Prefix, reqCounter);
                } else {
                    update(h275Prefix, reqCounter);
                }
            }
        }
        return aaDebugArray;
    }

    // update immediately in s_code
    updateRequestsForDebug();
    window.scode_doPlugins = window.scode_doPlugins || [];
    window.scode_doPlugins.push(function () {
        // update inside doPlugins before current call is sent
        updateRequestsForDebug();
        // delayed trigger inside doPlugins, to collect the current call after sending
        setTimeout(updateRequestsForDebug, 1000);
    });
}
    ());
