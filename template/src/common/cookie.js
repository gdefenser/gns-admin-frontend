import lizStore from '../store'

export function deleteUserInfo() {
    deleteCookie('userinfo')
}

export function setUserInfo(userInfo) {
    setCookie('userinfo', JSON.stringify(userInfo))
}

export function getUserInfo() {
    let userInfo = getCookie("userinfo");
    if (!!userInfo) {
        userInfo = JSON.parse(userInfo)
        if (!userInfo.userName) {
            userInfo.userName = lizStore.getters.userInfo.userName
        }
        if (!userInfo.accessToken) {
            userInfo.accessToken = lizStore.getters.userInfo.accessToken
        }
    } else {
        userInfo = {
            userName: lizStore.getters.userInfo.userName,
            accessToken: lizStore.getters.userInfo.accessToken
        }
    }
    setCookie('userinfo', JSON.stringify(userInfo))
    return userInfo
}

export function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 30 * 60 * 1000);
    document.cookie = "liz.admin." + name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + "liz.admin." + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

export function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = "liz.admin." + name + "=" + cval + ";expires=" + exp.toGMTString();
}