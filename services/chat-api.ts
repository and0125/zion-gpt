// File: services/chat-api.ts

export interface ChatMessage {
  role: "agent" | "user";
  content: string;
  timestamp: string;
}

// Service to handle API communication
export const chatService = {
  /**
   * Send a message to the agent API and get a response
   * @param message The user's message text
   * @returns Promise that resolves to the agent's response
   */
  sendMessage: async (message: string): Promise<ChatMessage> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response from agent");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending message to API:", error);

      // Return a fallback message if the API call fails
      return {
        role: "agent",
        content:
          "I'm sorry, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: getCurrentTime(),
      };
    }
  },
};

// Helper function to get current time
export const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
