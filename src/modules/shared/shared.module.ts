import { Global, Module } from '@nestjs/common';
import { LoggerClient } from './logger.client';
import { ConfigClient } from './config.client';
import { KafkaClient } from './kafka.client';

const configFactory = {
  provide: ConfigClient,
  useFactory: async (loggerClient: LoggerClient) => {
    const configClient = new ConfigClient(loggerClient);
    await configClient.init();
    return configClient;
  },
  inject: [LoggerClient],
};

@Global()
@Module({
  providers: [LoggerClient, configFactory, KafkaClient],
  exports: [LoggerClient, configFactory, KafkaClient],
})
export class SharedModule {}
