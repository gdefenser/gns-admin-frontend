import axios from "../common/axios";
import * as cookie from "../common/cookie";
import * as utils from "../common/utils";
import API from "./api";
import config from "../config"
import store from "../store"

function getIndex() {
    return window.location.href.replace(window.location.hash, "").split("?")[0]
}

export function doLogout() {
    let userInfo = cookie.getUserInfo()
    return new Promise((resRequest, rejRequest) => {
        doRequestWithSso(API.SSO.logout, {}, false).then((result) => {
            if (result.code == 0) {
                cookie.deleteUserInfo()
                window.location.replace(getIndex());
            }
            resRequest(result)
        })
    })
}

export function doLogin() {
    const returnUrl = encodeURIComponent(getIndex())
    window.location.replace(API.SSO.login + '?app_id=' + config.appId + '&return_url=' + returnUrl);
}

export function noPerm() {
    const returnUrl = encodeURIComponent(getIndex())
    let userInfo = cookie.getUserInfo()
    window.location.replace(API.SSO.noPerm + '?return_url=' + returnUrl + '&access_token=' + userInfo.accessToken);
}

export function validateUrlParams() {
    let userInfo = cookie.getUserInfo()

    const accessToken = utils.getQueryString('access_token')
    const userName = utils.getQueryString('user_name')
    let isReturn = false
    if (null != accessToken && "" != accessToken) {
        userInfo.accessToken = accessToken
        isReturn = true
    }

    if (null != userName && "" != userName) {
        userInfo.userName = userName
        isReturn = true
    }

    if (isReturn) {
        cookie.setUserInfo(userInfo)
        window.location.replace(getIndex());
    }
}

export function doRequestWithSso(api, params = {}, isGet = true, routeModel = 'query') {
    let userInfo = cookie.getUserInfo()
    let route = window.location.hash.replace("#/", "/").split("?")[0]

    return new Promise((resRequest, rejRequest) => {
        let config = {
            method: isGet ? 'get' : 'post',
            url: api,
            data: params,
            headers: {
                'Content-Type': isGet ? 'application/json' : 'application/x-www-form-urlencoded',
                'Gns-Access-Token': userInfo.accessToken,
                'Gns-App-Id': config.appId,
                'Gns-Route-Model': routeModel,
                'Gns-Route': route
            }
        }

        axios.request(config).then(response => {
            if (null != response) {
                if (response.data.code == 40005) {
                    doLogin()
                } else if (response.data.code == 40006) {
                    noPerm(vm)
                } else {
                    resRequest(response.data)
                }
            } else {
                rejRequest(response.data)
            }
        }).catch((error) => {
            rejRequest(error)
        })
    })
}

export function doRequestWithoutSso(api, params = {}, isGet = true) {
    return new Promise((resRequest, rejRequest) => {
        let config = {
            method: isGet ? 'get' : 'post',
            url: api,
            data: params,
            headers: {
                'Content-Type': isGet ? 'application/json' : 'application/x-www-form-urlencoded'
            }
        }

        axios.request(config).then(response => {
            if (null != response) {
                resRequest(response.data)
            } else {
                rejRequest(response.data)
            }
        }).catch((error) => {
            rejRequest(error)
        })
    })
}
