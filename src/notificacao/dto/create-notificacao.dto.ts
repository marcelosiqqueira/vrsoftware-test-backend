import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNotificacaoDto {
  @IsUUID('4', { message: 'O campo mensagemId deve ser um UUID válido' })
  mensagemId: string;

  @IsNotEmpty({ message: 'O campo conteudoMensagem não pode ser vazio' })
  conteudoMensagem: string;
}
