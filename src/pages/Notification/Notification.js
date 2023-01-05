import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "../../lib/Axios";

export default function Notification({ user }) {
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [readNotifications, setReadNotifications] = useState([])

    const fetchNotifications = async (userId) => {
        const res = await axios.get(`api/v1/users/${userId}/notifications`)
        setUnreadNotifications(res.data.unread_notifications)
        setReadNotifications(res.data.read_notifications)
    }

    const NotificationElements = (n, i) => {
        return (
            <React.Fragment key={i}>
                <button className="btn d-block">{n?.data?.message}</button>
            </React.Fragment>
        )
    }
    useEffect(() => {
        fetchNotifications(user?.id)
    }, [user])
    
    return (
        <Card className="mt-3 border-0">
            <Card.Header className="bg-primary text-white">
                Notifications
            </Card.Header>
            <Card.Body>
                <button className="alert alert-primary w-100 rounded-0 p-2">Archive Notifications</button>
                {unreadNotifications.length > 0 &&
                <>
                    <small>Unread Notifications</small>
                   {unreadNotifications.map(NotificationElements)}
                </>}
                {readNotifications.length > 0 &&
                <>
                    <small>Read Notifications</small>
                   {readNotifications.map(NotificationElements)}
                </>}
            </Card.Body>
        </Card>
    )
}