import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from '../../../core/enums/api-error-code.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  readonly id: ObjectID;

  @Column()
  @IsString({
    message: '用户姓名是必不可少的',
    context: { errorCode: ApiErrorCode.USER_NAME_INVALID },
  })
  @IsNotEmpty({
    message: '用户姓名是必不可少的',
    context: { errorCode: ApiErrorCode.USER_NAME_INVALID },
  })
  readonly account: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly roles: [string] = ['regular'];

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  readonly isDisabled: boolean = false;
}
