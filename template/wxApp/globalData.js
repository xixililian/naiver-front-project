/**
 * globalData: 
        agree        已经同意用户协议
        session      登录相关的数据 code\openId\unionId 等
        userInfo     当前用户的信息
        openId       当前客户端的openid（只读）
        searchState  列表页的查询参数
 */

class GlobalData {
    _searchState = {}
    constructor () {
        let agree    = wx.getStorageSync('agree');
        let session  = wx.getStorageSync('session');
        let userInfo = wx.getStorageSync('userInfo');
        
        this._agree    = agree    || false
        this._session  = session  || {};
        this._userInfo = userInfo || {};
    }


    get agree       () { return this._agree }
    get session     () { return this._session }
    get openId      () { return this._session.openid || "" }
    get userInfo    () { return this._userInfo }
    get searchState () { return this._searchState }

    /**
     * 更新agree
     */
    set agree (val) {
        if (typeof val === "boolean") {
            this._agree = val;
        }
    }

    /**
     * 更新或清空session
     */
    set session (val) {
        if (val instanceof Object) {
            val = Object.assign(this._session, val);
            this._session = val;
            wx.setStorageSync("session", val);
            console.log("更新用户session", val);
        }
        else if (val == undefined) {
            for (let key in this._session)
                delete this._session[key];
            console.log("清空了用户session", this._session);
        }
    }

    /**
     * 更新或清空用户数据
     */
    set userInfo (val) {
        if (val instanceof Object) {
            val = Object.assign(this._userInfo, val);
            this._userInfo = val;
            wx.setStorageSync("userInfo", val);
            console.log("更新用户数据", val);
        }
        else if (val == undefined) {
            for (let key in this._userInfo) {
                switch (key) {
                    case "avatarUrl":
                    case "nickName":
                    case "language":
                    case "openid":
                    case "openId":
                    case "unionid":
                    case "unionId":
                    case "code":
                        // 微信基础信息，保留下来不用再次请求用户授权
                        break;
    
                    default:
                        delete this._userInfo[key]
                        break;
                }
            }
            wx.setStorageSync("userInfo", this._userInfo);
            console.log("清空了用户数据", this._userInfo);
        }
    }

    /**
     * 更新或清空列表查询状态
     */
    set searchState (val) {
        if (val instanceof Object) {
            this._searchState = val;
            console.log("更新列表查询状态", val);
        }
        else if (val == undefined) {
            for (let key in this._searchState)
                delete this._searchState[key];
            console.log("清空了列表查询状态", this._searchState);
        }
    }


    /**
     * 重置缓存
     */
    reset () {
        this.agree       = false;
        this.session     = null;
        this.userInfo    = null;
        this.searchState = null;
    }

}

const data = new GlobalData();

export default data;