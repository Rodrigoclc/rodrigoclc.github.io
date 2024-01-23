import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit {

  listaCategorias!: string[];
  // isSelecionado: boolean = true; sem uso!
  criarOuAtualizar!: string;
  isSelecionarRenda!: boolean;
  isSelecionarDespesa!: boolean;
  isModalEdicao!: boolean;
  isModalNovaCategoria!: boolean;
  novoProjetoForm!: FormGroup;
  rendaOuDespesa!: string;
  categoriaSelecionada!: string;

  constructor(private fb: FormBuilder, private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.novoProjetoForm = this.fb.group({
      categoria: ['', [Validators.required]]
    })
    this.rendaOuDespesa = 'renda'
    this.listaCategorias = this.categoriasService.buscarCategoriasRenda();
    this.isSelecionarRenda = true;
  }

  mostrarCategorias(index: number): void {
    if(index === 0) {
      const categoriasRenda: string[] =  this.categoriasService.buscarCategoriasRenda();
      this.listaCategorias=  categoriasRenda;
      this.isSelecionarRenda = true;
      this.isSelecionarDespesa = false;
      this.rendaOuDespesa = 'renda'
    } else {
      const categoriasDespesa: string[] =  this.categoriasService.buscarCategoriasDespesa();
      this.listaCategorias = categoriasDespesa;
      this.isSelecionarRenda = false;
      this.isSelecionarDespesa = true;
      this.rendaOuDespesa = 'despesa'
    }    
  }

  chamarModalCriarOuAtualizar(index: number) {
    this.isModalNovaCategoria = true;
    if(index === 0) {
      this.criarOuAtualizar = 'Adicionar categoria';
    } else {
      this.criarOuAtualizar = 'Editar categoria';
    }
  }

  desfazerModalNovaCategoria() {
    this.isModalNovaCategoria = false;
  }

  desfazerModalEdicao() {
    this.isModalEdicao = false
  }

  excluir() {
    this.categoriasService.excluirCategoria(this.rendaOuDespesa, this.categoriaSelecionada);
  }

  adicionarOuEditarCategoria(acao: string) {
    if(acao === 'Adicionar categoria') {
      this.categoriasService.adicionarCategoria(this.rendaOuDespesa, this.novoProjetoForm.value.categoria);
    } else {
      this.categoriasService.editarCategorias(this.rendaOuDespesa, this.categoriaSelecionada, this.novoProjetoForm.value.categoria);
    }    
    this.novoProjetoForm.reset();
    this.desfazerModalNovaCategoria()
  }

  chamarModalEdicao(categoria: string) {
    this.isModalEdicao = true;
    this.categoriaSelecionada = categoria;
  }
}
