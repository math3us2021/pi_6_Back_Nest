// movie.model.ts

import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import {PubSubModule} from "../pub-sub/pub-sub.module";

@Module({
    imports: [PubSubModule],
    controllers: [MoviesController],
    providers: [MoviesService],
})

export class MoviesModule {}