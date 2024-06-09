"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var PubSubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubService = void 0;
const common_1 = require("@nestjs/common");
const pubsub_1 = require("@google-cloud/pubsub");
const path = __importStar(require("path"));
const notification_gateway_1 = require("./notification.gateway");
let PubSubService = PubSubService_1 = class PubSubService {
    constructor(notificationGateway) {
        this.notificationGateway = notificationGateway;
        this.logger = new common_1.Logger(PubSubService_1.name);
        this.subscriptionName = 'register_movie-sub';
        const credentialsPath = path.join('/home/matheus/estudos/nest/project-socket/src/pub-sub/gleaming-baton-396122-df8574caf795.json');
        this.pubSubClient = new pubsub_1.PubSub({
            projectId: 'gleaming-baton-396122',
            keyFilename: credentialsPath,
        });
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('INIT...');
            this.listenForMessages();
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Shutting down Pub/Sub listener...');
        });
    }
    listenForMessages() {
        console.log('Iniciando Pub/Sub listener...');
        const subscription = this.pubSubClient.subscription(this.subscriptionName);
        subscription.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            // const data = message.data.toString();
            const data = JSON.parse(message.data.toString());
            console.log(`Passando listen Envio: ${data}`);
            // this.logger.log(`Mensagem recebida AAAAAAA: ${data}`);
            this.notificationGateway.handleMessage(data);
            message.ack();
        }));
        subscription.on('error', (error) => {
            this.logger.error(`Subscription error: ${error.message}`);
        });
        this.logger.log('Listening for messages...');
    }
    publishMessage(topicName, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataBuffer = Buffer.from(JSON.stringify(payload));
            try {
                const messageId = yield this.pubSubClient
                    .topic(topicName)
                    .publishMessage({ data: dataBuffer });
                this.logger.log(`Message ${messageId} published.`);
                return messageId;
            }
            catch (error) {
                // @ts-ignore
                this.logger.error(`Received error while publishing: ${error.message}`);
            }
        });
    }
};
exports.PubSubService = PubSubService;
exports.PubSubService = PubSubService = PubSubService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway])
], PubSubService);
