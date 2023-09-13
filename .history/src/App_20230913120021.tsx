import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload, Wand2 } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";

export function App() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <div className="px-6 py-3 flex item-center justify-between border-b">
        <h1 className="text-xl font-bold">Upload AI</h1>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-3">
          <span className="text-small text-muted-foreground">
            Desenvolvido com ❤️ no NLW da Rocketseat
          </span>
          <Button variant="outline">
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
      <main className="flex-1 p-6 flex gap-6 bg-red-500">
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
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"title"}>Titulo do Youtube</SelectItem>
                  <SelectItem value={"description"}>
                    Descrição do Youtube
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xm text-muted-foreground block italic">
                Você poderá customizar esse opção em breve
              </span>
            </div>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="keywords">Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"gpt3.5"}>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xm text-muted-foreground block italic">
                Você poderá customizar esse opção em breve
              </span>
            </div>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="keywords">Modelo</Label>
              <Slider min={0} max={1} step={0.1} />
              <span className="text-xm text-muted-foreground block italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo,
                mas com possiveis erros.
              </span>

              <Separator />

              <Button className="w-full" type="submit">
                Executar
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
}
