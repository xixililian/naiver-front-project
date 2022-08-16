/**
 * 初始化一些常用方法
 * String.prototype.addHostToImg  给富文本串里的图片加上基础 url
 * String.prototype.removeImgHost 去掉富文本串的图片的基础 url
 * String.prototype.byteLength    按获取文本的字节长度
 * String.prototype.sliceByte     按字节长度截取文本的头部字符
 */

const baseURL = require("../request/baseURL");

String.prototype.addHostToImg = function (host = baseURL.images) {
    const str = this;
    const reg = /<img [^>]*src=['"]([^'"]+)[^>]*>/g;
    const list = str.match(reg);
    list && list.forEach(imgstr => {
        const src = imgstr.replace(reg, "$1");
        if (!src.startsWith("http")) {
            str = str.replace(new RegExp(src, "g"), host + src)
        }
    })
    return str;
}

String.prototype.removeImgHost = function (host = baseURL.images) {
    const str = this;
    if (host) {
        if (host.endsWith("/")) host = host.slice(0, -1);
    } else host = `http(s)?://[^'"/]+`

    const reg = new RegExp(`<img [^>]*src=['"](${host})[/'"][^>]*>`, "g");
    const list = str.match(reg);
    list && list.forEach(imgstr => {
        const _host = imgstr.replace(reg, "$1");
        str = str.replace(imgstr, imgstr.replace(_host, ""))
    })
    return str;
}

String.prototype.byteLength = function () {
    var b = 0, l = this.length;
    if (l) {
        for (var i = 0; i < l; i++) {
            if (this.charCodeAt(i) > 255) {
                b += 2;
            } else {
                b++;
            }
        }
        return b;
    } else {
        return 0;
    }
}

String.prototype.sliceByte = function (num = 8) {
    if (this.byteLength <= 8) return this;
    var b = 0, l = this.length;
    for (var i = 0; i < l; i++) {
        if (this.charCodeAt(i) > 255) {
            b += 2;
        } else {
            b++;
        }
        if (b === num) return this.slice(0, i);
        else if (b > num) return this.slice(0, i - 1)
    }
    return b;
}