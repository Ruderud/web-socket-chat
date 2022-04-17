import { Injectable } from '@nestjs/common';
import { CreateFrogDto } from './dto/create-frog.dto';
import { UpdateFrogDto } from './dto/update-frog.dto';

@Injectable()
export class FrogService {
  create(createFrogDto: CreateFrogDto) {
    return 'This action adds a new frog';
  }

  findAll() {
    return `This action returns all frog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} frog`;
  }

  update(id: number, updateFrogDto: UpdateFrogDto) {
    return `This action updates a #${id} frog`;
  }

  remove(id: number) {
    return `This action removes a #${id} frog`;
  }
}
