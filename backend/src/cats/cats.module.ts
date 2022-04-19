import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

//@Global()내에서 controller와 service를 선언시 전역에서 사용가능하다.
//단 한번만 선언가능하며, 선언시 내보내기를 하지않더라도 다른 resource에서 재사용가능

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  //   exports: [CatsService], //다른인스턴스에서 재사용할 수 있게끔 내보내기 가능
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
