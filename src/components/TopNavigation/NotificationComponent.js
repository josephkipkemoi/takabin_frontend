import axios from '../../lib/Axios';
import React, { useEffect, useState } from 'react'
import './Notification.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function NotificationComponent({ userId }) {
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(null)
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [readNotifications, setReadNotifications] = useState([])

    const [notificationOpen, setNotificationOpen] = useState(false)

    const fetchNotifications = async (userId) => {
        const res = await axios.get(`api/v1/users/${userId}/notifications`)
        setUnreadNotificationCount(res.data.unread_notifications_count)
        setReadNotifications(res.data.read_notifications)
        setUnreadNotifications(res.data.unread_notifications)
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
                className='btn shadow-sm text-white'
                onClick={openNotification}
            >
                <FontAwesomeIcon size='lg' icon={faBell}/>
                <small className='fw-bold'>{unreadNotificationCount}</small>
            </button>
            {notificationOpen && 
            <NotificationElement 
                readNotifications={readNotifications}
                unreadNotifications={unreadNotifications} 
                openNotification={openNotification}
                userId={userId}
            />
            }
        </>
       
    )
}

const NotificationElement = ({ readNotifications, unreadNotifications , openNotification,userId }) => {

    const handleAllRead = async () => {
        const res = await axios.post(`api/v1/users/${userId}/notifications/read`)
       
    }
    const NotificationEl = (n, i) => {
        return (
            <React.Fragment key={i}>
                <Link 
                    to={`/notifications?bonus=${n.data.bonus_url}`}
                    className={`nav-link p-2 alert alert-${Boolean(n.read_at) ? 'light': 'danger'} rounded-0`}
                    onClick={openNotification}
                >
                    {n?.data?.message}
                </Link>     
            </React.Fragment>
        )
    }
    return (
        <div className='bg-white p-1'>
            <button className='alert alert-light btn btn-sm p-2 w-100' onClick={handleAllRead}>
                Mark all as read
            </button>
    
            {unreadNotifications.length > 0 &&
            <>
                <small  className='d-block'>Unread Notifications</small>
                <hr className='text-secondary'/>
                {unreadNotifications.map(NotificationEl)}
            </>}
            {readNotifications.length > 0 && 
                <>
                <small className='d-block'>Read Notifications</small>
                {readNotifications.map(NotificationEl)}
                </>
            }      
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

