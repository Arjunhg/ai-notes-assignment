export const mockChatResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple response logic based on message content
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! How can I help you with your notes today?';
  }

  if (lowerMessage.includes('help')) {
    return 'I can help you with:\n- Writing and formatting notes\n- Organizing your thoughts\n- Suggesting improvements\n- Answering questions about your notes\n\nWhat would you like help with?';
  }

  if (lowerMessage.includes('format')) {
    return 'Here are some formatting tips:\n1. Use headings (H1, H2, H3) for structure\n2. Create lists for better organization\n3. Use bold and italic for emphasis\n4. Add tags to categorize your notes\n5. Pin important notes for quick access';
  }

  if (lowerMessage.includes('tag')) {
    return 'To add tags to your note:\n1. Click the tag icon in the note header\n2. Type your tag and press Enter\n3. Tags help organize and filter your notes\n4. You can add multiple tags to each note';
  }

  if (lowerMessage.includes('color')) {
    return 'You can change your note color by:\n1. Clicking the paint brush icon\n2. Selecting from available colors\n3. Colors help visually organize your notes\n4. The color will be saved automatically';
  }

  // Default response
  return "I'm here to help you with your notes. You can ask me about formatting, organization, or any other note-related questions. What would you like to know?";
}; 