import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectTrigger } from "./components/ui/select";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex item-center justify-between border-b">
        <h1 className="text-xl font-bold">Upload AI</h1>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-3">
          <span className="text-small text-muted-foreground">
            Desenvolvido com amor no NLW da Rocketseat
          </span>
          <Button variant="outline">
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col gap-6 w-1/2">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA..."
              className="resize-none p-4 leading-relaxed"
            />
            <Textarea
              placeholder="Resultado gerado pela IA"
              className="resize-none p-4 leading-relaxed"
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: vocẽ pode utilizar a variavel{" "}
            <code className="text-violet-400">{"{transcription}"}</code> no seu
            prompt para adicionar o conteudo da transcrição do video
            selecionado.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4" />
              Selecione um video
            </label>
            <input
              type="file"
              name="video"
              id="video"
              className="sr-only"
              accept="video/mp4"
            />

            <Separator />

            <div className="space-y-1">
              <Label htmlFor="transcription-prompt">
                Prompt de transcrição
              </Label>
              <Textarea
                id="transcription-prompt"
                placeholder="Inclua palavras-chave mencionadas no video separadas por vírgula(,)"
                className="h-20 leading-relaxed resize-none"
              />
            </div>

            <Button className="w-full">
              Carregar video
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="keywords">Modelo</Label>
              <Select>
                <SelectTrigger></SelectTrigger>
              </Select>
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
}
