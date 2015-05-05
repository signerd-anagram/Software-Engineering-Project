(function() {
    if (window.InfusionIframeMagicServer) { return; }

    var idRE = /infFormId=(\d+)/;
    var searchStr = window.name + '';
    var idResult = searchStr.match(idRE);
    var id;
    var prefix = "infform";

    var RE_POST_DELAY = 200;

    var regexS = "[\\?&]referrer=([^&#]*)";
    var regex = new RegExp(regexS);
    var location = window.location.href;
    var results = regex.exec(location);
    var referrer;
    if (results == null) {
        referrer = location;
    } else {
        referrer = results[1];
    }

    window.InfusionIframeMagicServer = {};
    InfusionIframeMagicServer.resizeFrame = resizeFrame;

    if (idResult) {
        id = idResult[1];
        if (id && (parent != window)) {
            jQuery(window).load(function() {
                resizeFrame();

                setInterval(function() {
                    resizeFrame();
                }, RE_POST_DELAY);
            });
        }
    }

    function resizeFrame() {
        var $bodyContainer = jQuery(".bodyContainer");
        var borderTop = parseInt($bodyContainer.css("border-top-width"));
        var borderBottom = parseInt($bodyContainer.css("border-bottom-width"));
        var height = $bodyContainer.height() + borderTop + borderBottom + 20;
        if (isNaN(borderTop) && isNaN(borderBottom)) {
            height = $bodyContainer.height() + 20;
        } else {
            height = height + borderTop + borderBottom;
        }
        var width = jQuery("#mainContent").width();
        if (startsWith(referrer, "file")) {
            width -= 15;
        } else {
            width += 30;
        }

        var messageToSend = prefix + '_id' + id + '_h' + height + '_w' + width;
        sendPostMessage(messageToSend, height);
    }

    function sendPostMessage(message, height) {
        if (jQuery(window).height() != height) {
            window.parent.postMessage(message, '*');
        }
    }

    function startsWith(str, pattern) {
        if (str == null || pattern == null) return false;
        return str.length >= pattern.length && str.toLowerCase().indexOf(pattern.toLowerCase()) == 0;
    }

})();