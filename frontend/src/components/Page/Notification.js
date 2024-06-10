import React, { useState, useEffect } from 'react';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch the array from the backend
        // Replace the API_URL with the actual URL to fetch the notifications
        fetch()
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {notifications.map((notification, index) => (
                <div key={index}>
                    <h3>{notification.title}</h3>
                    <p>Salary: {notification.salary}</p>
                    <p>Duration: {notification.duration}</p>
                    <button>{notification.isRead ? 'Read' : 'Not Read'}</button>
                </div>
            ))}
        </div>
    );
};

export default Notification;