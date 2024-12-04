import { Component, inject, input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Projeto} from '../../interfaces/iProjeto';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component'
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

interface IResultado {
  totalEntrada: number;
  totalSaida: number;
  saldo: number;
  projetos: string[];
  categorias: string[];
}
interface IValorPorCategoria {
  categoria: string,
  valor: number
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    FormsModule,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  primeirosOptions!: string[];
  despesaRenda: string = 'Despesa';
  saldoInicial!: number;
  renda!: number;
  despesa!: number;
  saldoFinal!: number;
  listaCategorias!: string[];
  listaProjetos!: Projeto[];
  teste: number = 100;
  corBotao: boolean = true;

  opcaoSelecionada = input<string>();
  detalhesPorCategoria = input<IValorPorCategoria[]>();
  transacoes = input<IResultado>();
  firebaseService: FirebaseService = inject(FirebaseService);
  skeletonLoading: boolean = true;
  resultado: IResultado = {
    totalEntrada: 0,
    totalSaida: 0,
    saldo: 0,
    projetos: [],
    categorias: []
  };

  salvarProjetoSelecionado() {

  }

}
