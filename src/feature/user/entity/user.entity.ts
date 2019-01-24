import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsString()
  @IsNotEmpty()
  account: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  roles: [string] = ['regular'];

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  isDisabled: boolean = false;
}
