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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugestionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let SugestionService = class SugestionService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiKey = '86883a67819955f1e5379deaee5832ad';
        this.baseUrl = 'https://api.themoviedb.org/3/movie';
        this.movieSugestion = [];
    }
    sugestionMoviIA(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.movieSugestion = [];
            const response = yield (0, rxjs_1.firstValueFrom)(this.httpService.post('http://20.83.150.110:5000/predict', { id }));
            console.log(response.data.recommended_ids);
            const moviePromises = response.data.recommended_ids.map((element) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/${element}?api_key=${this.apiKey}&language=pt-BR}`));
                    console.log(data.data.title);
                    return data.data;
                }
                catch (error) {
                    console.error(`Erro ao obter filme ${element}: ${error.message}`);
                    return null;
                }
            }));
            const movies = yield Promise.all(moviePromises);
            return movies.filter(movie => movie !== null);
        });
    }
};
exports.SugestionService = SugestionService;
exports.SugestionService = SugestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SugestionService);
