import { Test, TestingModule } from '@nestjs/testing';
import { NotificacaoController } from './notificacao.controller';
import { NotificacaoService } from './notificacao.service';

describe('NotificacaoController', () => {
  let controller: NotificacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacaoController],
      providers: [
        {
          provide: NotificacaoService,
          useValue: {
            publicarMensagem: jest.fn(),
            getStatus: jest.fn().mockReturnValue('PROCESSADO_SUCESSO'),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificacaoController>(NotificacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar status ao consultar status da notificação', () => {
    const result = controller.getStatus('123');
    expect(result).toEqual({ mensagemId: '123', status: 'PROCESSADO_SUCESSO' });
  });
});
