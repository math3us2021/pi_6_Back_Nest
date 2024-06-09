// dashboard.controller.ts

import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';
import { MoviesService } from '../movies/movies.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService,
    private readonly moviesService: MoviesService,
  ) {}

  @Get('stats')
  async getDashboardStats() {
    const newUsersThisMonth = await this.userService.countNewUsersThisMonth();
    const totalUsers = await this.userService.countTotalUsers();
    const distinctUsersAccessedPlatform = await this.loginService.countDistinctUsersAccessedPlatform();
    const totalMovies = await this.moviesService.countTotalMovies();

    return {
      newUsersThisMonth,
      totalUsers,
      distinctUsersAccessedPlatform,
      totalMovies,
    };
  }
}
