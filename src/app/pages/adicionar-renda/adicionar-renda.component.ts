import { Component } from '@angular/core';
import { TransacaoComponent } from '../../shared/components/transacao/transacao.component';
import { CreatePojectService } from '../../services/projetos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Projeto, Transacao } from '../../interfaces/iProjeto';

@Component({
  selector: 'app-adicionar-renda',
  standalone: true,
  imports: [
    TransacaoComponent
  ],
  templateUrl: './adicionar-renda.component.html',
  styleUrl: './adicionar-renda.component.css'
})
export class AdicionarRendaComponent {

  listaProjetos!: Projeto[];
  ultimoProjeto!: string;
  listaCategorias!: string[];

  tituloHeader: string = 'Adicionar renda';

  constructor(
    private projetoSevice: CreatePojectService,
    private categorias: CategoriasService) { }

  ngOnInit(): void {
    this.ultimoProjeto = this.projetoSevice.buscarUltimoProjetoSelecionado();
    this.listaProjetos = this.projetoSevice.recuperarProjetos();
    this.listaCategorias = this.categorias.buscarCategoriasRenda();
    console.log(this.listaCategorias)
  }

  receberDados(dados: Transacao) {
    this.listaProjetos.find(objeto => objeto.nome == this.ultimoProjeto)!.adicionarRenda(dados);
    localStorage.setItem('projetos', JSON.stringify(this.listaProjetos));
  }
}
