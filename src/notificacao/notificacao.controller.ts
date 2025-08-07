import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { NotificacaoService } from './notificacao.service';

@Controller('api')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  /**
   * POST /api/notificar
   * Recebe uma notificação, valida, publica na fila do RabbitMQ
   */
  @Post('notificar')
  async notificar(@Body() body: CreateNotificacaoDto) {
    await this.notificacaoService.publicarMensagem(body);

    return {
      status: 'Recebido',
      mensagemId: body.mensagemId,
    };
  }

  /**
   * GET /api/notificacao/status/:id
   * Retorna o status atual da notificação (consultando em memória)
   */
  @Get('notificacao/status/:id')
  getStatus(@Param('id') id: string) {
    const status = this.notificacaoService.getStatus(id);
    return {
      mensagemId: id,
      status,
    };
  }
}
