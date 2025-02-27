import React from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaUtensils, FaShoppingCart, FaBox, FaMoneyBill, FaCog, FaUser } from "react-icons/fa";
import "../assets/styles/Sidebar.css";

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? "show" : ""}`}>
            {/* Close Button */}
            <button className="close-btn" onClick={closeSidebar}>
                <FaTimes size={24} />
            </button>

            <h2 className="sidebar-title">Coffee Shop</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/menu" onClick={closeSidebar}>
                        <FaUtensils /> Menu
                    </Link>
                </li>
                <li>
                    <Link to="/orders" onClick={closeSidebar}>
                        <FaBox /> Orders
                    </Link>
                </li>
                <li>
                    <Link to="/cart" onClick={closeSidebar}>
                        <FaShoppingCart /> Cart
                    </Link>
                </li>
                <li>
                    <Link to="/income" onClick={closeSidebar}>
                        <FaMoneyBill /> Income
                    </Link>
                </li>
                <li>
                    <Link to="/settings" onClick={closeSidebar}>
                        <FaCog /> Settings
                    </Link>
                </li>
                <li>
                    <Link to="/profile" onClick={closeSidebar}>
                        <FaUser /> Profile
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
