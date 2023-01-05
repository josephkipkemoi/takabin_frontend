import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationComponent from './NotificationComponent';
import './TopNavigation.css';

const TopNavigation = () => {
    const [userId, setUserId] = useState(null)

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
        const user_id = JSON.parse(localStorage.getItem('user'))?.user.id
        Boolean(user_id) && fetchBalance(user_id)
        setUserId(user_id)
    }, [])
    return (
        <div className='d-flex justify-content-end mt-1' style={{ marginRight: '6px' }}>
            <div className='d-flex align-items-start'>
                <div className='d-flex flex-column align-items-start text-white'>
                    <span>Balance Kes: {Number(amount).toLocaleString()}.00</span>
                    <span>Bonus Kes: {Number(bonus).toLocaleString()}.00</span>
                </div>
                <NotificationComponent userId={userId}/>
            </div>        
        </div>
    )
}

export default TopNavigation