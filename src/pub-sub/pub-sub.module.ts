import { Module } from '@nestjs/common';
import { PubSubService } from './pub-sub.service';
import { NotificationGateway } from './notification.gateway';

@Module({
  providers: [PubSubService, NotificationGateway],
  exports: [PubSubService, NotificationGateway],
})
export class PubSubModule {}
