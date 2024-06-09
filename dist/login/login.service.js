"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
// login.service.ts
const common_1 = require("@nestjs/common");
const prisma_service_1 = __importDefault(require("../prisma/prisma.service"));
let LoginService = class LoginService {
    constructor() {
        this.prisma = prisma_service_1.default;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            console.log(data);
            const consulta_login = yield this.prisma.user.findMany({
                where: { email },
            });
            console.log(consulta_login);
            if (consulta_login.length === 0) {
                return false;
            }
            if (consulta_login[0].password === password) {
                return consulta_login[0];
            }
            return false;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.login.findMany();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.login.findUnique({
                where: { id },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = data;
            return this.prisma.login.update({
                where: { id },
                data: { password },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.login.delete({
                where: { id },
            });
        });
    }
    countDistinctUsersAccessedPlatform() {
        return __awaiter(this, void 0, void 0, function* () {
            const distinctUsers = yield this.prisma.login.findMany({
                select: {
                    userId: true,
                },
                distinct: ['userId'],
            });
            return distinctUsers.length;
        });
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoginService);
