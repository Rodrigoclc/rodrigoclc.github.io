import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projeto } from 'src/app/interfaces/iProjeto';
import { CreatePojectService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  listaProjetos!: Projeto[];
  isModalEdicao!: boolean;
  isModalNovoProjeto!: boolean;
  novoProjetoForm!: FormGroup;
  projetoSelecionado!: Projeto;
  modalCriarOuAtualizarProjeto!: string;

  constructor(
    private projetosSevices: CreatePojectService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.novoProjetoForm = this.fb.group({
      nomeProjeto: ['', [Validators.required]],
      saldoInicial: ['', [Validators.required]]
    })
    this.listaProjetos = this.projetosSevices.recuperarProjetos();
  }

  chamarModalEdicao(projeto: Projeto) {
    this.isModalEdicao = true;
    this.projetoSelecionado = projeto;
    // this.selecionar()
  }

  desfazerModalEdicao() {
    this.isModalEdicao = false;
  }

  chamarModalNovoProjeto(index: number) {
    this.isModalNovoProjeto = true;
    if(index == 0) {
      this.modalCriarOuAtualizarProjeto = 'Novo projeto'
    } else {
      this.modalCriarOuAtualizarProjeto = 'Atualizar'
    }    
  }

  desfazerModalNovoProjeto() {
    this.isModalNovoProjeto = false;
  }

  selecionar(): void {
    localStorage.setItem('ultimoProjeto', this.projetoSelecionado.nome);
  }

  excluir(): void {
    this.projetosSevices.excluirProjeto(this.projetoSelecionado.nome);
  }

  criarNovoProjetoOuAtualizar(atualizarEditar: string): void {
    if(!this.novoProjetoForm.value.saldoInicial) this.novoProjetoForm.value.saldoInicial = 0;
    if(atualizarEditar === 'Novo projeto') {      
      this.projetosSevices.criarNovosProjetos(this.novoProjetoForm.value.nomeProjeto, this.novoProjetoForm.value.saldoInicial);      
    } else {      
      this.projetosSevices.atualizarProjeto(this.projetoSelecionado.nome, this.novoProjetoForm.value.nomeProjeto, this.novoProjetoForm.value.saldoInicial);      
    }
    this.novoProjetoForm.reset();
    this.isModalNovoProjeto = false;
  }
}
