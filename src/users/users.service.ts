import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error finding users");
    }
  }

  findOne(id: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Error finding user");
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update({ id }, updateUserDto);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Error updating user");
    }
  }

  remove(id: string) {
    try {
      return this.userRepository.delete({ id });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Error deleting user");
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error finding user");
    }
  }
}
