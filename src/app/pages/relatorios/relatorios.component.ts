import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IResultado, ITransacao, IValorPorCategoria } from '../../interfaces/ITransacao';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit{

  detalhesPorCategoria = input<IValorPorCategoria[]>();
  corBotao: boolean = true;
  transacoesStorage: ITransacao[] = [];
  listaTransacoes: ITransacao[] = [];

  @Output() categoriasDeEntradaOuSaida = new EventEmitter<string>();

  ngOnInit(): void {
    this.transacoesStorage = JSON.parse(localStorage.getItem('transacoes')!);
  }

  separarDados(categoria: string) {
    const listaTransacoes: ITransacao[] = []
    this.transacoesStorage.forEach(transacao => {
      if (transacao.categoria == categoria) {
        listaTransacoes.push(transacao);
      }
    });
    this.listaTransacoes = listaTransacoes;
  }

  mudarCategorias(entradaSaida: string) {
    this.categoriasDeEntradaOuSaida.emit(entradaSaida);
    this.corBotao = !this.corBotao;
  }
}
