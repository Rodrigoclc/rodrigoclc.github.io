import { Component, inject } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { CreatePojectService } from '../../services/projetos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Projeto, Transacao } from '../../interfaces/iProjeto';
import { CrudService } from '../../services/crud.service';
import { ICategorias, ITransacao } from '../../interfaces/ITransacao';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-adicionar-renda',
  standalone: true,
  imports: [
    TransacaoComponent
  ],
  templateUrl: './adicionar-renda.component.html',
  styleUrl: './adicionar-renda.component.css'
})
export class AdicionarRendaComponent {

  firebaseService: FirebaseService = inject(FirebaseService);

  tituloHeader: string = 'Adicionar renda';
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
      
      if (!acumulador.categorias.includes(transacao.categoria) && transacao.tipo == 'entrada') {
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
      dataDaTransacao: `${dados.data.replaceAll('-','/')}-${dados.hora}`,
      descricao: dados.descricao,
      projeto: this.ultimoProjeto,
      tipo: 'entrada',
      valor: dados.valor
    }
    this.firebaseService.addItem('556193276567@c.us',transacao);
  }

}
