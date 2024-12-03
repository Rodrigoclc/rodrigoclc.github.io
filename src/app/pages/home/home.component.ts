import { Component, inject, input, Input, InputSignal, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CreatePojectService } from '../../services/projetos.service';
import { Projeto, RetornoTransacao, Transacao } from '../../interfaces/iProjeto';
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component'
import { CategoriasService } from '../../services/categorias.service';
import { CommonModule } from '@angular/common';
import { EditarProjetosComponent } from '../../pages/editar-projetos/editar-projetos.component'
import { AuthService } from '../../services/auth.service';
import { RendaDespesaComponent } from '../../shared/components/renda-despesa/renda-despesa.component';
import { CrudService } from '../../services/crud.service';
import { FirebaseService } from '../../services/firebase.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ITransacao } from '../../interfaces/ITransacao';

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
    EditarProjetosComponent,
    RendaDespesaComponent,
    SpinnerComponent,
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
  detalhesPorCategoria = input<ITransacao[]>();
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
