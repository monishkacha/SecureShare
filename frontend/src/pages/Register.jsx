import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            const response = await API.post("/auth/register", {
                name,
                email,
                password
            });

            console.log("SUCCESS:", response.data);

            setMessage(response.data.message);

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {
            console.log("ERROR:", error);

            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">

            <Navbar title="Register" />

            <main className="register-content">

                <div className="register-card">

                    <section className="register-form-section">

                        <div className="register-form-heading">

                            <p>JOIN SECURESHARE</p>

                            <h1>Create account</h1>

                            <span>
                                Create your personal space for storing
                                and managing files securely.
                            </span>

                        </div>


                        <div className="register-form">

                            <div className="register-field">

                                <label>Full name</label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            </div>


                            <div className="register-field">

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


                            <div className="register-field">

                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>


                            <button
                                className="register-button"
                                onClick={handleRegister}
                            >
                                Create my account
                            </button>


                            {message && (
                                <p className="register-message">
                                    {message}
                                </p>
                            )}


                            <div className="login-link">

                                <span>
                                    Already have an account?
                                </span>

                                <Link to="/">
                                    Login here
                                </Link>

                            </div>

                        </div>

                    </section>


                    <section className="register-visual">

                        <div className="register-badge">
                            YOUR PRIVATE SPACE
                        </div>

                        <h2>
                            Save it.
                            <br />
                            Find it.
                            <br />
                            Share it.
                        </h2>

                        <p>
                            One simple place for your files, built around
                            secure access and straightforward organization.
                        </p>


                        <div className="register-steps">

                            <div className="register-step">
                                <span>01</span>

                                <div>
                                    <strong>Create account</strong>
                                    <small>Your secure identity</small>
                                </div>
                            </div>


                            <div className="register-step">
                                <span>02</span>

                                <div>
                                    <strong>Upload files</strong>
                                    <small>Store documents safely</small>
                                </div>
                            </div>


                            <div className="register-step">
                                <span>03</span>

                                <div>
                                    <strong>Manage everything</strong>
                                    <small>Your files in one place</small>
                                </div>
                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Register;