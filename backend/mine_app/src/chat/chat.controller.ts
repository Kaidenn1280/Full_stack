// chat.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

class ChatDto {
  message: string;
  history?: { role: string; content: string }[];
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() body: ChatDto) {
    const { message, history } = body;

    if (!message || message.trim() === '') {
      return { error: 'Message is required' };
    }

    try {
      const reply = await this.chatService.chat(message, history);
      return { reply };
    } catch (err) {
      console.error('Gemini error:', err);
      return { error: 'Something went wrong talking to Gemini' };
    }
  }
}
