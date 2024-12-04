import { Component, Input, OnInit, Output, EventEmitter, input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Transacao } from '../../../interfaces/iProjeto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent implements OnInit {

  formBuilder = inject(NonNullableFormBuilder);
  @Output() dadosEnviados = new EventEmitter<Transacao>();

  transacoes = this.formBuilder.group({
    valor: [0, [Validators.required]],
    categoria: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    data: [this.obterDataAtualFormatada(), [Validators.required]],
    hora: [this.obterHoraAtual(), [Validators.required]]
  });
  select!: string;

  titulo = input<string>();
  categorias = input<string[]>();

  constructor() { }

  ngOnInit(): void {
    console.log('iniciado transacao component');
  }

  private obterHoraAtual(): string {
    const agora = new Date();
    const hora = agora.getHours()
    const minutos = agora.getMinutes()
    return `${hora}:${minutos}`;
  }

  private obterDataAtualFormatada(): string {
    const agora: Date = new Date()
    const ano: number = agora.getFullYear();
    const mes: string = this.formatarData(agora.getMonth() + 1);
    const dia: string = this.formatarData(agora.getDate());
    return `${ano}-${mes}-${dia}`;
  }

  private formatarData(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  subimtForm() {
    //console.log(this.transacoes.value);
    if (this.transacoes.valid) {
      this.dadosEnviados.emit(this.transacoes.value as Transacao);
      this.transacoes.patchValue({ valor: 0, descricao: '', categoria: '' });
    }

  }
}
