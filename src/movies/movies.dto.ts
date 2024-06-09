// movies.dto.ts

import { IsNotEmpty, IsOptional } from 'class-validator';



export class CreateMovieDto {
  @IsNotEmpty()
  image!: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  genreId!: string;

  @IsNotEmpty()
  originalLanguage!: string;

  @IsNotEmpty()
  releaseDate!: string;

  @IsNotEmpty()
  runtime!: number;

  @IsNotEmpty()
  statusId!: string;

  @IsNotEmpty()
  productionCompanies!: string;

  @IsNotEmpty()
  overview!: string;

  @IsNotEmpty()
  popularity!: number;

  @IsNotEmpty()
  voteAverage!: number;

  @IsNotEmpty()
  voteCount!: number;

  @IsNotEmpty()
  notification?: boolean = false; // Definindo um valor padrão

  constructor(createMovieDto: CreateMovieDto) {
    Object.assign(this, createMovieDto);
  }
}


export class UpdateMovieDto {
  @IsOptional()
  image?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  genreId?: string;

  @IsOptional()
  originalLanguage?: string;

  @IsOptional()
  releaseDate?: Date;

  @IsOptional()
  runtime?: number;

  @IsOptional()
  statusId?: string;

  @IsOptional()
    productionCompanies?: string;

  @IsOptional()
  overview?: string;

  @IsOptional()
  popularity?: number;

  @IsOptional()
  voteAverage?: number;

  @IsOptional()
  voteCount?: number;

  @IsOptional()
  notification?: boolean;

  constructor(updateMovieDto: UpdateMovieDto) {
    Object.assign(this, updateMovieDto);
  }
}
