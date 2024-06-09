import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import * as path from 'path';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class PubSubService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PubSubService.name);
  private readonly pubSubClient: PubSub;
  private readonly subscriptionName = 'register_movie-sub';

  constructor(private readonly notificationGateway: NotificationGateway) {
    const credentialsPath = path.join(
      '/home/matheus/estudos/nest/project-socket/src/pub-sub/gleaming-baton-396122-df8574caf795.json',
    );
    this.pubSubClient = new PubSub({
      projectId: 'gleaming-baton-396122',
      keyFilename: credentialsPath,
    });
  }
  async onModuleInit() {
    console.log('INIT...');
    this.listenForMessages();
  }

  async onModuleDestroy() {
    this.logger.log('Shutting down Pub/Sub listener...');
  }

  private listenForMessages() {
    console.log('Iniciando Pub/Sub listener...');
    const subscription = this.pubSubClient.subscription(this.subscriptionName);
    subscription.on('message', async (message) => {
      // const data = message.data.toString();
      const data = JSON.parse(message.data.toString());
      console.log(`Passando listen Envio: ${data}`);
      // this.logger.log(`Mensagem recebida AAAAAAA: ${data}`);
      this.notificationGateway.handleMessage(data);
      message.ack();
    });
    subscription.on('error', (error) => {
      this.logger.error(`Subscription error: ${error.message}`);
    });
    this.logger.log('Listening for messages...');
  }

  async publishMessage(
    topicName: string,
    payload: any,
  ): Promise<string | void> {
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    try {
      const messageId = await this.pubSubClient
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
      this.logger.log(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      // @ts-ignore
      this.logger.error(`Received error while publishing: ${error.message}`);
    }
  }
}
