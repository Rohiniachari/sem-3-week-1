const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.post("/remove-bg", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        console.log("Image received:", req.file.originalname);

        // Simulate processing
        res.json({ message: "Image processed successfully." });
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Failed to process image." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
