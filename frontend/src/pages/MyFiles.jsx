import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import FileCard from "../components/FileCard";
import API from "../api";

import "./MyFiles.css";


function MyFiles() {

    const navigate = useNavigate();


    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");



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

                console.log(error);

                setMessage(
                    error.response?.data?.message ||
                    "Failed to load files"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchFiles();


    }, []);



    return (

        <div className="myfiles-page">

            <Navbar title="My Files" />


            <main className="myfiles-content">


                {/* PAGE HEADING */}

                <section className="myfiles-header">

                    <div>

                        <p className="myfiles-label">
                            YOUR STORAGE
                        </p>

                        <h1>
                            My Files
                        </h1>

                        <p className="myfiles-description">
                            View and manage all the documents stored
                            in your SecureShare account.
                        </p>

                    </div>


                    <button
                        className="new-upload-button"
                        onClick={() => navigate("/upload")}
                    >
                        + Upload new file
                    </button>

                </section>



                {/* STORAGE SUMMARY */}

                <section className="files-summary">

                    <div className="summary-item">

                        <span className="summary-number">
                            {files.length}
                        </span>

                        <div>

                            <strong>
                                Total files
                            </strong>

                            <p>
                                Documents in your storage
                            </p>

                        </div>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="summary-item">

                        <span className="summary-symbol">
                            LOCK
                        </span>

                        <div>

                            <strong>
                                Protected
                            </strong>

                            <p>
                                Authentication required
                            </p>

                        </div>

                    </div>

                </section>



                {/* FILE LIST */}

                <section className="all-files-section">


                    <div className="files-section-header">

                        <div>

                            <p>
                                ALL DOCUMENTS
                            </p>

                            <h2>
                                Your files
                            </h2>

                        </div>


                        <span className="file-count">
                            {files.length} files
                        </span>

                    </div>



                    <div className="all-files-list">


                        {loading ? (

                            <p>
                                Loading files...
                            </p>

                        ) : message ? (

                            <p>
                                {message}
                            </p>

                        ) : files.length > 0 ? (

                            files.map((file) => (

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

                            <div className="empty-files">

                                <div className="empty-icon">
                                    FILE
                                </div>


                                <h3>
                                    No files yet
                                </h3>


                                <p>
                                    Upload your first file to get started.
                                </p>


                                <button
                                    onClick={() => navigate("/upload")}
                                >
                                    Upload a file
                                </button>

                            </div>

                        )}


                    </div>

                </section>



                {/* BACK TO DASHBOARD */}

                <button
                    className="back-dashboard-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back to Dashboard
                </button>


            </main>

        </div>

    );

}


export default MyFiles;