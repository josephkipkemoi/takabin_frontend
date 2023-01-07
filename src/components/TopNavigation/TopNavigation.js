import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationComponent from './NotificationComponent';
import './TopNavigation.css';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useGetUserBalanceQuery } from '../../hooks/api/balance';
import { Spinner } from 'react-bootstrap';

const TopNavigation = ({ user }) => {
    
    return (
        <div className='d-flex justify-content-end mt-1' style={{ marginRight: '6px' }}>
            <div className='d-flex align-items-start'>
                <BalanceComponent  userId={user.id}/>
                <NotificationComponent userId={user.id}/>
            </div>        
        </div>
    )
}

const BalanceComponent = ({  userId }) => {
    const {data, isLoading, error} = useGetUserBalanceQuery(userId)

    if(error) {
        return <span className='alert alert-danger'>Error!</span>
    }

    if(isLoading) {
        return <Spinner animation='grow' />
    }

    return (
        <div className='d-flex flex-column align-items-start text-white'>
            <span>
                Balance <FontAwesomeIcon icon={faRefresh}/> Kes{Number(data?.amount).toLocaleString()}.00                        
            </span>
        </div>
    )
}

export default TopNavigation