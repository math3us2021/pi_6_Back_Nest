import { Module } from '@nestjs/common';
import {DashboardController} from './dashboard.controller';
import {UserService} from "../user/user.service";
import {MoviesService} from "../movies/movies.service";
import {LoginService} from "../login/login.service";
@Module({
  controllers: [DashboardController],
  providers: [UserService, LoginService, MoviesService],
})
export class DashboardModule {}
