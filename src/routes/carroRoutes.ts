import express, { Request, Response } from 'express';
import { CarroController } from '../controller/carroController';
import { CarroServiceImpl } from '../services/carroService'; 

const router = express.Router();
const carroService = new CarroServiceImpl(); 
const carroController = new CarroController(carroService);

// Rota para listar todos os carros
router.get('/carros', async (req: Request, res: Response) => {
    await carroController.listarCarros(req, res);
});

// Rota para criar um novo carro
router.post('/carros', async (req: Request, res: Response) => {
    await carroController.criarCarro(req, res);
});

// Rota para buscar um carro por ID
router.get('/carros/:id', async (req: Request, res: Response) => {
    await carroController.buscarCarroPorID(req, res);
});

// Rota para atualizar um carro por ID
router.put('/carros/:id', async (req: Request, res: Response) => {
    await carroController.atualizarCarro(req, res);
});

// Rota para deletar um carro por ID
router.delete('/carros/:id', async (req: Request, res: Response) => {
    await carroController.deletarCarro(req, res);
});

export default router;
