import config from "../config";

const LIZ_API = {
    SSO: {
        login: config.ssoApi + '/login',
        logout: config.ssoApi + '/logout',
        tokenValidate: config.ssoApi + '/token/validate',
        noPerm: config.ssoApi + '/permission',
        roleRoute: config.ssoApi + '/role/route',
        navbarList : config.ssoApi + '/role/nav/list'
    }
}

export default LIZ_API