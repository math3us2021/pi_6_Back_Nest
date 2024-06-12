import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, Observable} from 'rxjs';

@Injectable()
export class SugestionService {
    constructor(private readonly httpService: HttpService) {
    }

    private apiKey = '86883a67819955f1e5379deaee5832ad';
    private baseUrl = 'https://api.themoviedb.org/3/movie';
    private movieSugestion: any = [];


    async sugestionMoviIA(id: string): Promise<any> {
        this.movieSugestion = [];
        const response = await firstValueFrom(this.httpService.post('http://20.83.150.110:5000/predict', {id}));
        console.log(response.data.recommended_ids);

        const moviePromises = response.data.recommended_ids.map(async (element: any) => {
            try {
                const data = await firstValueFrom(this.httpService.get<any>(`${this.baseUrl}/${element}?api_key=${this.apiKey}&language=pt-BR}`));
                console.log(data.data.title);
                return data.data;
            } catch (error: any) {
                console.error(`Erro ao obter filme ${element}: ${error.message}`);
                return null;
            }
        });
        const movies = await Promise.all(moviePromises);
        return movies.filter(movie => movie !== null);
    }

}
