import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  content: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const query = async (data: { question: string }) => {
    const response = await fetch(
      "http://127.0.0.1:3001/api/v1/prediction/58176ce6-bc22-4ba8-9c43-4439ab962931",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { content: inputMessage, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await query({ question: inputMessage });
      const botMessage = { content: response.response, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from the chatbot.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-lg border bg-background shadow-lg">
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;