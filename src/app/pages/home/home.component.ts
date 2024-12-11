import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Projeto} from '../../interfaces/iProjeto';
import { RouterLink } from '@angular/router';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component'
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { IProjeto } from '../../interfaces/ITransacao';

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
    ReactiveFormsModule,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  despesaRenda: string = 'Despesa';
  saldoInicial!: number;
  renda!: number;
  despesa!: number;
  saldoFinal!: number;
  listaCategorias!: string[];
  listaProjetos!: Projeto[];
  teste: number = 100;
  corBotao: boolean = true;

  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  protected form = this.formBuilder.group({projetos: localStorage.getItem('ultimoProjeto')});
  @Output() projetoSelecionado = new EventEmitter<string>();
  detalhesPorCategoria = input<IValorPorCategoria[]>();
  transacoes = input<IResultado>();
  projetos = input<IProjeto[]>();
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
    this.projetoSelecionado.emit(this.form.value.projetos!);
    console.log(this.form.value.projetos);
  }

}
