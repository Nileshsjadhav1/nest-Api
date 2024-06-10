import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Users from './schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: mongoose.Model<Users>,
    ) { }
    async getUsers() {
        const users = await this.userModel.find();
        return users;
    }
    async getSingleUser(id) {
        const user = await this.userModel.findById(id);
        return user
    }
    async createUser(userDetails) {
        console.log(userDetails)
        const user = await this.userModel.create(userDetails);
        return user
    }
    async deleteUser(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        return user
    }
    async editUser(id, user) {
        const users = await this.userModel.findByIdAndUpdate(id, user)
        return users
    }
}
