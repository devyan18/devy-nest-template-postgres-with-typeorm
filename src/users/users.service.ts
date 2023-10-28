import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private listOfUsers: User[] = [];

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(
      new Date().getTime().toString(),
      createUserDto.email,
      createUserDto.password,
      createUserDto.username,
    );

    this.listOfUsers.push(newUser);

    return Promise.resolve(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string): Promise<User> {
    const user = this.listOfUsers.find((user) => user.id === id);

    return Promise.resolve(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.listOfUsers.find((user) => user.email === email);

    return Promise.resolve(user);
  }
}
