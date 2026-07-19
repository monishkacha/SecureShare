import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import "./Upload.css";

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setMessage("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file first");
            return;
        }

        const formData = new FormData();

        formData.append("file", selectedFile);

        try {
            const token = localStorage.getItem("token");

            const response = await API.post(
                "/files/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);
            setSelectedFile(null);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Upload failed"
            );
        }
    };

    return (
        <div className="upload-page">

            <Navbar title="Want to Upload something? You're on the Right page" />

            <main className="upload-content">

                <div className="upload-heading">
                    <p className="upload-label">SECURE STORAGE</p>

                    <h1>Upload your file</h1>

                    <p className="upload-description">
                        Store your documents securely and access them
                        whenever you need.
                    </p>
                </div>

                <div className="upload-card">

                    <div className="upload-icon">
                        ↑
                    </div>

                    <h2>Select a file</h2>

                    <p className="upload-hint">
                        Choose a document from your computer to upload
                    </p>

                    <label className="file-select-area">

                        <input
                            type="file"
                            onChange={handleFileChange}
                        />

                        <span className="choose-file-button">
                            Browse Files
                        </span>

                        <span className="file-status">
                            {selectedFile
                                ? selectedFile.name
                                : "No file selected"}
                        </span>

                    </label>

                    {selectedFile && (
                        <div className="selected-file">

                            <div className="file-symbol">
                                FILE
                            </div>

                            <div className="file-info">
                                <strong>{selectedFile.name}</strong>

                                <span>
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </span>
                            </div>

                        </div>
                    )}

                    <button
                        className="upload-button"
                        onClick={handleUpload}
                    >
                        Upload File
                    </button>

                    {message && (
                        <p className="upload-message">
                            {message}
                        </p>
                    )}

                </div>

                <div className="security-note">
                    <span>🔒</span>
                    Your files are linked securely to your account
                </div>

            </main>

        </div>
    );
}

export default Upload;