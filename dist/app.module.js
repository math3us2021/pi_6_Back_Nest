"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const login_model_1 = require("./login/login.model");
const user_model_1 = require("./user/user.model");
const genre_model_1 = require("./genre/genre.model");
const movies_model_1 = require("./movies/movies.model");
const status_model_1 = require("./status/status.model");
const pub_sub_module_1 = require("./pub-sub/pub-sub.module");
const sugestion_module_1 = require("./sugestion/sugestion.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [login_model_1.LoginModule, user_model_1.UserModule, genre_model_1.GenreModule, movies_model_1.MoviesModule, status_model_1.StatusModule, pub_sub_module_1.PubSubModule, sugestion_module_1.SugestionModule, dashboard_module_1.DashboardModule],
    })
], AppModule);
