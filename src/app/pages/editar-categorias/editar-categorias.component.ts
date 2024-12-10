import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ICategoria, INovaCategoria } from '../../interfaces/ITransacao';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-categorias.component.html',
  styleUrl: './editar-categorias.component.css'
})
export class EditarCategoriasComponent implements OnInit {

  firebaseService: FirebaseService = inject(FirebaseService);
  listaCategorias: INovaCategoria[] = [];
  inputCategoria: string = '';
  entradaSaida!: string;
  corBotao: boolean = true;
  ultimoProjeto: string = '';
 
  constructor() { }

  ngOnInit(): void {
    this.entradaSaida = 'entrada';
    this.ultimoProjeto = localStorage.getItem('ultimoProjeto')!;
    this.buscarCategorias('entrada');
  }

  buscarCategorias(entradaSaida: string): void {
    const usuario = '556193276567@c.us'
    this.firebaseService.getItems(`${usuario}-categorias`).subscribe(items => {
      const listaCategorias: INovaCategoria[] = [];
      items.docChanges().forEach(x => {
        const chave = x.doc.id;
        const categoria: INovaCategoria = x.doc.data();
        categoria.chave = chave;
        if (categoria.tipo == entradaSaida)
          listaCategorias.push(categoria);
      });
      this.listaCategorias = listaCategorias;
    });
  }

  excluirCategoria(categoria: INovaCategoria) {
    const usuario = '556193276567@c.us';
    this.firebaseService.deleteItem(`${usuario}-categorias`, categoria.chave!);
    this.buscarCategorias(categoria.tipo);
  }

  editarCategoria(categoria: INovaCategoria) {
    categoria.categoria = this.inputCategoria;
    const usuario = '556193276567@c.us';
    this.firebaseService.updateItem(`${usuario}-categorias`,categoria.chave!, categoria);
    this.inputCategoria = '';
  }

  async criarCategoria() {
    const novaCategoria: INovaCategoria = {
      projeto: this.ultimoProjeto,
      tipo: this.entradaSaida,
      categoria: this.inputCategoria
    }
    const usuario = '556193276567@c.us';
    await this.firebaseService.addItem(`${usuario}-categorias`,novaCategoria);
    this.buscarCategorias(novaCategoria.tipo);
    this.inputCategoria = '';
  }

  mudarRendaDespesa(entradaSaida: string) {
    this.entradaSaida = entradaSaida;
    if(entradaSaida === 'entrada') {
      this.corBotao = true;
    } else {
      this.corBotao = false;
    }
    this.buscarCategorias(entradaSaida);
  }

}
