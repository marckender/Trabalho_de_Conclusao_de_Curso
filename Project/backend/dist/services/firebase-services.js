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
const uploadImage = (req, res, next) => {
    if (!req.file)
        return next();
    const imagem = req.file;
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
    stream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
        //tornar o arquivo publico
        yield file.makePublic();
        //obter a url publica
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;
        next();
    }));
    stream.end(imagem.buffer);
};
module.exports = uploadImage;
//# sourceMappingURL=firebase-services.js.map