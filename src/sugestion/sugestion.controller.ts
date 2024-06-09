import {Body, Controller, Post} from '@nestjs/common';
import { SugestionService } from './sugestion.service';
import {CreateUserDto} from "../user/user.dto";

@Controller('sugestion')
export class SugestionController {
  constructor(private readonly sugestionService: SugestionService,) {}

  @Post()
  async sugestionMovie(@Body() id: any) {
    console.log(id)
    return this.sugestionService.sugestionMoviIA(id.id)
  }
}
