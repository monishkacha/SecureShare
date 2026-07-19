import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import FileCard from "../components/FileCard";
import API from "../api";

import "./Dashboard.css";


function Dashboard() {

    const navigate = useNavigate();


    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchFiles = async () => {

            try {

                const token = localStorage.getItem("token");


                const response = await API.get("/files", {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                });


                setFiles(response.data.files);


            } catch (error) {

                console.log(
                    "Failed to load dashboard files:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchFiles();


    }, []);



    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };



    return (

        <div className="dashboard-page">

            <Navbar title="Dashboard" />


            <main className="dashboard-content">


                {/* =========================
                    WELCOME SECTION
                ========================= */}

                <section className="dashboard-hero">

                    <div className="dashboard-hero-text">

                        <p className="dashboard-label">
                            YOUR SECURE SPACE
                        </p>

                        <h1>
                            Welcome back.
                        </h1>

                        <p className="dashboard-description">
                            Upload, organize, and manage your files
                            from one secure place.
                        </p>

                    </div>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </section>



                {/* =========================
                    ACTION CARDS
                ========================= */}

                <section className="dashboard-actions">


                    <div
                        className="action-card upload-action"
                        onClick={() => navigate("/upload")}
                    >

                        <div className="action-number">
                            01
                        </div>

                        <div className="action-icon">
                            ↑
                        </div>

                        <h2>
                            Upload File
                        </h2>

                        <p>
                            Add a new document to your secure
                            personal storage.
                        </p>

                        <span className="action-link">
                            Start uploading →
                        </span>

                    </div>



                    <div
                        className="action-card files-action"
                        onClick={() => navigate("/files")}
                    >

                        <div className="action-number">
                            02
                        </div>

                        <div className="action-icon">
                            FILES
                        </div>

                        <h2>
                            My Files
                        </h2>

                        <p>
                            Browse and manage all the files
                            connected to your account.
                        </p>

                        <span className="action-link">
                            View your files →
                        </span>

                    </div>

                </section>



                {/* =========================
                    RECENT FILES
                ========================= */}

                <section className="recent-files-section">

                    <div className="section-heading">

                        <div>

                            <p>
                                RECENT ACTIVITY
                            </p>

                            <h2>
                                Recent files
                            </h2>

                        </div>


                        <button
                            className="view-all-button"
                            onClick={() => navigate("/files")}
                        >
                            View all
                        </button>

                    </div>



                    <div className="dashboard-files">


                        {loading ? (

                            <p>
                                Loading recent files...
                            </p>

                        ) : files.length > 0 ? (

                            files
                                .slice(0, 3)
                                .map((file) => (

                                    <FileCard
                                        key={file._id}

                                        fileId={file._id}

                                        filename={file.originalName}

                                        date={new Date(
                                            file.uploadedAt
                                            ).toLocaleDateString()}
                                    />

                                ))

                        ) : (

                            <p>
                                No files uploaded yet.
                            </p>

                        )}


                    </div>

                </section>



                {/* =========================
                    SECURITY STRIP
                ========================= */}

                <section className="dashboard-security">

                    <div className="security-symbol">
                        LOCK
                    </div>


                    <div>

                        <strong>
                            Your account is protected
                        </strong>

                        <p>
                            Only authenticated users can access
                            protected SecureShare routes.
                        </p>

                    </div>

                </section>


            </main>

        </div>

    );

}


export default Dashboard;