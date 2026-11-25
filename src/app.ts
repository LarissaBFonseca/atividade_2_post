import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 8082;

// Middleware para ler JSON no corpo da requisição
app.use(express.json());

// Rota POST /soma
app.post("/soma", (req: Request, res: Response) => {
try {
    const { num1, num2, num3 } = req.body;
    const erros: string[] = [];

    // Valida cada um dos 3 campos individualmente para detalhar os problemas encontrados
    if (num1 === undefined || num1 === null) {
    erros.push("O campo 'num1' é obrigatório.");
    } else if (typeof num1 !== "number" || Number.isNaN(num1)) {
    erros.push("O campo 'num1' deve ser um valor numérico válido.");
    }

    if (num2 === undefined || num2 === null) {
    erros.push("O campo 'num2' é obrigatório.");
    } else if (typeof num2 !== "number" || Number.isNaN(num2)) {
    erros.push("O campo 'num2' deve ser um valor numérico válido.");
    }

    if (num3 === undefined || num3 === null) {
    erros.push("O campo 'num3' é obrigatório.");
    } else if (typeof num3 !== "number" || Number.isNaN(num3)) {
    erros.push("O campo 'num3' deve ser um valor numérico válido.");
    }

    // Se houver qualquer erro de validação, informa ao cliente com status 400
    if (erros.length > 0) {
    res.status(400).json({
        erro: "Não foi possível realizar a soma devido aos seguintes problemas:",
        detalhes: erros
    });
    return;
    }

    // Realiza a soma após garantir que os 3 valores são números
    const resultado = num1 + num2 + num3;

    res.status(200).json({
    resultado: resultado
    });
} catch (error) {
    res.status(500).json({
    erro: "Erro interno ao processar a requisição."
    });
}
});

app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});