import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { create } from 'domain';
import { UserProfileDto } from './dtos/createUserProfile.dto';
import { CreateUserPostDto } from './dtos/CreateUserPost.dto';

@Controller('users')
export class UsersController {

    constructor(
        private UserService: UsersService
    ) {}


    @Get()
    async getUsers() {
        const users = await this.UserService.findUsers();
        return users;
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        
        const newUser = this.UserService.createUser(createUserDto);
        return newUser
    }

     @Patch(':id')
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        
        const updatedUserDeatils = this.UserService.updateUserById(id, updateUserDto);
        return updatedUserDeatils
    }

    @Post(':id/profiles')
    createUserprofile(@Param ('id', ParseIntPipe )id: number, @Body() createProfileDto: UserProfileDto) {
        return this.UserService.createProfile(id, createProfileDto);
    }

    @Post(':id/posts')
    createUserPost(@Param ('id', ParseIntPipe )id: number, @Body() createUserPost: CreateUserPostDto) {
        return this.UserService.createUserPost(id, createUserPost);
    }
}
