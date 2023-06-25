import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';

import { apiCallBegan } from './api';
import { contractsUrl, cachedTime } from './config/api';

const slice = createSlice({
    name: 'contracts',
    initialState: {
        list: [],
        loading: false,
        lastFetched: null
    },
    reducers: {
        contractsRequested: (contracts) => {
            contracts.loading = true
        },

        contractsReceived: (contracts, { payload }) => {
            contracts.list = payload
            contracts.loading = false
            contracts.lastFetched = Date.now()
        },

        contractsRequestFailed: (contracts, action) => {
            contracts.loading = false
        },

        contractAdded: (contracts, { payload }) => {
            contracts.list.push(payload)
        },

        contractEdited: (contracts, { payload }) => {
            const i = contracts.list.findIndex(contract => contract._id === payload.data._id)
            contracts.list[i] = payload.data
        },

        expenseAddedToContract: (contracts, { payload }) => {
            const i = contracts.list.findIndex(contract => contract._id === payload.contractId)
            contracts.list[i] = payload.updatedContract
        },

        expensePaid: (contracts, { payload }) => {
            const contractI = contracts.list.findIndex(contract => contract._id === payload.contractId)
            const expenseI = contracts.list[contractI].expenses.findIndex(expense => expense._id === payload.expenseId)
            contracts.list[contractI].expenses[expenseI].paid = payload.paid
        },

        expenseDeleted: (contracts, { payload }) => {
            const contractI = contracts.list.findIndex(contract => contract._id === payload.contractId)
            const expenseI = contracts.list[contractI].expenses.findIndex(expense => expense._id === payload.expenseId)
            contracts.list[contractI].expenses.splice(expenseI, 1)
        },

        airplaneAdded: (contracts, { payload }) => {
            const contractIndex = contracts.list.findIndex(contract => contract._id === payload.contractId)
            contracts.list[contractIndex].airplane = payload.airplaneId
        },

        dateAndRateUpdated: (contracts, { payload }) => {
            const i = contracts.list.findIndex(contract => contract._id === payload.data._id)
            contracts.list[i] = payload.data
        },

        paymentTypeUpdated: (contracts, { payload }) => {
            const i = contracts.list.findIndex(contract => contract._id === payload._id)
            contracts.list[i].paymentType = payload.paymentType
        },

        contractInvoiced: (contracts, { payload }) => {
            const i = contracts.list.findIndex(contract => contract._id === payload.data._id)
            contracts.list[i] = payload.data
        },

        contractDeleted: (contracts, { payload }) => {
            const i = contracts.list.findIndex(contract => contract._id === payload)
            contracts.list.splice(i, 1)
        }
    }
})

const { 
    contractsRequested, 
    contractsReceived, 
    contractsRequestFailed, 
    contractAdded, 
    contractEdited,
    expenseAddedToContract,
    expensePaid,
    expenseDeleted,
    airplaneAdded,
    dateAndRateUpdated,
    paymentTypeUpdated,
    contractInvoiced,
    contractDeleted
    } = slice.actions
    
export default slice.reducer

//Action Creators
export const loadContracts = id => (dispatch, getState) => {
    const { lastFetched } = getState().entities.contracts
    const diffInMin = moment().diff(moment(lastFetched), 'minute')

    if (diffInMin < cachedTime) return

    dispatch(
        apiCallBegan({
            url: `${contractsUrl}?user=${id}`,
            onStart: contractsRequested.type,
            onSuccess: contractsReceived.type,
            onError: contractsRequestFailed.type
        })
    )
}

export const addContract = data => apiCallBegan({
    url: `${contractsUrl}`,
    method: 'post',
    data,
    onSuccess: contractAdded.type,
    onError: contractsRequestFailed.type
})

export const addAgentToContract = (id, agent) => apiCallBegan({
    url: `${contractsUrl}/${id}`,
    method: 'post',
    data:  { agent },
    onSuccess: contractEdited.type,
    onError: contractsRequestFailed.type
})

