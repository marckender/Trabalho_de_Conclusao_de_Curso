var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const serviceAccount = require("../config/firebase-data.json");
let admin = require("firebase-admin");
const BUCKET = "afro-home.appspot.com";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});
const bucket = admin.storage().bucket();
const uploadImages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files || req.files.length === 0)
        return next();
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
        return new Promise((resolve, reject) => {
            stream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                // Tornar o arquivo público
                yield file.makePublic();
                // Obter a URL pública
                imagem.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;
                resolve();
            }));
            stream.end(imagem.buffer);
        });
    });
    yield Promise.all(uploadPromises);
    next();
});
module.exports = uploadImages;
//# sourceMappingURL=firebase-services.js.map