const config = (process.env.NODE_ENV === 'production') ? {
    appId: "",
    ssoApi: 'https://sso.hotandin.cn'
} : {
        appId: "a0b83853c116a752f88bf4d962da0",
        ssoApi: 'http://172.25.129.71:8080/sso-web'
    }

export default config
