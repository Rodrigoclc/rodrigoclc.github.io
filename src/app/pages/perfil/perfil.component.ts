import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile, updatePhoneNumber, PhoneAuthCredential, getAuth } from 'firebase/auth';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  private afAuth = inject(AngularFireAuth);
  protected user: any;
  private formBuilder = inject(FormBuilder);
  protected initRequest: boolean = true;
  protected form = this.formBuilder.group({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: ''
  });

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user);
        this.initRequest = false;
        // Preencher o formulário com os dados do usuário
      }
    });
    console.log(this.user)
  }

  async updateProfile() {
    console.log(this.form.value.email == '');
    console.log(this.user.photoURL)
    try {
      await updateProfile(this.user, {
        displayName: this.form.value.displayName != '' ? this.form.value.displayName : this.user.displayName , // Novo nome
        photoURL: this.form.value.photoURL != '' ? this.form.value.photoURL :  this.user.photoURL, // Nova foto URL
      });
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  }

  // async updateProfile() {
  //   try {
  //     const auth = getAuth(); 
  //     await updateProfile(this.user, {
  //       displayName: this.user.displayName, 
  //       photoURL: this.user.photoURL, 
  //       email: this.user.email 
  //     });
  //     console.log('Perfil atualizado com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao atualizar perfil:', error);
  //   }
  // }
}
