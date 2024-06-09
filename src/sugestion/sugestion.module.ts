import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SugestionService } from './sugestion.service';
import { SugestionController } from './sugestion.controller';

@Module({
  imports: [HttpModule],
  controllers: [SugestionController],
  providers: [SugestionService],
})
export class SugestionModule {}
