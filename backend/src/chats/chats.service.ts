import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [
    {
      UID: 'me',
      chatID: 'q1w2e3r4!',
      createAt: '2022-04-20D18:57T',
      text: '초기 챗#1',
    },
    {
      UID: 'me',
      chatID: 'q1w2e3r4!',
      createAt: '2022-04-20D19:57T',
      text: '초기 챗#2',
    },
    {
      UID: 'other',
      chatID: 'q1w2e3r4!',
      createAt: '2022-04-20D20:55T',
      text: '초기 챗#3',
    },
  ];

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    // return `This action returns all chats`;
    console.log('모든 채팅내역 전송');
    return this.chats;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
