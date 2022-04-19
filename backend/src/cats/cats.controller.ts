import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Redirect,
  HttpStatus,
  HttpCode,
  Res,
  HttpException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interfaces';
import { STATUS_CODES } from 'http';
import { response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
    } catch (error) {
      console.log(error);
      return;
    }

    this.catsService.create(createCatDto);
  }

  @Get()
  @HttpCode(200)
  async findOne(@Query() params): Promise<string> {
    try {
      const findResult: Cat = this.catsService.findOne(Number(params.age));
      return findResult.name;
    } catch (error) {
      console.log("can't Find" + params.age + 'cat', HttpStatus.BAD_REQUEST);
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }
  }
}
