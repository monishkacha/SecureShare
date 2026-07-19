const crypto = require("crypto");
const fs = require("fs");

const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const algorithm = "aes-256-gcm";

/* =====================================================
   ENCRYPT FILE
===================================================== */

const encryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {

    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(
      algorithm,
      key,
      iv
    );

    const input = fs.createReadStream(inputPath);

    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => {

      const authTag = cipher
        .getAuthTag()
        .toString("hex");

      fs.unlink(inputPath, (err) => {

        if (err) return reject(err);

        resolve({
          iv: iv.toString("hex"),
          authTag,
        });

      });

    });

    input.on("error", reject);
    output.on("error", reject);
    cipher.on("error", reject);

  });
};


/* =====================================================
   DECRYPT FILE
===================================================== */

const decryptFile = (
  inputPath,
  outputPath,
  iv,
  authTag
) => {

  return new Promise((resolve, reject) => {

    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, "hex")
    );

    decipher.setAuthTag(
      Buffer.from(authTag, "hex")
    );

    const input = fs.createReadStream(inputPath);

    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on("finish", () => {
      resolve(outputPath);
    });

    input.on("error", reject);

    output.on("error", reject);

    decipher.on("error", reject);

  });

};

module.exports = {
  encryptFile,
  decryptFile,
};