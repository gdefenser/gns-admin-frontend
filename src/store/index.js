import Vue from "vue";
import Vuex from "vuex";
import * as cookie from "../common/cookie";
import types from "./types.js"

import { getNavbarList } from "../services/base"

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    getters: {
        currentMenu: state => state.currentMenu,
        currentRole: state => state.currentRole,
        navbarList: state => state.navbarList,
        navbar: state => state.navbar,
        userInfo: state => state.userInfo
    },
    state: {
        userInfo: {
            userName: '',
            accessToken: ''
        },
        currentMenu: {},
        currentRole: {
            query: false,
            insert: false,
            update: false,
            delete: false
        },
        navbarList: [],
        navbar: {
            collapsed: cookie.getCookie('state.navbar.collapsed') === 'true'
        }
    },
    mutations: {
        //同步函数
        [types.mutations.SET_COLLAPSE_NAVBAR](state, collapsed) {
            state.navbar.collapsed = collapsed
            cookie.setCookie("state.navbar.collapsed", collapsed)
        },
        [types.mutations.SET_CURRENT_MENU](state, currentMenu) {
            state.currentMenu = currentMenu
        },
        [types.mutations.SET_CURRENT_ROLE](state, currentRole) {
            let role = {
                query: currentRole.query,
                insert: currentRole.insert,
                update: currentRole.update,
                delete: currentRole.delete
            }
            state.currentRole = role
        },
        [types.mutations.SET_USER_INFO](state, userInfo) {
            state.userInfo = userInfo;
        },
        [types.actions.SET_NAVBAR_LIST](state, navbarList) {
            state.navbarList = navbarList;
        },
    },
    actions: {
        //异步函数
        loadNavbarList: ({ commit }) => {
            getNavbarList().then(r => {
                if (r.code == 0) {
                    commit(types.actions.SET_NAVBAR_LIST, r.result)
                }
            })
        }
    }
})

export default store