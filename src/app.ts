import express from 'express';
import carroRoutes from './routes/carroRoutes';
import dotenv from 'dotenv';
import bodyParser = require('body-parser');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo à locadora de carros!');
});

// Rotas para CRUD de carros
app.use(carroRoutes);

// Configuração para lidar com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).send('Rota não encontrada');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Erro interno do servidor');
});

// Obtém a porta do arquivo .env ou usa a porta 8001 como padrão
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
