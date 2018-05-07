import store from '../store'


export function setUserInfo(userInfo) {
    window.sessionStorage.setItem('user-info', JSON.stringify(userInfo))
}

export function getUserInfo() {
    let userInfo = window.sessionStorage.getItem("user-info");

    if (!!userInfo) {
        userInfo = JSON.parse(userInfo)
        if (null == userInfo.userName) {
            userInfo.userName = store.getters.userInfo.userName
        }
        if (null == userInfo.accessToken) {
            userInfo.accessToken = store.getters.userInfo.accessToken
        }
        if (null == userInfo.avatar) {
            userInfo.avatar = store.getters.userInfo.avatar
        }
        return userInfo
    } else {
        userInfo = {
            userName: store.getters.userInfo.userName,
            accessToken: store.getters.userInfo.accessToken,
            avatar: store.getters.userInfo.avatar
        }
        return userInfo;
    }

}