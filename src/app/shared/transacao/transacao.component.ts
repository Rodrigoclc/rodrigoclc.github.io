import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Transacao } from 'src/app/interfaces/iProjeto';


@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.css']
})
export class TransacaoComponent implements OnInit {

  @Output() dadosEnviados = new EventEmitter<Transacao>();

  transacoes!: FormGroup;

  @Input()label: string = '';
  @Input()categorias: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transacoes = this.fb.group({
      valor: ['',[Validators.required]],
      categoria: ['',[Validators.required]],
      descricao: ['',[Validators.required]],
      data: [this.obterDataAtualFormatada(),[Validators.required]],
      hora: [this.obterHoraAtual(),[Validators.required]]
    })
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
    this.dadosEnviados.emit(this.transacoes.value);
    this.transacoes.patchValue({valor: '', descricao: ''});
  }

}
