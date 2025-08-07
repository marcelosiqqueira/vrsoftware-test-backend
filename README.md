# 📬 Notification Service - Backend

Serviço **NestJS** integrado ao **RabbitMQ** para envio e monitoramento de notificações.  
Publica mensagens em uma fila de entrada, processa de forma simulada e disponibiliza o status via API.

---

## 🚀 Tecnologias

- NestJS
- RabbitMQ
- amqplib
- Node.js 22+

---

## ⚙️ Configuração

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose

### Subindo RabbitMQ com Docker Compose

```bash
docker compose up -d
```

O RabbitMQ ficará disponível em:

AMQP: amqp://guest:guest@localhost:5672

Painel de controle: http://localhost:15672 (login: guest, senha: guest)

## ▶️ Execução

```bash
npm install
npm run start:dev
```

## 📡 Endpoints

POST /api/notificar <br>
Envia uma nova notificação para processamento.

```json
{
  "mensagemId": "uuid",
  "conteudoMensagem": "texto"
}
```

GET /api/notificacao/status/:id <br>
Obtém o status de uma notificação pelo ID.

Status possíveis:

AGUARDANDO_PROCESSAMENTO

PROCESSADO_SUCESSO

FALHA_PROCESSAMENTO

DESCONHECIDO

## 🔄 Fluxo de Mensagens

```
[Cliente] --POST /api/notificar--> [Backend NestJS]
    -> Publica em "fila.notificacao.entrada.MARCELO"
    -> Consome, processa e define status
    -> Publica status em "fila.notificacao.status.SeuNome"
    -> Status disponível via GET /api/notificacao/status/:id
```

## 🧪 Testes

```
npm run test
```

Cobrem:

- Envio de notificação

- Consulta de status

- Processamento simulado

- Integração com RabbitMQ
