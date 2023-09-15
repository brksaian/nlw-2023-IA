import { openia } from "./../lib/openia";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { createReadStream } from "fs";

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, template, temperature } = bodySchema.parse(req.body);

    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video?.transcription) {
      return reply.status(400).send({ error: "Transcription not found" });
    }

    const promptMessage = template.replace(
      "{transcription}",
      video.transcription
    );

    const response = await openia.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptMessage }],
      temperature,
    });
    return {
      response,
    };
  });
}
