import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificacaoModule } from './notificacao/notificacao.module';

@Module({
  imports: [NotificacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
