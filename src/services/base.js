import { doRequestWithSso } from './index'

import API from "./api";


export function getNavbarList() {
    return doRequestWithSso(API.SSO.navbarList + "?type=1")
}


export function getRoleRoute() {
    return doRequestWithSso(API.SSO.roleRoute)
}