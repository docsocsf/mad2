import { Test, TestingModule } from '@nestjs/testing';
import { FresherController } from './fresher/fresher.controller';
import { FresherService } from './fresher/fresher.service';

describe('AppController', () => {
  let fresherController: FresherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FresherController],
      providers: [FresherService],
    }).compile();

    fresherController = app.get<FresherController>(FresherController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(fresherController.getHello()).toBe('Hello World!');
  //   });
  // });
});
