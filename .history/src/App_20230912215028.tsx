import { Button } from "./components/ui/button";
import { Github } from "lucide-react";
import { Separator } from "./components/ui/separator";

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
          <div className="grid grid-rows-2 gap-4 flex-1"></div>
          <p className="text-sn text-muted-foreground">
            Lembre-se: vocẽ pode utilizar a variavel{" "}
            <code className="font-violet-400">transportation</code> no seu
            prompt para adicionar o conteudo da transcrição do video
            selecionado.
          </p>
        </div>
        <aside className="w-80"></aside>
      </main>
    </div>
  );
}
