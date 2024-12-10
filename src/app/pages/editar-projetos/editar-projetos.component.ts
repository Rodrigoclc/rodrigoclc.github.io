import { Component, inject, } from '@angular/core';
import { CreatePojectService } from '../../services/projetos.service';
import { Projeto } from '../../interfaces/iProjeto';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { IProjeto } from '../../interfaces/ITransacao';

@Component({
  selector: 'app-editar-projetos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './editar-projetos.component.html',
  styleUrl: './editar-projetos.component.css'
})
export class EditarProjetosComponent {
  listaProjetos!: IProjeto[];
  novoProjeto!: string;
  saldoInicialProjeto!: number;
  projetoSelecionado!: Projeto;

  firebaseService: FirebaseService = inject(FirebaseService);

  constructor(
    private projetosSevices: CreatePojectService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buscarProjetos();
  }

  buscarProjetos(): void {
    const usuario = '556193276567@c.us'
    this.firebaseService.getItems(`${usuario}-projetos`).subscribe(items => {
      const listaProjetos: IProjeto[] = [];
      items.docChanges().forEach(x => {
        const chave = x.doc.id;
        const projeto: IProjeto = x.doc.data();
        projeto.chave = chave;
        listaProjetos.push(projeto);
      });
      console.log(listaProjetos);
      this.listaProjetos = listaProjetos;
    });
  }

  selecionar(): void {
    localStorage.setItem('ultimoProjeto', this.projetoSelecionado.nome);
  }

  excluir(projeto: IProjeto): void {
    const usuario = '556193276567@c.us';
    this.firebaseService.deleteItem(`${usuario}-projetos`, projeto.chave!);
    this.buscarProjetos();
  }

  async criarProjeto() {
    const novoProjeto: IProjeto = {
      projeto: this.novoProjeto,
    }
    const usuario = '556193276567@c.us';
    await this.firebaseService.addItem(`${usuario}-projetos`, novoProjeto);
    this.buscarProjetos();
  }

  chamarColapso(index: number, criarEditar: boolean): void {
    if (criarEditar) {
      this.novoProjeto = this.listaProjetos[index].projeto;
    } else {
      this.novoProjeto = '';
      this.saldoInicialProjeto = 0;
    }

  }

  atualizarProjeto(projeto: IProjeto): void {
    console.log(projeto);
    projeto.projeto = this.novoProjeto;
    const usuario = '556193276567@c.us';
    this.firebaseService.updateItem(`${usuario}-projetos`,projeto.chave!, {projeto: projeto.projeto});
  }
}
