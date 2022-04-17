import { PartialType } from '@nestjs/mapped-types';
import { CreateFrogDto } from './create-frog.dto';

export class UpdateFrogDto extends PartialType(CreateFrogDto) {}
