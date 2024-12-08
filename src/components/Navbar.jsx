import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchNotifications = async () => {
        try {
            const response = await axios.get("http://localhost:5002/api/notifications", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const unread = response.data.filter((notification) => !notification.read);
            setUnreadCount(unread.length);
        } catch (err) {
            console.error("Failed to fetch notifications:", err.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchNotifications();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">AwesomeApp</h1>
            <div className="space-x-4 flex items-center">
                {isLoggedIn ? (
                    <>
                        <Link to="/home" className="hover:underline">Todos</Link>
                        <Link to="/create-todo" className="hover:underline">Create Todo</Link>
                        <div className="relative">
                            <Link to="/notifications" className="hover:underline">
                                Notifications
                            </Link>
                            {unreadCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/signup" className="hover:underline">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
