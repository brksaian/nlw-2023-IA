import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  function handlePromptSelected(promptId: string): void {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) return;

    onPromptSelected(selectedPrompt.template);
  }

  useEffect(() => {
    api
      .get("/prompts")
      .then((response) => {
        setPrompts(response.data);
      })
      .catch((error) => {
        console.warn("❌ ~ PromptSelect ~ api.get ~ error:", error);
      });
  }, []);

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger aria-label="Selecione um tipo de prompt listado.">
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
