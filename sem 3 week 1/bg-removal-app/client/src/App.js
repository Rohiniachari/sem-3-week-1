import React, { useState } from "react";
import axios from "axios";

function App() {
    const [image, setImage] = useState(null);
    const [bgRemovedImage, setBgRemovedImage] = useState(null);

    const handleUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const removeBackground = async () => {
        if (!image) return alert("Please upload an image first");

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:5000/remove-bg", formData, {
                responseType: "blob",
            });
            setBgRemovedImage(URL.createObjectURL(response.data));
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to remove background");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1 style={{ color: "blue" }}>AI Background Remover</h1>
            <input type="file" accept="image/*" onChange={handleUpload} />
            <button onClick={removeBackground}>Remove Background</button>

            {image && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: "300px" }} />
                </div>
            )}

            {bgRemovedImage && (
                <div>
                    <h2>Result:</h2>
                    <img src={bgRemovedImage} alt="Background Removed" style={{ width: "300px" }} />
                </div>
            )}
        </div>
    );
}

export default App;
