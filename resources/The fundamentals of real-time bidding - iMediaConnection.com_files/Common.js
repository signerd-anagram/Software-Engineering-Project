
var urlParams = {};
(function () {
    var e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&=]+)=?([^&]*)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                q = window.location.search.substring(1);

    while (e = r.exec(q)){
        urlParams[d(e[1])] = d(e[2]);
        }
})();

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results === null){
        return "";
    }else{
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

function NavigateTo(sender, url) {
    if (url !== null && url != undefined) {
        if (window.location) {
            window.location.href = url;
        } else if (window.navigate) {
            window.navigate(url);
        } else if (document.href) {
            document.href = HTTP/1.1 502 Bad Gateway

ERRORtion NavMouseOut(div) {
    NavMouseOutColor(div, '');
}

function NavMouseOutColor(div, color) {
    if (div !== null && div != undefined) {
        if (div.style) {
            div.style.backgroundColor = color;
        }
    }
}

function NavMouseOver(div) {
    if (div !== null && div != undefined) {
        if (div.style){
            div.style.backgroundColor = '#DDDDDD';
        }
    }
}

function NavMouseOverColor(div, color) {
    if (div !== null && div != undefined) {
        if (div.style){
            div.style.backgroundColor = color;
        }
    }
}

function relative_time(time_value) {
    var values = time_value.split(" ");
    time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    delta = delta + (relative_to.getTimezoneOffset() * 60);

    if (delta < 60) {
        return 'less than a minute ago';
    } else if (delta < 120) {
        return 'about a minute ago';
    } else if (delta < (60 * 60)) {
        return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if (delta < (120 * 60)) {
        return 'about an hour ago';
    } else if (delta < (24 * 60 * 60)) {
        return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if (delta < (48 * 60 * 60)) {
        return '1 day ago';
    } else {
        return (parseInt(delta / 86400)).toString() + ' days ago';
    }
}

function setCookie(c_name, c_value, c_expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + c_expiredays);
    document.cookie = c_name + "=" + escape(c_value) +
    ((c_expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

if (typeof String.prototype.trimLeft !== "function") {
    String.prototype.trimLeft = function () {
        return this.replace(/^\s+/, "");
    };
}
if (typeof String.prototype.trimRight !== "function") {
    String.prototype.trimRight = function () {
        return this.replace(/\s+$/, "");
    };
}
if (typeof Array.prototype.map !== "function") {
    Array.prototype.map = function (callback, thisArg) {
        for (var i = 0, n = this.length, a = []; i < n; i++) {
            if (i in this) a[i] = callback.call(thisArg, this[i]);
        }
        return a;
    };
}

function getCookies() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function (cookie) {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0].trimLeft()),
                value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
            cookies[name] = value;
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function ($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}
function getCookie(name) {
    return getCookies()[name];
}

function are_cookies_enabled() {
    var cookieEnabled = false;
    cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (cookieEnabled == true) {
        jQuery.cookie("testcookie", "1", { expires: 3 });
        cookieEnabled = (jQuery.cookie("testcookie") == 1) ? true : false;
    }

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        jQuery.cookie("testcookie", "1", { expires: 3 });
        cookieEnabled = (jQuery.cookie("testcookie") == 1) ? true : false;
    }
    return (cookieEnabled);
}