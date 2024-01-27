import axios from 'axios';
import * as actions from '../api';

import { baseURL } from '../config/api'
import tokenHandle from '../utils/tokenHandle'

const api = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
        const res = await axios.request({
            baseURL,
            url,
            method,
            data
        })

        switch (onSuccess) {
            case 'user/authCallSuccess':
                tokenHandle.storeToken(res.data.data)
                break;
            case 'USER_LOGOUT':
                tokenHandle.removeToken()
            default:
                break;
        }

        dispatch(actions.apiCallSuccess(res.data))
        dispatch({ type: onSuccess, payload: res.data})
    } catch (err) {
        dispatch(actions.apiCallFailed(err.message))
        dispatch({ type: onError, payload: err.message })
    }
}

export default api