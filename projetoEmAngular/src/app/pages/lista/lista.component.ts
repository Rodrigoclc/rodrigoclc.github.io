import { Component, OnInit } from '@angular/core';
import { Projeto, Transacao } from 'src/app/interfaces/iProjeto';
import { CreatePojectService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  seletor: string[] = ['Todos', 'Rendas', 'Despesas'];
  opcaoSelecionada!: string;
  projetoSelecionado!: string;
  rendas!: Transacao[];
  despesa!: Transacao[];
  transacoes!: Transacao[];

  constructor(private serviceProjetos: CreatePojectService) {
    
  }

  ngOnInit(): void {
    this.projetoSelecionado = this.serviceProjetos.buscarUltimoProjetoSelecionado();
    this.rendas = this.serviceProjetos.mostarRenda(this.projetoSelecionado);
    this.despesa = this.serviceProjetos.mostarDespesa(this.projetoSelecionado);
    this.transacoes= this.serviceProjetos.mostrarTransacoes(this.projetoSelecionado);
    this.opcaoSelecionada = 'Todos';
  }

  categoriaEscolhida(): Transacao[] {
    if(this.opcaoSelecionada === 'Todos') {
      return this.transacoes;
    } else if(this.opcaoSelecionada === 'Rendas') {
      return this.rendas;
    } else {
      return this.despesa;
    }
  }
}
