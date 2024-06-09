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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugestionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
let SugestionService = class SugestionService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiKey = '86883a67819955f1e5379deaee5832ad';
        this.baseUrl = 'https://api.themoviedb.org/3/movie';
        this.movieSugestion = [];
    }
    sugestionMoviIA(id) {
        return this.httpService.post('http://127.0.0.1:5000/predict', { id })
            .pipe((0, operators_1.map)((response) => {
            response.data.recommended_ids.forEach((element) => {
                this.getIdMovieTMDB(element).subscribe((data) => {
                    this.movieSugestion.push(data);
                });
            });
            return this.movieSugestion;
        }));
    }
    getIdMovieTMDB(id) {
        const url = `${this.baseUrl}/${id}?api_key=${this.apiKey}&language=pt-BR`;
        return this.httpService.get(url).pipe((0, operators_1.map)((response) => {
            return response.data;
        }), (0, operators_1.catchError)((error) => {
            if (error.response && error.response.status === 404) {
                // console.error(`Filme com ID ${id} não encontrado.`);
                return [];
                // return throwError(() => new Error(`Filme com ID ${id} não encontrado.`));
            }
            return [];
            //     return throwError(() => new Error('Ocorreu um erro inesperado.'));
            // }
        }));
    }
};
exports.SugestionService = SugestionService;
exports.SugestionService = SugestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SugestionService);
