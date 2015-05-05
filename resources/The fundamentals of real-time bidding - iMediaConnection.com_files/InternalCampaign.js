var InternalCampagin = {
    //
    ProcessReferences: function (arr_a, code) {
        arr_a.click(function () {

            InternalCampagin.AddTrackingCode(this, code);
        });
    },
    //
    AddTrackingCode: function (a, code) {
        if (!a || !a.href) { return; }

        var concat = '&';
        if (a.href.indexOf("ad-tech.com") >= 0 || a.href.indexOf("xpressreg.net") >= 0) {
            if (a.href.indexOf("ref=") >= 0) { return; }
            concat = (a.href.lastIndexOf('?') >= 0) ? '&' : '?';
            a.href += concat + "ref=IMCPROMO";
            return;
        }

        if (a.href.indexOf("imcid=") >= 0) { return; }
        concat = (a.href.lastIndexOf('?') >= 0) ? '&' : '?';
        a.href += concat + "imcid=" + code;
    }
}
