import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem("token");

    const fetchNotifications = async () => {
        try {
            const response = await axios.get("http://localhost:5002/api/notifications", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(response.data);
        } catch (err) {
            console.error("Failed to fetch notifications:", err.message);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <ul className="space-y-4">
                {notifications.map((notification) => (
                    <li
                        key={notification._id}
                        className={`p-4 bg-white rounded shadow ${notification.read ? "opacity-75" : "font-bold"
                            }`}
                    >
                        <h2>{notification.title}</h2>
                        <p>{notification.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
