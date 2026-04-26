import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/authApi";

const AuthScreen: React.FC = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (isLogin) {
            await authApi.login({ email, password });
            navigate("/parent")
        } else {
            navigate("/choose-role");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>{isLogin ? "Sign In" : "Create Account"}</h1>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <button type="submit" style={styles.button}>
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p style={styles.switchText}>
                    {isLogin ? "No account?" : "Already have an account?"}
                    <span
                        style={styles.switchLink}
                        onClick={() => setIsLogin(!isLogin)}
                    >
            {isLogin ? " Register" : " Login"}
          </span>
                </p>
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
        background: "#f5f5f5",
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "12px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "12px",
        fontSize: "16px",
        border: "none",
        borderRadius: "8px",
        background: "#2563eb",
        color: "white",
        cursor: "pointer",
    },
    switchText: {
        marginTop: "15px",
        textAlign: "center",
        fontSize: "14px",
    },
    switchLink: {
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default AuthScreen;