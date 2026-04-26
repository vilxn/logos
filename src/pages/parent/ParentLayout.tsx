import React from "react";
import { Link, Outlet } from "react-router-dom";

const ParentLayout: React.FC = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <aside
                style={{
                    width: "220px",
                    background: "#1e3a8a",
                    color: "white",
                    padding: "20px",
                }}
            >
                <h2>Parent Panel</h2>

                <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Link to="/parent" style={link}>Home</Link>
                    <Link to="/parent/progress" style={link}>Child Progress</Link>
                    <Link to="/parent/appointments" style={link}>Appointments</Link>
                    <Link to="/parent/profile" style={link}>Profile</Link>
                </nav>
            </aside>

            <main style={{ flex: 1, padding: "30px" }}>
                <Outlet />
            </main>
        </div>
    );
};

const link = {
    color: "white",
    textDecoration: "none",
};

export default ParentLayout;