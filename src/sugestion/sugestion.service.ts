import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import { AxiosResponse } from 'axios';
import { Observable , throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SugestionService {
    constructor(private readonly httpService: HttpService) {}
    private apiKey = '86883a67819955f1e5379deaee5832ad';
    private baseUrl = 'https://api.themoviedb.org/3/movie';
    private movieSugestion: any = [];

    sugestionMoviIA(id: string): Observable<any> {
        return this.httpService.post('http://127.0.0.1:5000/predict', { id})
            .pipe(
                map((response: AxiosResponse) => {


                    response.data.recommended_ids.forEach((element: any) => {
                        this.getIdMovieTMDB(element).subscribe((data:any) => {
                            this.movieSugestion.push(data);
                        });
                    }
                    );
                    return this.movieSugestion;
                })
            );
    }



    getIdMovieTMDB(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}?api_key=${this.apiKey}&language=pt-BR`;
        return this.httpService.get<any>(url).pipe(
            map((response: AxiosResponse) => {
                return response.data;
            }),
            catchError((error) => {


                if (error.response && error.response.status === 404) {
                    // console.error(`Filme com ID ${id} não encontrado.`);
                return [];
                    // return throwError(() => new Error(`Filme com ID ${id} não encontrado.`));
                }
                return [];
                //     return throwError(() => new Error('Ocorreu um erro inesperado.'));
                // }
            })
        );
    }

}
