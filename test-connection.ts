// test-connection.ts
import { connect } from 'amqplib';

async function test() {
  try {
    const conn = await connect('amqp://guest:guest@localhost:5672');
    console.log('Conectado com sucesso!');
    await conn.close();
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
}

test();
