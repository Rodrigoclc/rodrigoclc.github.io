export interface ITransacao {
    chave?: string,
    categoria: string,
    dataDaTransacao: string,
    descricao: string,
    projeto: string,
    tipo: string,
    valor: number
}

export interface IResultado {
    totalEntrada: number;
    totalSaida: number;
    saldo: number;
    projetos: string[];
    categorias: string[];
}
export interface IValorPorCategoria {
    categoria: string,
    valor: number
    media: number
}

export interface ICategorias {
    categorias: string[];
}