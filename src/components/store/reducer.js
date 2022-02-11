import { combineReducers } from 'redux';
import entityReducers from './entities';

const appReducer = combineReducers({ 
    entities: entityReducers
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') 
        return appReducer(undefined, action)
    return appReducer(state, action)
}

export default rootReducer
