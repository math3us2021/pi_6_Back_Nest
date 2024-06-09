"use strict";
// dashboard.controller.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const login_service_1 = require("../login/login.service");
const movies_service_1 = require("../movies/movies.service");
let DashboardController = class DashboardController {
    constructor(userService, loginService, moviesService) {
        this.userService = userService;
        this.loginService = loginService;
        this.moviesService = moviesService;
    }
    getDashboardStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const newUsersThisMonth = yield this.userService.countNewUsersThisMonth();
            const totalUsers = yield this.userService.countTotalUsers();
            const distinctUsersAccessedPlatform = yield this.loginService.countDistinctUsersAccessedPlatform();
            const totalMovies = yield this.moviesService.countTotalMovies();
            return {
                newUsersThisMonth,
                totalUsers,
                distinctUsersAccessedPlatform,
                totalMovies,
            };
        });
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        login_service_1.LoginService,
        movies_service_1.MoviesService])
], DashboardController);
