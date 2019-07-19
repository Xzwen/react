let filter = (times) => {
    return Number(times) >= 10 ? times : `0${times}`
}

export let timeFilter = (times) => {
    let date = times ? new Date(times) : new Date();
    let years = date.getFullYear()
    let months = filter(date.getMonth() + 1)
    let days = filter(date.getDate())
    let hours = filter(date.getHours())
    let minutes = filter(date.getMinutes())
    let seconds = filter(date.getSeconds())
    return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`
}

export let errorMessage = (code) => {
    if(!code) return
    switch (code) {
        case 10000:
            return '验证失效，请重新登录';
        case 10001:
            return '密码或账号错误';
        case 10002:
            return '改用户已存在';
        case 10003:
            return '请求没有携带token';
        case 10004:
            return '资源未找到';
        default:
            return '请求失败';
    }
}
