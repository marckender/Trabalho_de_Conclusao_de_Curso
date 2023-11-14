const serviceAccount = require("../config/firebase-data.json");

let admin = require("firebase-admin");
const BUCKET = "afro-home.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  const uploadPromises = req.files.map((imagem) => {
    const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();
    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({
      metadata: {
        contentType: imagem.mimetype,
      },
    });

    stream.on("error", (e) => {
      console.error(e);
    });

    return new Promise<void>((resolve, reject) => {
      stream.on("finish", async () => {
        // Tornar o arquivo público
        await file.makePublic();

        // Obter a URL pública
        imagem.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;
        resolve();
      });

      stream.end(imagem.buffer);
    });
  });

  await Promise.all(uploadPromises);

  next();
};

module.exports = uploadImages;
