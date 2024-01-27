import { combineReducers } from 'redux';
import contractReducers from './contracts';
import userReducers from './users';
import agentReducers from './agents';
// import airplaneReducers from './airplanes';

export default combineReducers({
    contracts: contractReducers,
    user: userReducers,
    agents: agentReducers,
    // airplanes: airplaneReducers,
})