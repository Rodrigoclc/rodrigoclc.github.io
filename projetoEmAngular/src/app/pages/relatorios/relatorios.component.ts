import { Component, OnInit } from '@angular/core';
import { Projeto, Transacao } from 'src/app/interfaces/iProjeto';
import { CreatePojectService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  projetoSelecionado!: string;
  seletor: string[] = ['Todos', 'Rendas', 'Despesas'];
  opcaoSelecionada!: string;
  rendas!: Transacao[];
  despesa!: Transacao[];
  transacoes!: Transacao[];

  constructor(private serviceProjetos: CreatePojectService) { }

  ngOnInit(): void {
    console.log(this.projetoSelecionado)
    this.projetoSelecionado = this.serviceProjetos.buscarUltimoProjetoSelecionado();
    this.rendas = this.serviceProjetos.mostarRenda(this.projetoSelecionado);
    this.despesa = this.serviceProjetos.mostarDespesa(this.projetoSelecionado);
    this.transacoes= this.serviceProjetos.mostrarTransacoes(this.projetoSelecionado);
    this.opcaoSelecionada = 'Todos';  }

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
