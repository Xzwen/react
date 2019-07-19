import actionType from '../action'

export let userInfoReducer = (state = {}, action) => {
    switch(action.type) {
        case actionType.USER_INFO:
            return action.data
        default:
            return state
    }
}