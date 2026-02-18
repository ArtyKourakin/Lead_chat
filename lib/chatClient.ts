type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export async function sendToModel(messages: ChatMessage[]): Promise<string> {
  // TODO: Integrate with real model API and pass SYSTEM_PROMPT_RU with chat history.
  await new Promise((resolve) => setTimeout(resolve, 250));
  return `Mock response for ${messages.length} messages`;
}
