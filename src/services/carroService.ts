import { Carro } from "../models/Carro";
import fs from 'fs';
import path from 'path';

export interface CarroService {
    criarCarro(carroData: Carro): Promise<Carro>;
    listarCarros(): Promise<Carro[]>;
    buscarCarroPorID(carroID: number): Promise<Carro | null>;
    atualizarCarro(carroData: Carro, carroID: number): Promise<Carro | null>;
    deletarCarro(carroID: number): Promise<void>;
}

const CARROS_JSON_PATH = path.resolve(__dirname, '../data/carros.json');
const carrosData = JSON.parse(fs.readFileSync(CARROS_JSON_PATH, 'utf-8'));
let numberID = Array.isArray(carrosData) ? carrosData.length : Object.keys(carrosData).length;

export class CarroServiceImpl implements CarroService {
    async criarCarro(carroData: Carro): Promise<Carro> {
        const carros = this.listarCarrosSync(); 
        const novoCarro: Carro = { id: numberID, ...carroData, status: 'disponível' };
        carros.push(novoCarro);
        numberID+=1
        this.salvarCarrosSync(carros); 
        return novoCarro;
    }

    async listarCarros(): Promise<Carro[]> {
        return this.listarCarrosSync();
    }

    async buscarCarroPorID(carroID: number): Promise<Carro | null> {
        const carros = this.listarCarrosSync();
        return carros.find(carro => carro.id === carroID) || null;
    }

    async atualizarCarro(carroData: Carro, carroID: number): Promise<Carro | null> {
        let carros = this.listarCarrosSync();
        const carroIndex = carros.findIndex(carro => carro.id === carroID);
        if (carroIndex !== -1) {
            carros[carroIndex] = { ...carros[carroIndex], ...carroData };
            this.salvarCarrosSync(carros);
            return carros[carroIndex];
        }
        return null;
    }

    async deletarCarro(carroID: number): Promise<void> {
        let carros = this.listarCarrosSync();
        carros = carros.filter(carro => carro.id !== carroID);
        this.salvarCarrosSync(carros);
    }

    private listarCarrosSync(): Carro[] {
        if (fs.existsSync(CARROS_JSON_PATH)) {
            const data = fs.readFileSync(CARROS_JSON_PATH, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    private salvarCarrosSync(carros: Carro[]): void {
        fs.writeFileSync(CARROS_JSON_PATH, JSON.stringify(carros, null, 2), 'utf-8');
    }
}
