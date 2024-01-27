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

        authCallSuccess: (state, { payload }) => {
            if (!payload.success) {
                state.message = {
                    type: 'error',
                    msg: payload.msg
                }
            } else {
                const user = jwtDecode(payload.data)
                state.loggedIn = true
                state.message = payload.message
                state.currentUser = user
            }
        },

        authCallFailed: (state, { payload }) => {
            if (!payload.success) {
                state.message = {
                    type: 'error',
                    code: payload.code,
                    msg: payload.message
                }
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
        authCallSuccess,
        authCallFailed,
        userUpdated,
        userCallFail
    } = slice.actions

export const { userNotLoggedIn } = slice.actions
export default slice.reducer

//Action Creator
export const registerUser = data => apiCallBegan({
    url: `${authUrl}/register`,
    method: 'post',
    data,
    onStart: clearMessage.type,
    onSuccess: authCallSuccess.type,
    onError: authCallFailed.type
})

export const loginUser = data => apiCallBegan({
    url: `${authUrl}/login`,
    method: 'post',
    data,
    onStart: clearMessage.type,
    onSuccess: authCallSuccess.type,
    onError: authCallFailed.type
})

export const logoutUser = () => apiCallBegan({
    url: `${authUrl}/logout`,
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