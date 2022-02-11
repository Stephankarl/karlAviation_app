
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//MATERIAL UI
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { addAgentToContract } from '../store/contracts'

export default function AgentSelector({ contractId }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const agents = useSelector(state => state.entities.agents.list)

    const handleChange = e => {
        dispatch(addAgentToContract(contractId, e.target.value))
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="agent-label">Agent</InputLabel>
            <Select
                labelId="agent-label"
                id="agent"
                value=''
                label="Agent"
                onChange={handleChange}
            >
                <MenuItem onClick={() => navigate('/agents/new')}>- ADD AGENT -</MenuItem>
                {agents.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.companyName}</MenuItem>
                ))}
            </Select>
      </FormControl>
    )
}
