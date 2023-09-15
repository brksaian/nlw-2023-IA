import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import fastifyMultipart, { MultipartFile } from "@fastify/multipart";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";
const { pipeline } = require("node:stream");

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 /*1MB*/ * 25, // 25MB
    },
  });
  app.post("/videos", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data: MultipartFile | undefined = await request.file();

      if (!data) {
        return reply.status(400).send({ error: "No file uploaded" });
      }

      const extension = path.extname(data.filename);

      if (extension !== ".mp3") {
        return reply.status(400).send({ error: "Invalid input type" });
      }

      const fileBaseName = path.basename(data.filename, extension);
      const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
      const uploadDestination = path.resolve(
        __dirname,
        "../../tmp",
        fileUploadName
      );

      await pump(data.file, fs.createWriteStream(uploadDestination));

      const video = await prisma.video.create({
        data: {
          name: data.filename,
          path: uploadDestination,
        },
      });

      return reply.status(200).send(video);
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}
