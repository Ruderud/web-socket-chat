import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interfaces';

@Injectable()
export class CatsService {
  // private readonly cats: Cat[] = [
  private cats: Cat[] = [
    { age: 1, breed: '껄룩종', name: '껄룩' },
    { age: 2, breed: '나이든껄룩종', name: '나이든껄룩' },
    { age: 3, breed: '틀딱껄룩종', name: '틀딱껄룩' },
    { age: 4, breed: '틀틀딱껄룩종', name: '틀틀딱껄룩' },
  ];

  create(cat: Cat) {
    const alreadyAdded = this.cats.some((curCat) => curCat.name === cat.name);

    if (alreadyAdded) return;

    this.cats.push({
      age: Number(cat.age),
      breed: cat.breed,
      name: cat.name,
    });
    console.log('new', this.cats);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(queryAge: number): Cat {
    const foundOne = this.cats.filter((cat) => cat.age === queryAge);
    if (!foundOne.length) {
      throw new Error('not Found');
    }
    return foundOne[0];
  }
}
