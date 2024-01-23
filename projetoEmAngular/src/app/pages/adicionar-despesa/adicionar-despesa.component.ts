import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Projeto, Transacao } from 'src/app/interfaces/iProjeto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CreatePojectService } from 'src/app/services/projetos.service'

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.css']
})
export class AdicionarDespesaComponent implements OnInit {

  tituloHeader: string = 'Adicionar despesa'

  listaProjetos!: Projeto[];
  ultimoProjeto!: string;
  listaCategorias!: string[];

  constructor(
    private projetosService: CreatePojectService, 
    private categorias: CategoriasService) { }

  ngOnInit(): void {
    this.ultimoProjeto = this.projetosService.buscarUltimoProjetoSelecionado();
    this.listaProjetos = this.projetosService.recuperarProjetos();
    this.listaCategorias = this.categorias.buscarCategoriasDespesa();
  }

  receberDados(dados: Transacao) {
    this.listaProjetos.find(objeto => objeto.nome == this.ultimoProjeto)!.adicionarDespesa(dados);
    localStorage.setItem('projetos', JSON.stringify(this.listaProjetos));
  }

}
