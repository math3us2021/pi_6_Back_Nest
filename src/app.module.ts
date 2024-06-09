import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.model';
import { UserModule } from './user/user.model';
import { GenreModule} from './genre/genre.model';
import { MoviesModule } from './movies/movies.model';
import { StatusModule } from './status/status.model';
import { PubSubModule } from './pub-sub/pub-sub.module';
import {SugestionModule} from "./sugestion/sugestion.module";
import {DashboardModule} from "./dashboard/dashboard.module";


@Module({
  imports: [LoginModule, UserModule, GenreModule, MoviesModule, StatusModule, PubSubModule, SugestionModule, DashboardModule],
})
export class AppModule {}