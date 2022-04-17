import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrogService } from './frog.service';
import { CreateFrogDto } from './dto/create-frog.dto';
import { UpdateFrogDto } from './dto/update-frog.dto';

@Controller('frog')
export class FrogController {
  constructor(private readonly frogService: FrogService) {}

  @Post()
  create(@Body() createFrogDto: CreateFrogDto) {
    return this.frogService.create(createFrogDto);
  }

  @Get()
  findAll() {
    return this.frogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrogDto: UpdateFrogDto) {
    return this.frogService.update(+id, updateFrogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frogService.remove(+id);
  }
}
