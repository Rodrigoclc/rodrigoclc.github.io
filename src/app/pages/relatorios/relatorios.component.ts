import { Component, EventEmitter, input, Output } from '@angular/core';
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
export class RelatoriosComponent {

  detalhesPorCategoria = input<IValorPorCategoria[]>();
  corBotao: boolean = true;
  @Output() categoriasDeEntradaOuSaida = new EventEmitter<string>();

  mudarCategorias(entradaSaida: string) {
    this.categoriasDeEntradaOuSaida.emit(entradaSaida);
    this.corBotao = !this.corBotao;
  }
}
