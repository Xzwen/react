import axios from 'axios'
import NProgress from 'nprogress'
import { browserHistory } from 'react-router'
import { message } from 'antd'
import { errorMessage } from '@/utils'
// 请求拦截器
axios.interceptors.request.use(function(config){
    NProgress.start()
    config.headers.common.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`
    return config
}, function(error) {    
    return Promise.reject(error)
});

//  响应拦截
axios.interceptors.response.use((res) => {
    NProgress.done()
    return res
}, (err) => {
    NProgress.done()
    if(err.response.status === 401) {
        browserHistory.push('/')
    }
    return Promise.reject(errorMessage(err.response.data.code))
})

export default {
    //  用户登录
    login(params) {
        return axios.post('/api/users/login', params)
    },
    register(params){
        return axios.post('/api/users/register', params)
    },

    //  用户    
    me(){
        return axios.get('/api/users/me')
    },
    users(params){
        return axios.get(`/api/users`, {params: params})
    },
    createUsers(params) {
        return axios.post('/api/users', params)
    },
    delUsers(id){
        return axios.delete(`/api/users/${id}`)
    },
    getSingleUsers(id){
        return axios.get(`/api/users/${id}`)
    },
    editUsers(id, params){
        return axios.put(`/api/users/${id}`, params)
    },    
    
    //  会议
    meeting(params){
        return axios.get('/api/meeting', {params: params})
    },
    createMeeting(params){
        return axios.post('/api/meeting', params)
    },
    getSingleMeeting(id){
        return axios.get(`/api/meeting/${id}`)
    },
    delMeeting(id){
        return axios.delete(`/api/meeting/${id}`)
    },
    editMeeting(id, params){
        return axios.put(`/api/meeting/${id}`, params)
    },

    //  设备
    device(params){
        return axios.get('/api/device', {params: params})
    },
    createDevice(params){
        return axios.post('/api/device', params)
    },
    getSingleDevice(id){
        return axios.get(`/api/device/${id}`)
    },
    delDevice(id){
        return axios.delete(`/api/device/${id}`)
    },
    editDevice(id, params){
        return axios.put(`/api/device/${id}`, params)
    },

    //  阿里云
    aliyunSts(){
        return axios.get(`/api/acl/aliyunSts`)
    }
}