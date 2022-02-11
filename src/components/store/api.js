import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan')
export const apiCallSuccess = createAction('api/callSuccess')
export const apiCallFailed = createAction('api/callFailed')

// export const authCallBegan = createAction('auth/callBegan')
// export const authCallSuccess = createAction('auth/callSuccess')
// export const authCallFailed = createAction('auth/callFailed')
