/**
 * ios	    iOS微信（包含 iPhone、iPad）
 * android	Android微信
 * windows	Windows微信
 * mac	    macOS微信
 * devtools	微信开发者工具
 */
// const { platform } = wx.getSystemInfoSync();

const baseURL = {
    url: "https://testasp.jindingaus.com",
    // url: "https://ausshop.jindingaus.com/admin",
    get assets () {
        return this.url + "/wxAppFile"
    },
    get images () {
        return this.assets + "/images"
    },
    valueOf  () {
        return this.url;
    },
    toString () {
        return this.url;
    }
};

module.exports = baseURL;