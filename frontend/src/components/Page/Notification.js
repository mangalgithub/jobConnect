import React, { useState, useEffect } from 'react';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
     const markAsRead = (notificationId) => {
       const token = localStorage.getItem("token");
       fetch(
         `http://localhost:5000/api/notifications/${notificationId}/markAsRead`,
         {
           method: "PUT", // Assuming the endpoint requires a PUT request to update
           headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ isRead: true }), // Assuming the backend expects a JSON body with the new isRead status
         }
       )
         .then((response) => {
           if (response.ok) {
             // Update the local state to reflect the change
             setNotifications(
               notifications.map((notification) => {
                 console.log("notifications", notification._id, notificationId);
                 if (notification._id === notificationId) {
                   return { ...notification, isRead: true };
                 }
                 return notification;
               })
             );
           }
         })
         .catch((error) => console.log(error));
     };
    useEffect(() => {
        const token=localStorage.getItem("token");
        fetch("http://localhost:5000/api/notifications",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.log(error));

            console.log(notifications);
    }, []);



    return (
      <div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {notification.jobDetail.title}
              </div>
              <p className="text-gray-700 text-base">
                Salary: {notification.jobDetail.salary}
              </p>
              <p className="text-gray-700 text-base">
                Duration: {notification.jobDetail.duration} month(s)
              </p>
              <p className="text-gray-700 text-base">
                Job Type: {notification.jobDetail.jobType}
              </p>
              <p className="text-gray-700 text-base">
                Skills: {notification.jobDetail.skillsets.join(", ")}
              </p>
            </div>

            <div className="px-6 pt-4 pb-2">
              <button
                onClick={() =>
                  !notification.isRead && markAsRead(notification.jobDetail._id)
                }
                style={{
                  backgroundColor: notification.isRead ? "#4CAF50" : "#f44336", // Green for read, Red for not read
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: notification.isRead ? "default" : "pointer",
                  opacity: notification.isRead ? 0.5 : 1,
                }}
                disabled={notification.isRead}
              >
                {notification.isRead ? "Read" : "Not Read"}
              </button>
            </div>
          </div>
        ))}

      </div>
    );
};

export default Notification;