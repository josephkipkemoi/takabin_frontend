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

    const handleWebsockets = (Pusher, userId) => {
        Pusher.logToConsole = true;

        let pusher = new Pusher('f75bf649a1a7e42f19d9', {
        cluster: 'ap2'
        });

        let channel = pusher.subscribe('notifications-channel');
        channel.bind(`notifications-channel`, function(data) {
           
        alert(JSON.stringify(data));
        });
    }

    useEffect(() => {
        // handleWebsockets(window.Pusher, userId)
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
            {notificationOpen && <NotificationElement notifications={notifications} openNotification={openNotification}/>}
        </>
       
    )
}

const NotificationElement = ({ notifications, openNotification }) => {
    
    const NotificationEl = (n, i) => {
        return (
            <React.Fragment key={i}>
                <Link to="/notifications" className='nav-link p-2 alert alert-secondary rounded-0' onClick={openNotification}>
                    {n?.data?.message}
                </Link>
            </React.Fragment>
        )
    }
    return (
        <div className='notification-element bg-white p-1'>
            <button className='alert alert-light btn btn-sm p-2 w-100'>
                Mark all as read
            </button>
            {notifications.map(NotificationEl)}
            <Link 
            to="/notifications" 
            className='alert alert-light nav-link btn btn-sm p-1 m-1 text-center'
            onClick={openNotification}
            >
                View all
            </Link>
        </div>
    )
}

