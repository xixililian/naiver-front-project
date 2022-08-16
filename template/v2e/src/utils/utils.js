// 字符串的连字符转换成驼峰
String.prototype.toCamel = function () {
    return this.replace(/([A-Za-z0-9]*)[-,_]([A-Za-z0-9]*)/g, function(_, left, right) {
        return left + right[0].toUpperCase() + right.slice(1)
    })
}

// 字符串的连字符转换成驼峰
String.prototype.toHyphen = function (hy = "-") {
    return this.replace(/([a-z0-9]*)([A-Z])/g, function(_, left, right) {
        return left + hy + right.toLowerCase()
    })
}

// 给富文本数据（String）里面的图片链接加上域名
export function addHostTOImgStr(str, host) {
    // console.log("用户匹配的字符串", str)
    const reg = /<img [^>]*src=['"]([^'"]+)[^>]*>/g;
    const list = str.match(reg);
    // console.log("匹配到的图片", list)
    list && list.forEach(imgstr => {
        const src = imgstr.replace(reg, "$1");
        // console.log("获取到的图片链接", src)
        if (!src.startsWith("http")) {
            str = str.replace(new RegExp(src, "g"), host + src)
        }
    })
    return str;
}
String.prototype.addHostToImg = function (host) {
    return addHostTOImgStr(this, host)
}

// 去掉富文本数据（String）里面的图片链接的域名
export function removeHostFromImgStr(str, host) {
    if (host) {
        if (host.endsWith("/")) host = host.slice(0, -1);
    } else host = `http(s)?://[^'"/]+`

    const reg = new RegExp(`<img [^>]*src=['"](${host})[/'"][^>]*>`, "g");
    // console.log("应该是正则表达式", typeof reg, reg);
    const list = str.match(reg);
    // console.log("匹配到的链接含域名的图片", list)
    list && list.forEach(imgstr => {
        const _host = imgstr.replace(reg, "$1");
        str = str.replace(imgstr, imgstr.replace(_host, ""))
    })
    return str;
}
String.prototype.removeImgHost = function (host) {
    return removeHostFromImgStr(this, host)
}

/**
 * extract 增强了 Array.prototype.filter，它额外的返
 * 回了后者未匹配的元素数组
 * @param {Funtion} fn filter判断函数
 * @returns {Object} {
 *    extractive: 符合条件的元素数组
 *    rest: 不符合条件的元素数组
 * }
 */
Array.prototype.extract = function (fn) {
    const extractive = this.filter(fn);
    const rest = this.filter(item => !fn(item));

    return {extractive, rest}
}