const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const port = 3006;

// Configuração do cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', (qr) => {
    // Gera o QR Code no terminal para fazer a leitura no WhatsApp
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
});

client.initialize();

app.use(express.json());

// Rota para receber o POST do formulário de confirmação de presença
app.post('/confirmacao', (req, res) => {
    const { nome, acompanhante } = req.body;

    // Monta a mensagem
    const mensagem = acompanhante 
        ? `
          Candy Party da Eloah🧁💕 
          *${nome}*, acabou de confirmar
          acompanhado(a) por *${acompanhante}*`
        : 
        `
        Candy Party da Eloah🧁💕 
        *${nome}*, acabou de confirmar
        mas sem acompanhante`;

    // Envia a mensagem para o número do WhatsApp desejado
    const numeroDestino = '5511949098312@c.us'; // Número no formato internacional

    client.sendMessage(numeroDestino, mensagem).then(response => {
        console.log('Mensagem enviada com sucesso!');
        res.status(200).json({
            message: 'Confirmação feita com Sucesso 🟢'
        })
    }).catch(err => {
        console.error('Erro ao enviar mensagem:', err);
        res.status(500).send('Erro ao enviar confirmação.');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
