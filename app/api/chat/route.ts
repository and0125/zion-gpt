// File: app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { agentResponses } from "@/data/agent-responses";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Process the message and get a response
    const response = await getAgentResponse(message);

    // Return the response with the current timestamp
    return NextResponse.json({
      role: "agent",
      content: response,
      timestamp: getCurrentTime(),
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Helper function to get the appropriate agent response
async function getAgentResponse(userMessage: string): Promise<string> {
  // Simple keyword matching to select relevant responses
  const lowercaseMessage = userMessage.toLowerCase();

  if (
    lowercaseMessage.includes("bill") ||
    lowercaseMessage.includes("payment") ||
    lowercaseMessage.includes("charge")
  ) {
    const billingResponses = agentResponses.filter(
      (r) => r.category === "billing"
    );
    return billingResponses[Math.floor(Math.random() * billingResponses.length)]
      .content;
  }

  if (
    lowercaseMessage.includes("account") ||
    lowercaseMessage.includes("profile") ||
    lowercaseMessage.includes("settings")
  ) {
    const accountResponses = agentResponses.filter(
      (r) => r.category === "account"
    );
    return accountResponses[Math.floor(Math.random() * accountResponses.length)]
      .content;
  }

  if (
    lowercaseMessage.includes("problem") ||
    lowercaseMessage.includes("issue") ||
    lowercaseMessage.includes("not working")
  ) {
    const technicalResponses = agentResponses.filter(
      (r) => r.category === "technical"
    );
    return technicalResponses[
      Math.floor(Math.random() * technicalResponses.length)
    ].content;
  }

  // Default to general responses
  const generalResponses = agentResponses.filter(
    (r) => r.category === "general"
  );
  return generalResponses[Math.floor(Math.random() * generalResponses.length)]
    .content;
}

// Helper function to get current time
function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
