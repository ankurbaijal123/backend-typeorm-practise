import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private  UserRepository:  Repository<User>) {}

    async findUsers() {
        return await this.UserRepository.find({ select: ["username", "password"] });
    }

    async createUser(userDetails: CreateUserParams) {
        const newUser = this.UserRepository.create({...userDetails,
            createdAt: new Date()
        })

        const res = await this.UserRepository.save(newUser);
        return res;
    }

    async updateUserById(id: number, updateUserData: UpdateUserParams) {
        return this.UserRepository.update({id}, {...updateUserData, updatedAt: new Date()});
    }
}
