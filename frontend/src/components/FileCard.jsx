import API from "../api";
import "./FileCard.css";


function FileCard(props) {


    const handleDownload = async () => {

        try {

            const token = localStorage.getItem("token");


            const response = await API.get(
                `/files/${props.fileId}/download`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    responseType: "blob"
                }
            );


            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );


            const link = document.createElement("a");


            link.href = url;

            link.setAttribute(
                "download",
                props.filename
            );


            document.body.appendChild(link);


            link.click();


            link.remove();


            window.URL.revokeObjectURL(url);


        } catch (error) {

            console.log(
                "Download failed:",
                error
            );

            alert("File download failed");

        }

    };


    return (

        <div className="file-card">


            <div className="file-card-left">


                <div className="file-type-icon">
                    PDF
                </div>


                <div className="file-info">

                    <h3>
                        {props.filename}
                    </h3>

                    <p>
                        Uploaded: {props.date}
                    </p>

                </div>


            </div>


            <button
                className="download-button"
                onClick={handleDownload}
            >
                Download ↓
            </button>


        </div>

    );

}


export default FileCard;