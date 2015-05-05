Infusion("Content", function() {

    var ns = Infusion.Content;

    ns.notice = notice;
    ns.toast = toast;

    if(window.QUnitTestSuite) {
        ns.testExposed = function() {
            log.on(); log.info("Hey thar!! I am exposed in the test environment!!!");
        }
    }

    function notice(options) {
        var multipleOk = Infusion.Utils.useDefaultIfNotDefined(options.multipleOk, true);
        var type = options.type || "success";
        var fade = options.fade || "slow";
        var duration = options.duration || 2000;
        var message = options.message || "default message about funny monkeys";
        var prepend = options.prepend || false; /* Prepend to targetSpan instead of append */
        var targetSpan =  options.targetSpan || "noticeSpan";
        var $noticeSpan = jQuery("#" + targetSpan);
        var $noticeDiv = jQuery("<div></div>").addClass("alert-message").addClass("block-notice-div").addClass(type).html(message);

        if (multipleOk || $noticeSpan.children().length == 0) {
            if (prepend) {
                $noticeSpan.prepend($noticeDiv);
            } else {
                $noticeSpan.append($noticeDiv);
            }

            $noticeDiv.fadeIn(fade, function() {
                setTimeout(function() {
                    $noticeDiv.fadeOut(fade, function() {
                        $noticeDiv.remove();
                    });
                }, duration)
            });
        }
    }

    function toast(options) {
        var text = options.text || "default message about unicorns";
        var fade = options.fade || "slow";
        var type = options.type || "success";
        var duration = options.duration || 2000;
        var width = options.width || "700px";
        var $div = jQuery("<div></div>").
            text(text).
            attr("id", "notice").
            addClass("alert-message").addClass("block-notice-div").addClass(type).
            css("position", "absolute").
            css("width", width).
            css("top", "50%").
            css("left", "50%").
            css("margin-top", -9 + jQuery(window).scrollTop() + "px").
            css("margin-left", "-300px").
            css("display", "none").
            css("z-index", "100").
            css("text-align", "center");

        jQuery("body").append($div);

        $div.fadeIn(fade, function() {
            setTimeout(function() {
                $div.fadeOut(fade, function() {
                    $div.remove();
                });
            }, duration)
        });
    }
});