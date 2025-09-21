import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUser.dto';

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
}
