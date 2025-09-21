import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { Post } from 'src/entities/Post.entity';
import { Profile } from 'src/entities/Profile.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserParams, UpdateUserParams, UserProfileParams } from 'src/utils/types/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private UserRepository: Repository<User>,
        @InjectRepository(Profile) private ProfileRepository: Repository<Profile>,
        @InjectRepository(Post) private PostRepository: Repository<Post>) { }

    async findUsers() {
        return await this.UserRepository.find({ relations: ['profile', 'posts'] });
    }

    async createUser(userDetails: CreateUserParams) {
        const newUser = this.UserRepository.create({
            ...userDetails,
            createdAt: new Date()
        })

        const res = await this.UserRepository.save(newUser);
        return res;
    }

    async updateUserById(id: number, updateUserData: UpdateUserParams) {
        return this.UserRepository.update({ id }, { ...updateUserData, updatedAt: new Date() });
    }

    async createProfile(id: number, userProfileData: UserProfileParams) {
        const user = await this.UserRepository.findOneByOrFail({ id });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        const profile = this.ProfileRepository.create(userProfileData );
        const savedProfile = await this.ProfileRepository.save(profile);
        user.profile = savedProfile;
        await this.UserRepository.save(user);
        return savedProfile


    }

    async createUserPost(id: number, createUserPost) {
        const user = await this.UserRepository.findOneByOrFail({ id });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        const post = this.PostRepository.create({ ...createUserPost, user });
        const savedPost = await this.PostRepository.save(post);
        return savedPost
    }
}
