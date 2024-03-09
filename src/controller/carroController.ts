import { Request, Response } from 'express';
import { CarroService } from '../services/carroService';
import { Carro } from '../models/Carro';

export class CarroController {
    constructor(private readonly carroService: CarroService) {}

    async criarCarro(req: Request, res: Response): Promise<void> {
        try {
            const novoCarro: Carro = await this.carroService.criarCarro(req.body as Omit<Carro, 'id'>);
            res.status(201).json(novoCarro);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarCarros(req: Request, res: Response): Promise<void> {
        try {
            const carros: Carro[] = await this.carroService.listarCarros();
            res.status(200).json(carros);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarCarroPorID(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const carroID: number = parseInt(id);
            const carro: Carro | null = await this.carroService.buscarCarroPorID(carroID);
            if (carro) {
                res.status(200).json(carro);
            } else {
                res.status(404).json({ message: 'Carro não encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarCarro(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const carroID: number = parseInt(id);
            const carroData: Carro = req.body as Carro;
            const carroAtualizado: Carro | null = await this.carroService.atualizarCarro(carroData, carroID);
            if (carroAtualizado) {
                res.status(200).json(carroAtualizado);
            } else {
                res.status(404).json({ message: 'Carro não encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletarCarro(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const carroID: number = parseInt(id);
            await this.carroService.deletarCarro(carroID);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
