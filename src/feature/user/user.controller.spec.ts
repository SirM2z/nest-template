import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: UserController = module.get<UserController>(UserController);
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should return "hello world"', () => {
      const appController = module.get<UserController>(UserController);
      expect(appController.index()).toBe('hello world');
    });
  });
});
