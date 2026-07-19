import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            setMessage(response.data.message);

            navigate("/dashboard");

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="login-page">

            <Navbar title="Login" />

            <main className="login-content">

                <div className="login-card">

                    <section className="login-welcome">

                        <div className="welcome-badge">
                            SECURE FILE SHARING
                        </div>

                        <h1>
                            Your files.
                            <br />
                            Your space.
                        </h1>

                        <p>
                            Keep your documents organized, secure,
                            and ready whenever you need them.
                        </p>

                        <div className="welcome-decoration">
                            <span>FILE</span>
                            <span>↑</span>
                            <span>LOCK</span>
                        </div>

                    </section>


                    <section className="login-form-section">

                        <div className="login-form-heading">
                            <p>WELCOME BACK</p>

                            <h2>Login</h2>

                            <span>
                                Enter your account details to continue.
                            </span>
                        </div>


                        <div className="login-form">

                            <div className="login-field">

                                <label>Email address</label>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>


                            <div className="login-field">

                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>


                            <button
                                className="login-button"
                                onClick={handleLogin}
                            >
                                Login to SecureShare
                            </button>


                            {message && (
                                <p className="login-message">
                                    {message}
                                </p>
                            )}


                            <div className="register-link">

                                <span>
                                    Don't have an account?
                                </span>

                                <Link to="/register">
                                    Create account
                                </Link>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Login;