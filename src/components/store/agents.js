import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';

import { cachedTime, agentsUrl } from './config/api';
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'agents',
    initialState: {
        list: [],
        loading: false,
        lastFetched: null
    },
    reducers: {
        agentsRequested: (agents) => {
            agents.loading = true
        },

        agentsReceived: (agents, { payload }) => {
            agents.list = payload
            agents.loading = false
            agents.lastFetched = Date.now()
        },

        agentsRequestFailed: (agents) => {
            agents.loading = false
        },

        agentAdded: (agents, { payload }) => {
            agents.list.push(payload)
        },

        agentUpdated: (agents, { payload }) => {
            for ( let i in agents.list ) {
                if (agents.list[i]._id === payload.agentId) {
                    agents.list[i] = payload.agent
                    break
                }
            }
        }
    }
})

const { agentsRequested, agentsReceived, agentsRequestFailed, agentAdded, agentUpdated } = slice.actions
export default slice.reducer

//Action Creators

export const loadAgents = id => (dispatch, getState) => {
    const { lastFetched } = getState().entities.agents
    const diffInMin = moment().diff(moment(lastFetched), 'minute')

    if (diffInMin < cachedTime) return 

    dispatch(
        apiCallBegan({
            url: `${agentsUrl}/${id}`,
            onStart: agentsRequested.type,
            onSuccess: agentsReceived.type,
            onError: agentsRequestFailed.type
        })
    )
}

export const addAgent = data => apiCallBegan({
    url: agentsUrl,
    method: 'post',
    data,
    onSuccess: agentAdded.type,
    onError: agentsRequestFailed.type
})

export const updateAgent = (id, data) => apiCallBegan({
    url: `${agentsUrl}/${id}`,
    method: 'patch',
    data,
    onSuccess: agentUpdated.type,
    onError: agentsRequestFailed.type
})

//Selectors
export const getOneAgent = id => createSelector(
    state => state.entities.agents,
    agents => agents.list.find(agent => agent._id === id)
)