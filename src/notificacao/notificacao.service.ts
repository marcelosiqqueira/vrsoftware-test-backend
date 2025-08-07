import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class NotificacaoService implements OnModuleInit {
  private canal: Channel;
  private filaEntrada = 'fila.notificacao.entrada.MARCELO';

  private readonly statusMensagens = new Map<string, string>();

  async onModuleInit() {
    const connection: Connection = await connect(
      'amqp://guest:guest@localhost:5672',
    );

    this.canal = await connection.createChannel();

    await this.canal.assertQueue(this.filaEntrada, { durable: true });
    await this.consumirFila();
  }

  async publicarMensagem(dto: CreateNotificacaoDto) {
    const payload = JSON.stringify(dto);
    this.statusMensagens.set(dto.mensagemId, 'AGUARDANDO_PROCESSAMENTO');
    this.canal.sendToQueue(this.filaEntrada, Buffer.from(payload));
  }

  async consumirFila() {
    this.canal.consume(this.filaEntrada, async (msg) => {
      if (msg) {
        const conteudo = JSON.parse(msg.content.toString());
        const { mensagemId } = conteudo;

        // Simula processamento
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 + Math.random() * 1000),
        );

        const sucesso = Math.floor(Math.random() * 10) > 2;

        const status = sucesso ? 'PROCESSADO_SUCESSO' : 'FALHA_PROCESSAMENTO';
        this.statusMensagens.set(mensagemId, status);

        const filaStatus = 'fila.notificacao.status.SeuNome';
        await this.canal.assertQueue(filaStatus, { durable: true });
        this.canal.sendToQueue(
          filaStatus,
          Buffer.from(JSON.stringify({ mensagemId, status })),
        );

        this.canal.ack(msg);
      }
    });
  }

  getStatus(mensagemId: string): string {
    return this.statusMensagens.get(mensagemId) ?? 'DESCONHECIDO';
  }
}
