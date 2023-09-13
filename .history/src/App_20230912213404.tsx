import { Button } from "./components/ui/button";

export function App() {
  return (
    <div>
      <div className="px-6 py-3 flex item-center justify-between border-b">
        <h1 className="text-xl">Upload AI</h1>

        <div>
          <span>Desenvolvido com amor no NLW da Rocketseat </span>
          <Button>GitHub</Button>
        </div>
      </div>
    </div>
  );
}