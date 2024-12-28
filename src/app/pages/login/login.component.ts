import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { FirebaseAppModule } from '@angular/fire/app';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { IUsuario } from '../../interfaces/IUsuario';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FirebaseAppModule,
    AngularFireAuthModule,
    AngularFireModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginUsuario!: FormGroup;
  initRequest: boolean = false;

  private router = inject(Router);
  private firebaseService = inject(FirebaseService);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.loginUsuario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    this.initRequest = true;
    this.authService.login(this.loginUsuario.value.email, this.loginUsuario.value.senha)
      .then(() => {this.initRequest = false });
  }

  googleSignIn() {
    this.authService.googleSignin();
  }

}