export const addTotalExpenseToContract = (id, totalExpense) => apiCallBegan({
    url: `${contractsUrl}/${id}`,
    method: 'post',
    data: { totalExpense },
    onSuccess: contractEdited.type,
    onError: contractsRequestFailed.type
})

export const receivePayment = (id, payment) => apiCallBegan({
    url: `${contractsUrl}/${id}/payment`,
    method: 'post',
    data: payment,
    onSuccess: contractEdited.type,
    onError: contractsRequestFailed.type
})

export const addExpenseToContract = (id, expense) => apiCallBegan({
    url: `${contractsUrl}/${id}/expenses`,
    method: 'post',
    data: { expense },
    onSuccess: expenseAddedToContract.type,
    onError: contractsRequestFailed.type
})

export const payExpense = (contractId, expenseId) => (dispatch, getState) => {
    const contracts = getState().entities.contracts.list
    const contractI = contracts.findIndex(contract => contract._id === contractId)
    const expenseI = contracts[contractI].expenses.findIndex(expense => expense._id === expenseId)
    const paid = contracts[contractI].expenses[expenseI].paid
    
    dispatch(
        apiCallBegan({
            url: `${contractsUrl}/${contractId}`,
            method: 'patch',
            data: { expensePaid: !paid, expenseId },
            onSuccess: expensePaid.type,
            onError: contractsRequestFailed.type
        })
    )
}

export const deleteExpense = (contractId, expenseId) => apiCallBegan({
    url: `${contractsUrl}/${contractId}`,
    method: 'patch',
    data: { deleteExpense: expenseId },
    onSuccess: expenseDeleted.type,
    onError: contractsRequestFailed.type
})

export const addAirplaneToContract = (contractId, airplaneId) => apiCallBegan({
    url: `${contractsUrl}/${contractId}`,
    method: 'patch',
    data: { airplaneId },
    onSuccess: airplaneAdded.type,
    onError: contractsRequestFailed.type
})

export const updateContractDaysAndRate = (id, data) => apiCallBegan({
    url: `${contractsUrl}/${id}`,
    method: 'patch',
    data,
    onSuccess: dateAndRateUpdated.type,
    onError: contractsRequestFailed.type
})

export const updatePaymentType = (id, paymentType) => apiCallBegan({
    url: `${contractsUrl}/${id}`,
    method: 'patch',
    data: { paymentType },
    onSuccess: paymentTypeUpdated.type,
    onError: contractsRequestFailed.type
})

export const createInvoice = (id, data) => apiCallBegan({
    url: `${contractsUrl}/${id}/invoice`,
    method: 'post',
    data,
    onSuccess: contractInvoiced.type,
    onError: contractsRequestFailed.type
})

export const closeContract = id => apiCallBegan({
    url: `${contractsUrl}/${id}`,
    method: 'put',
    data: { open: false },
    onSuccess: contractEdited.type,
    onError: contractsRequestFailed.type
})

export const completeContract = id => apiCallBegan({
    url: `${contractsUrl}/${id}/complete`,
    method: 'post',
    data: { complete: true },
    onSuccess: contractEdited.type,
    onError: contractsRequestFailed.type
})

export const deleteContract = id => apiCallBegan({
    url: `${contractsUrl}/${id}`,
    method: 'delete',
    onSuccess: contractDeleted.type,
    onError: contractsRequestFailed.type
})

//Selectors
export const getOpenContracts = createSelector(
    state => state.entities.contracts,
    contracts => contracts.list.filter(contract => contract.open)
)

export const getOneContract = id => createSelector(
    state => state.entities.contracts,
    contracts => contracts.list.find(contract => contract._id === id)
)

export const getInvoicedContracts = createSelector(
    state => state.entities.contracts,
    contracts => contracts.list.filter(contract => contract.invoice.invoiced)
)

export const getYearlyContracts = year => createSelector(
    state => state.entities.contracts,
    contracts => contracts.list.filter(contract => moment(contract.endDate).format('YYYY') === year)
)