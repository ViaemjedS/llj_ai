import {
    create
} from 'zustand'

import {
    doLogin
} from '../api/user'

export const useUserStore =  create(set => ({
    user: null, // 用户信息
    isLogin: false, // 是否登录
    
    login: async ({username="", password=""}) => {
        const res = await doLogin({username, password}) // 登录接口
        console.log(res)
        const {token, data: user} = res.data;
        localStorage.setItem('token', token) // 存储token到本地
        set({
            user, // 用户信息
            isLogin: true // 是否登录
        })
    },
    logout: () => {
        localStorage.removeItem('token') // 移除token
        set({
            user: null, // 用户信息
            isLogin: false, // 是否登录
        })
    }
}))