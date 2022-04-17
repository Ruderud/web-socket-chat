import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat, ErrorMsg } from './interfaces/cat.interfaces';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findOne(@Query() params): string {
    try {
      const findResult: Cat = this.catsService.findOne(Number(params.age));
      return `find ${params.age}years cat result: ${findResult.name}`;
    } catch (error) {
      return `find ${params.age}years cat result: ${error}`;
    }
  }
}
