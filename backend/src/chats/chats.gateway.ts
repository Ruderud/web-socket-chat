import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway(443, { namespace: 'chats', transports: ['websocket'] })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatsService: ChatsService) {}

  // @SubscribeMessage('chats')
  // handleEvent(@MessageBody() data: string): string {
  //   return data;
  // }
  // @SubscribeMessage('events')
  // say;

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('chats')
  handleEvent(@MessageBody() data: string): string {
    console.log('recived text : ', data);
    return data;
  }

  @SubscribeMessage('reciveChat')
  reciveMessage(
    @MessageBody() data: any, // 클라이언트로부터 들어온 데이터
    @ConnectedSocket() client: Socket,
  ) {
    console.log('reciveData:', data);

    this.server.emit('sendChat', data);
  }

  @SubscribeMessage('sendChat')
  sendMessage(
    @MessageBody() data: any, // 클라이언트로부터 들어온 데이터
    @ConnectedSocket() client: Socket,
  ) {
    console.log('reciveData:', data);

    return data;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client}`);
  }

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @SubscribeMessage('findAllChats')
  findAll() {
    return this.chatsService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatsService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatsService.remove(id);
  }
}
