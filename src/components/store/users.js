import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode'

import { apiCallBegan } from './api';
import { authUrl, usersUrl } from './config/api';

const slice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        currentUser: {},
        message: null
    },
    reducers: {
        clearMessage: (state) => {
            state.message = null
        },

        userCallSuccess: (state, { payload }) => {
            if (payload.type === 'error') {
                state.message = {
                    type: 'error',
                    msg: payload.msg
                }
            }
            if (payload.type === 'success') {
                const user = jwtDecode(payload.token)
                state.loggedIn = true
                state.currentUser = user
            }
        },

        userUpdated: (state, { payload }) => {
            state.currentUser = payload
        },

        userCallFail: (state, action) => {
            state.message = {
                type: 'error',
                msg: 'Something went wrong...'
            }
        }
    }
})

const { clearMessage, 
        userCallSuccess,
        userUpdated,
        userCallFail
    } = slice.actions

export const { userNotLoggedIn } = slice.actions
export default slice.reducer

//Action Creator
export const registerUser = data => apiCallBegan({
    url: `${usersUrl}/register`,
    method: 'post',
    data,
    onStart: clearMessage.type,
    onSuccess: userCallSuccess.type,
    onError: userCallFail.type
})

export const loginUser = data => apiCallBegan({
    url: `${authUrl}/login`,
    method: 'post',
    data,
    onStart: clearMessage.type,
    onSuccess: userCallSuccess.type,
    onError: userCallFail.type
})

export const logoutUser = () => apiCallBegan({
    url: `${usersUrl}/logout`,
    onStart: clearMessage.type,
    onSuccess: 'USER_LOGOUT',
    onError: userCallFail.type
})

export const updateUser = data => apiCallBegan({
    url: `${usersUrl}/${data._id}`,
    method: 'patch',
    data,
    onStart: clearMessage.type,
    onSuccess: userUpdated.type,
    onError: userCallFail.type
})