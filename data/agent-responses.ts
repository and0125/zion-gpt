// File: data/agent-responses.ts

export interface AgentResponseData {
  id: string;
  content: string;
  category: "greeting" | "billing" | "account" | "technical" | "general";
}

export const agentResponses: AgentResponseData[] = [
  {
    id: "greeting-1",
    content: `Hello! I'm your customer service agent. How can I help you today?`,
    category: "greeting",
  },
  {
    id: "billing-1",
    content: `I've checked your account and your current balance is $235.78, due on April 15, 2025.`,
    category: "billing",
  },
  {
    id: "billing-2",
    content: `Your last payment of $150.00 was received on February 28, 2025. It typically takes 2-3 business days for payments to be reflected in your balance.`,
    category: "billing",
  },
  {
    id: "billing-3",
    content: `Based on your account history, you're eligible for our premium discount of 15%. Would you like me to apply that to your next bill?`,
    category: "billing",
  },
  {
    id: "billing-4",
    content: `I can help you set up automatic payments to avoid any late fees in the future. You can choose either a bank account or credit card for the monthly withdrawals.`,
    category: "billing",
  },
  {
    id: "account-1",
    content: `I can see that your account was created on January 15, 2023. You're currently on our Premium Plan with unlimited data.`,
    category: "account",
  },
  {
    id: "account-2",
    content: `Your account security settings were last updated 3 months ago. We recommend reviewing these settings every quarter for optimal protection.`,
    category: "account",
  },
  {
    id: "technical-1",
    content: `I'm sorry you're experiencing issues with our service. Let's try resetting your connection. Can you please turn your device off and on again?`,
    category: "technical",
  },
  {
    id: "technical-2",
    content: `Our system shows a temporary outage in your area that should be resolved within the next hour. We appreciate your patience.`,
    category: "technical",
  },
  {
    id: "general-1",
    content: `Thank you for that information. Is there anything else I can help you with today?`,
    category: "general",
  },
  {
    id: "general-2",
    content: `I understand your concern. Let me look into this matter further for you.`,
    category: "general",
  },
  {
    id: "general-3",
    content: `I appreciate your patience while we resolve this issue. Your satisfaction is our top priority.`,
    category: "general",
  },
];
