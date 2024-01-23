import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HighlightDirective } from './directives/highlight.directive';
import { TransacaoComponent } from 'src/app/shared/transacao/transacao.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HighlightDirective,
    TransacaoComponent
  ],
  exports: [
    HighlightDirective,
    TransacaoComponent
  ]
})
export class SharedModule { }
