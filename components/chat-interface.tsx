"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatService, getCurrentTime } from "@/services/chat-api";
import type { ChatMessage } from "@/services/chat-api";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    // Create a new user message
    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: getCurrentTime(),
    };

    // Add the user message to the messages array
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Store the message content before clearing the input
    const messageToSend = input;

    // Clear the input field
    setInput("");

    // Set loading state
    setIsLoading(true);

    try {
      // Send message to API and get response
      const agentResponse = await chatService.sendMessage(messageToSend);

      // Add the agent's response to the messages
      setMessages((prevMessages) => [...prevMessages, agentResponse]);
    } catch (error) {
      console.error("Error getting agent response:", error);

      // Add an error message
      const errorMessage: ChatMessage = {
        role: "agent",
        content:
          "Sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: getCurrentTime(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending message when Enter key is pressed (without Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground p-8">
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 max-w-[80%]",
                  message.role === "user" && "ml-auto"
                )}
              >
                {message.role === "agent" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {message.role === "agent" ? "GenerativeAgent" : "You"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  {message.role === "agent" && (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-32"
            disabled={isLoading}
          />
          <Button
            className="px-8"
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ""}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
