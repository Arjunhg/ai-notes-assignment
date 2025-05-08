export const mockChatResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock responses based on user input
  const responses: Record<string, string> = {
    'hello': 'Hello! How can I help you with your notes today?',
    'help': 'I can help you organize your notes, suggest improvements, or answer questions about your content.',
    'default': 'I understand. How else can I assist you with your notes?'
  };

  const lowerMessage = message.toLowerCase();
  return responses[lowerMessage] || responses.default;
}; 