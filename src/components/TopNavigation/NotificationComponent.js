import axios from '../../lib/Axios';
import React, { useEffect, useState } from 'react'
import './Notification.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function NotificationComponent({ userId }) {
    const [notifications, setNotifications] = useState([])
    const [notificationOpen, setNotificationOpen] = useState(false)

    const fetchNotifications = async (userId) => {
        const res = await axios.get(`api/v1/users/${userId}/notifications`)
        setNotifications(res.data)
    }

    const openNotification = () => {
        setNotificationOpen(prev => !prev)
    }

    useEffect(() => {
        fetchNotifications(userId)
    }, [userId])
    return (
        <>
            <button 
                className='btn btn-light rounded-circle shadow m-3 notification-body'
                onClick={openNotification}
            >
                <FontAwesomeIcon icon={faBell}/>
                <small className='notification-count fw-bold'>{notifications.length}</small>
            </button>
            {notificationOpen && <NotificationElement notifications={notifications}/>}
        </>
       
    )
}

const NotificationElement = ({ notifications }) => {
    
    const NotificationEl = (n, i) => {
        console.log(n)
        return (
            <React.Fragment key={i}>
                <Link to="/notifications" className='nav-link p-2 text-primary'>
                    {n?.data?.message}
                </Link>
                <hr className='text-secondary'/>
            </React.Fragment>
        )
    }
    return (
        <div className='notification-element bg-white p-1'>
            <button className='alert alert-danger btn btn-sm p-2 w-100'>
                Mark all as read
            </button>
            <hr className='text-secondary'/>
            {notifications.map(NotificationEl)}
            <Link to="/notifications" className='nav-link text-primary p-1 text-center'>
                View all
            </Link>
        </div>
    )
}