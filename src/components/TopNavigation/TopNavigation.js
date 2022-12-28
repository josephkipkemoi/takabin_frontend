import axios from 'axios';
import { useEffect, useState } from 'react';
import './TopNavigation.css';

const TopNavigation = () => {
    const [balance, setBalance] = useState({
        amount: null,
        bonus: null
    })

    const { amount, bonus } = balance
    
    const fetchBalance = async ( user_id ) => {
        const res = await axios.get(`http://localhost:8000/api/v1/users/${user_id}/balance`)
        const { amount, bonus } = res?.data
        setBalance(prev => ({...prev , amount, bonus}))
    }
    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('auth-user'))?.id
        Boolean(user_id) && fetchBalance(user_id)
    }, [])
    return (
        <div className='top-navigation m-1 d-flex align-items-center'>
            <div className='d-flex flex-column align-items-start text-white'>
                <span>Balance Kes: {Number(amount).toLocaleString()}</span>
                <span>Bonus Kes: {Number(bonus).toLocaleString()}</span>
            </div>
            <button className='btn btn-light rounded-circle shadow m-3'>N</button>
        </div>
    )
}

export default TopNavigation