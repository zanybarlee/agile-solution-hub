import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Minimize2, RotateCcw } from "lucide-react";

interface Message {
  content: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { toast } = useToast();

const generateAIResponse = async (userInput) => {
  const data = { question: userInput };

  try {
    const response = await fetch(
      "http://127.0.0.1:3001/api/v1/prediction/58176ce6-bc22-4ba8-9c43-4439ab962931",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
};


const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission

  // Ensure inputMessage is defined and trimmed
  if (inputMessage.trim()) {
    const userMessage = { content: inputMessage, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage(''); // Clear the input field

    try {
      setIsLoading(true); // Set loading state
      const aiResponseText = await generateAIResponse(inputMessage); // Pass 'inputMessage' to the API call
      const aiMessage = { content: aiResponseText, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }
};




  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClearHistory = () => {
    setMessages([]);
    toast({
      title: "Chat history cleared",
      description: "Your conversation has been cleared.",
    });
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-accent hover:bg-accent-light"
        aria-label="Toggle chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div 
          className={`fixed bottom-20 right-4 w-full max-w-[400px] rounded-lg border bg-background shadow-lg animate-fade-in ${
            isMinimized ? 'h-12' : ''
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Chat with us</h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearHistory}
                className="h-8 w-8"
                aria-label="Clear chat history"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMinimize}
                className="h-8 w-8"
                aria-label="Minimize chat"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <div className="p-4">
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
                            ? "bg-accent text-white"
                            : "bg-secondary"
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
                <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent-light">
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;