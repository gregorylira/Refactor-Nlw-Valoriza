import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

const envs = dotenv.config();
envs.error && new Error("Couldn't find .env file");

var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

const BUCKET = process.env.URL_IMAGE_SERVER;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) return next();

  const image = req.file;
  const nomeArquivo = Date.now() + "." + image.originalname.split(".").pop();

  const file = bucket.file(nomeArquivo);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimeType,
    },
  });

  stream.on("error", (e) => {
    console.log(e);
  });

  stream.on("finish", async () => {
    //tornar o arquivo publico
    await file.makePublic();

    //obter a url publica
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;

    next();
  });

  stream.end(image.buffer);
}
