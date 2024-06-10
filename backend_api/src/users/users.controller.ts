import { Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService) { }
    @Header('Access-Control-Allow-Origin', '*') 
    findAll(): string {
      return 'This action returns all examples';
    }
    @Get('')
    getUsers() {
        return this.usersServices.getUsers();
    }
    @Get(':id')
    getSingleUsers(@Param('id') id) {
        return this.usersServices.getSingleUser(id);
    }
    @Post('')
    createUsers(@Body() user) {
        return this.usersServices.createUser(user);
    }
    @Put(':id')
    editUser(@Param('id') id, @Body() user) {
        return this.usersServices.editUser(id, user);
    }
    @Delete(':id')
    deleteUsers(@Param('id') id) {
        return this.usersServices.deleteUser(id);
    }
}
