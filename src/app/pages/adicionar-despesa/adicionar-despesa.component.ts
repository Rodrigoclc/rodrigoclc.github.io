import { Component, inject, OnInit } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CreatePojectService } from '../../services/projetos.service';
import { CategoriasService } from '../../services/categorias.service';
import { CrudService } from '../../services/crud.service';
import { ICategorias, IResultado, ITransacao } from '../../interfaces/ITransacao';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-adicionar-despesa',
  standalone: true,
  imports: [
    TransacaoComponent
  ],
  templateUrl: './adicionar-despesa.component.html',
  styleUrl: './adicionar-despesa.component.css'
})
export class AdicionarDespesaComponent implements OnInit {

  firebaseService: FirebaseService = inject(FirebaseService);

  tituloHeader: string = 'Adicionar despesa'
  listaProjetos: Projeto[] = [];
  ultimoProjeto!: string;
  listaCategorias: string[] = [];
  transacoes: ITransacao[] = [];
  resultado: ICategorias = { categorias: [] }

  constructor() { }

  ngOnInit(): void {
    this.ultimoProjeto = localStorage.getItem('ultimoProjeto')!;

    this.transacoes = JSON.parse(localStorage.getItem('transacoes')!);
    this.separarDados();
  }

  separarDados() {
    const resultado = this.transacoes.reduce((acumulador: ICategorias, transacao: ITransacao) => {
      
      if (!acumulador.categorias.includes(transacao.categoria) && transacao.tipo == 'saída') {
        acumulador.categorias.push(transacao.categoria);
      }
      return acumulador;

    }, { categorias: [] as string[] });

    // Calcula o saldo
    console.log(resultado);
    this.listaCategorias = resultado.categorias;
    this.resultado = resultado;
  }

  receberDados(dados: Transacao) {
    const transacao: ITransacao = {
      categoria: dados.categoria,
      dataDaTransacao: `${dados.data.replaceAll('-', '/')}-${dados.hora}`,
      descricao: dados.descricao,
      projeto: this.ultimoProjeto,
      tipo: 'saída',
      valor: dados.valor,
    }
    const usuario = '556193276567@c.us';
    this.firebaseService.addItem(`${usuario}-transacoes`,transacao);
  }
}
