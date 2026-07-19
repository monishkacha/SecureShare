const express = require("express");
const path = require("path");
const fs = require("fs");
const File = require("../models/File");

const upload = require("../config/multerConfig");

const authMiddleware = require("../middleware/authMiddleware");

const {
  encryptFile,
  decryptFile,
} = require("../utils/encryption");

const router = express.Router();

/* =====================================================
   ROUTE 1: UPLOAD A FILE
===================================================== */

router.post(
  "/upload",

  authMiddleware,

  upload.single("file"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      // Path for encrypted file
      const encryptedPath = req.file.path + ".enc";

      // Encrypt uploaded file
      const { iv, authTag } = await encryptFile(
        req.file.path,
        encryptedPath
      );

      // Save encrypted file metadata
      const newFile = new File({
        originalName: req.file.originalname,

        // Add .enc because encrypted file is stored
        storedName: req.file.filename + ".enc",

        // Store encrypted file path
        path: encryptedPath,

        // Encrypted file size
        size: req.file.size,

        mimetype: req.file.mimetype,

        owner: req.userId,

        // Encryption metadata
        iv,
        authTag,
      });

      await newFile.save();

      res.status(201).json({
        message: "File uploaded and encrypted successfully",
        file: newFile,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "File upload failed",
      });
    }
  }
);

/* =====================================================
   ROUTE 2: GET LOGGED-IN USER'S FILES
===================================================== */

router.get(
  "/",

  authMiddleware,

  async (req, res) => {
    try {
      const files = await File.find({
        owner: req.userId,
      }).sort({
        uploadedAt: -1,
      });

      res.status(200).json({
        files: files,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to fetch files",
      });
    }
  }
);

/* =====================================================
   ROUTE 3: DOWNLOAD A FILE
   (Temporary - will be replaced after decryptFile() is built)
===================================================== */

router.get(
  "/:id/download",

  authMiddleware,

  async (req, res) => {
    try {
      const file = await File.findById(req.params.id);

      if (!file) {
        return res.status(404).json({
          message: "File not found",
        });
      }

      if (file.owner.toString() !== req.userId) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      const filePath = path.resolve(file.path);
      const username = req.userEmail.split("@")[0];
      const tempPath = path.join(
        "uploads",
        `temp-${username}-${Date.now()}-${file.originalName}`
        );

    await decryptFile(
        filePath,
        tempPath,
        file.iv,
        file.authTag
);

      res.download(
        tempPath,
        file.originalName,
        (error) => {

    fs.unlink(tempPath, (unlinkError) => {

        if (unlinkError) {
            console.log(
                "Temporary file deletion failed:",
                unlinkError
            );
        }

    });

    if (error) {

        console.log(
            "Download error:",
            error
        );

    }

}
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "File download failed",
      });
    }
  }
);

module.exports = router;