import actionType from './index'

export let userInfoAction = (data) => {
    return (dispatch, getState) => {
        window.$api.me()
        .then(res => {
            dispatch({type: actionType.USER_INFO, data: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }
}