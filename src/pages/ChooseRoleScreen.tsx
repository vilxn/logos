import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseRoleScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleChooseRole = (role: "specialist" | "parent") => {
        // Save role locally or send to backend
        localStorage.setItem("role", role);

        // Redirect after choosing
        if(role === "parent") {
            navigate("/dashboard");
        }
        if(role === "specialist") {
            navigate("/parent");
        }

    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Choose Your Role</h1>
                <p style={styles.subtitle}>
                    Select how you want to use the platform
                </p>

                <div style={styles.buttons}>
                    <button
                        style={styles.specialistButton}
                        onClick={() => handleChooseRole("specialist")}
                    >
                        Specialist
                    </button>

                    <button
                        style={styles.parentButton}
                        onClick={() => handleChooseRole("parent")}
                    >
                        Parent
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
    },
    card: {
        background: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        width: "400px",
        textAlign: "center",
    },
    title: {
        marginBottom: "10px",
        fontSize: "28px",
    },
    subtitle: {
        color: "#666",
        marginBottom: "30px",
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    specialistButton: {
        padding: "14px",
        fontSize: "16px",
        border: "none",
        borderRadius: "10px",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
    },
    parentButton: {
        padding: "14px",
        fontSize: "16px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "#fff",
        cursor: "pointer",
    },
};

export default ChooseRoleScreen;