angular.module('starter.services', [])

.factory('Locales', function() {

    var locales = [{
        id: 0,
        name: '39º27N',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/logo39.jpg'
    }, {
        id: 1,
        name: '48',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/logo48.jpg'
    }, {
        id: 2,
        name: 'ANIMAS',
        tipo: 'Discoteca',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/animas.jpg'
    }, {
        id: 3,
        name: 'BAGOAS',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/48.jpg'
    }, {
        id: 4,
        name: 'BFORE CLUB',
        tipo: 'Copas',
        direccion: 'Calle falsa 123, Valencia',
        logo: 'img/bfore.jpg'
    }, {
        id: 5,
        name: 'CONDADO CLUB',
        tipo: 'Discoteca',
        direccion: 'Calle Marques de campo 12, Denia',
        logo: 'img/condado.jpg'
    }];

    return {
        all: function() {
            return locales;
        },
        remove: function(local) {
            locales.splice(locales.indexOf(local), 1);
        },
        get: function(id_local) {
            for (var i = 0; i < locales.length; i++) {
                if (locales[i].id === parseInt(id_local)) {
                    return locales[i];
                }
            }
        return null;
        }
    };
})

.factory('Feeds', function($http){
    var subscriptions = [];
    var server = "http://127.0.0.1:3000";
    return {
        all: function($scope) {
            $http.get(server + "/feed/list").success(function(data) {
                //修改icon大小为32
                data.subscriptions.forEach(function(item, i){
                    item.iconUrl = item.iconUrl.replace(/16/g, "32");
                    item.id = base64encode(item.id);
                });
                subscriptions = data.subscriptions;
                $scope.subscriptions = subscriptions
                console.log(subscriptions);
                return subscriptions;
            });               
        },
        get: function($scope, id) {
            console.log("get " + id);
            id = encodeURIComponent(base64decode(id));
            console.log(id);
             $http.get(server + "/feed/" + id).success(function(data) {
                console.log(data);
            });                
        }
    }
});

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str){
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

/**
 * base64解码
 * @param {Object} str
 */
function base64decode(str){
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1) 
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1) 
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) 
                return out;
            c3 = base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1) 
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) 
                return out;
            c4 = base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1) 
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}