import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IResultado, ITransacao } from '../../interfaces/ITransacao';

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

  detalhesPorCategoria = input<ITransacao[]>();
  resultado: number = 0;
  corBotao: boolean = false;

  mudarCategorias() {
    this.corBotao = !this.corBotao;  
  }
}
