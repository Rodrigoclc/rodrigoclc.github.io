import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from '../pages/home/home.component';
import { ConfiguracoesComponent } from '../pages/configuracoes/configuracoes.component'
import { FirebaseService } from '../services/firebase.service';
import { IResultado, ITransacao } from '../interfaces/ITransacao';
import { RelatoriosComponent } from '../pages/relatorios/relatorios.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    HomeComponent,
    ConfiguracoesComponent,
    RelatoriosComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
 
  private firebaseService: FirebaseService = inject(FirebaseService);
  detalhesPorCategoria: ITransacao[] = [];
  dadosEnviados: ITransacao[] = [];
  opcaoSelecionada: string = '';
  resultado: IResultado = {
    totalEntrada: 0,
    totalSaida: 0,
    saldo: 0,
    projetos: [],
    categorias: []
  }

  @Output() totalPorCategoria = new EventEmitter<number>();

  constructor() {
    this.buscarTransacoes();  
  }
  ngOnInit(): void {
  }

  teste() {
    this.totalPorCategoria.emit();
  }

  buscarTransacoes(): void {
    this.firebaseService.getItems('556193276567@c.us').subscribe(items => {
      this.separarDados(items);
    });
  }

  separarDados(transacoes: ITransacao[]) {
    const resultado = transacoes.reduce((acumulador: IResultado, transacao: ITransacao) => {
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
    console.log(resultado);
    this.resultado = resultado;
    this.opcaoSelecionada = resultado.categorias[0];
    this.mostrarValoresPorCategoria(transacoes);
  }

  mostrarValoresPorCategoria(transacoes: ITransacao[]) {
    const categoriasAgrupadas = transacoes.reduce((agrupado: any, transacao: ITransacao) => {
      const { categoria, valor } = transacao;
      if (!agrupado[categoria]) {
        agrupado[categoria] = { categoria, valor: 0 };
      }
      agrupado[categoria].valor += valor;
      return agrupado;
    }, {});
    const arrayDeCategorias: ITransacao[] = [];
    for (let item in categoriasAgrupadas) {
      arrayDeCategorias.push(categoriasAgrupadas[item]);
    }
    this.detalhesPorCategoria = arrayDeCategorias;
    console.log(this.detalhesPorCategoria);
  }
}
