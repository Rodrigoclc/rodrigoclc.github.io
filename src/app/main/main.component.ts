import { Component, inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from '../pages/home/home.component';
import { ConfiguracoesComponent } from '../pages/configuracoes/configuracoes.component'
import { FirebaseService } from '../services/firebase.service';
import { IProjeto, IResultado, ITransacao, IValorPorCategoria } from '../interfaces/ITransacao';
import { RelatoriosComponent } from '../pages/relatorios/relatorios.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MaterialModule,
    HomeComponent,
    ConfiguracoesComponent,
    RelatoriosComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  private firebaseService: FirebaseService = inject(FirebaseService);
  detalhesPorCategoria: IValorPorCategoria[] = [];
  opcaoSelecionada: string = '';
  transacoes: ITransacao[] = [];
  resultado: IResultado = {
    totalEntrada: 0,
    totalSaida: 0,
    saldo: 0,
    projetos: [],
    categorias: []
  }
  projetos: IProjeto[] = [];

  constructor() {
    this.buscarTransacoes();
    this.buscarProjetos();
  }

  receberDados(entradaSaida: string) {
    this.mostrarValoresPorCategoria(entradaSaida)
  }

  buscarTransacoes(): void {
    const usuario = '556193276567@c.us'
    this.firebaseService.getItems(`${usuario}-transacoes`).subscribe(items => {
      //this.transacoes = items;
      const listaTransacoes: ITransacao[] = [];
      items.docChanges().forEach(x => {
        const chave = x.doc.id;
        const transacao: ITransacao = x.doc.data();
        transacao.chave = chave;
        listaTransacoes.push(transacao);
      });
      this.transacoes = listaTransacoes;
      localStorage.setItem('transacoes', JSON.stringify(listaTransacoes));
      this.separarDados();
    });
  }

  buscarProjetos(): void {
    const usuario = '556193276567@c.us'
    this.firebaseService.getItems(`${usuario}-projetos`).subscribe(items => {
      const listaProjetos: IProjeto[] = [];
      items.docChanges().forEach(x => {
        // const chave = x.doc.id;
        // const transacao: ITransacao = x.doc.data();
        // transacao.chave = chave;
        listaProjetos.push(x.doc.data());
      });
      this.projetos = listaProjetos;
      console.log(this.projetos);
      localStorage.setItem('projetos', JSON.stringify(listaProjetos));
    });
  }

  separarDados() {
    const resultado = this.transacoes.reduce((acumulador: IResultado, transacao: ITransacao) => {
      // Atualiza o total de entrada e saída
      if (transacao.tipo === 'entrada') {
        acumulador.totalEntrada += transacao.valor;
      } else if (transacao.tipo === 'saída') {
        acumulador.totalSaida += transacao.valor;
      }

      // Adiciona os projetos únicos
      if (!acumulador.projetos.includes(transacao.projeto)) {
        acumulador.projetos.push(transacao.projeto);
      }

      // Adiciona as categorias únicas
      if (!acumulador.categorias.includes(transacao.categoria)) {
        acumulador.categorias.push(transacao.categoria);
      }

      return acumulador;
    }, {
      totalEntrada: 0,
      totalSaida: 0,
      saldo: 0,
      projetos: [] as string[],
      categorias: [] as string[]
    });


    // Calcula o saldo
    resultado.saldo = resultado.totalEntrada - resultado.totalSaida;
    //console.log(resultado);
    this.resultado = resultado;
    localStorage.setItem('ultimoProjeto', resultado.projetos[0]);
    this.opcaoSelecionada = resultado.projetos[0];
    this.mostrarValoresPorCategoria('entrada');
  }

  mostrarValoresPorCategoria(entradaSaida: string) {
    const categoriasAgrupadas: IValorPorCategoria[] = this.transacoes.reduce((agrupado: any, transacao: ITransacao) => {
      if (transacao.tipo == entradaSaida) {
        const { categoria, valor } = transacao;
        if (!agrupado[categoria]) {
          agrupado[categoria] = { categoria, valor: 0 };
        }
        agrupado[categoria].valor += valor;
      }
      return agrupado;
    }, {});
    const arrayDeCategorias: IValorPorCategoria[] = [];
    for (let item in categoriasAgrupadas) {
      categoriasAgrupadas[item].media = (categoriasAgrupadas[item].valor / this.resultado.totalSaida) * 100;
      arrayDeCategorias.push(categoriasAgrupadas[item]);
    }
    console.log(arrayDeCategorias);
    this.detalhesPorCategoria = arrayDeCategorias;
  }
}
