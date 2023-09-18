import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FileVideo, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void;
}

const statusMessage = {
  converting: "Convertendo...",
  uploading: "Carregando...",
  generating: "Gerando transcrição...",
  success: "Video carregado com sucesso!",
};

export function VideoInputForm(props: VideoInputFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [status, setStatus] = useState<Status>("waiting");

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;
    if (!files) return;

    const selectedFile = files[0];

    setSelectedFile(selectedFile);
  }

  async function convertVideoToAudio(video: File) {
    console.log("Convert started.");

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    ffmpeg.on("progress", (progress) => {
      console.log("Convert progress:", Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    console.log("Convert finished.");

    return audioFile;
  }

  async function handleUploadVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!selectedFile) return;

    setStatus("converting");

    const audioFile = await convertVideoToAudio(selectedFile);

    const data = new FormData();

    setStatus("uploading");

    data.append("file", audioFile);

    const response = await api.post("/videos", data);

    const videoId = response.data.id;

    setStatus("converting");

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });

    setStatus("success");

    props.onVideoUploaded(videoId);

    console.log("Finalizou");
  }

  const previewURL = useMemo(() => {
    if (!selectedFile) return null;

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video
            src={previewURL}
            className="pointer-events-none absolute inset-0"
            controls={false}
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um video
          </>
        )}
      </label>
      <input
        type="file"
        name="video"
        id="video"
        className="sr-only"
        accept="video/mp4"
        onChange={handleFileChange}
      />

      <Separator />

      <div className="space-y-1">
        <Label htmlFor="transcription-prompt">Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          disabled={status !== "waiting"}
          id="transcription-prompt"
          placeholder="Inclua palavras-chave mencionadas no video separadas por vírgula(,)"
          className="h-20 leading-relaxed resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full data-[success=true]:bg-emerald-400"
        disabled={status !== "waiting"}
        data-success={status === "success"}
      >
        {status === "waiting" ? (
          <>
            Carregar vídeo
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessage[status]
        )}
      </Button>
    </form>
  );
}
