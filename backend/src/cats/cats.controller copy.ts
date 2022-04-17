import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  All,
  HttpCode,
  Header,
  Delete,
  Redirect,
  Query,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interfaces';
import { CreateCatDto } from './dto/create-cat.dto';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  //   constructor(private catsService: CatsService) {}

  //   @Post()
  //   //   @Header('Cache-Control', 'none') 이런식으로 req header핸들가능
  //   create(): string {
  //     return 'this action adds new cat';
  //   }

  //   @Delete()
  //   @Redirect('https://nestjs.com', 301)
  //   getDocs(@Query('version') version) {
  //     // ...&version=5 에서 version 쿼리값 5으로 판별
  //     if (version && version === '5') {
  //       return { url: 'https://docs.nestjs.com/v5/' };
  //     }
  //   }

  //   @Get() //@Get('c*t') // it will find cat, cot, ct, clt... ect
  //   @HttpCode(200)
  //   findAll(@Req() request: Request): string {
  //     return 'This action returns all cats';
  //   }

  //   @Get(':id')
  //   findOne(@Param() params): string {
  //     console.log(params.id);
  //     return `This action returns a #${params.id} cat`;
  //   }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  //   @Get()
  //   findAll(@Query() query: ListAllEntities) {
  //     return `This action returns all cats (limit: ${query.limit} items)`;
  //   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //     return `This action updates a #${id} cat`;
  //   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
