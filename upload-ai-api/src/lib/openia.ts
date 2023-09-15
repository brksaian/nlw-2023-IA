import { OpenAI } from "openai";
import "dotenv/config";

export const openia = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
