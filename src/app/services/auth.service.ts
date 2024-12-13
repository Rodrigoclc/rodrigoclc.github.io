import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);

  user: any;
  erro: any;
  userDoc!: AngularFirestoreDocument<any>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.userDoc = this.afs.doc(`users/${user.uid}`);
        this.userDoc.valueChanges().subscribe(userData => {
          this.user = userData; // Update user data from Firestore
        });
      } else {
        this.router.navigate(['/login']); // Redirect if not logged in
      }
    });
  }

  updateProfile(formData: any) {
    // Update the user document in Firestore
    this.userDoc.update(formData).then((x) => {
      console.log(x);
      console.log('Profile updated successfully!');
      // Optionally, you can redirect to the profile page or show a success message
    }).catch(error => {
      console.error('Error updating profile:', error);
      // Handle errors appropriately
    });
  }

  async login(email: string, senha: string): Promise<any> {
    try {
      this.auth

      const credencial = await this.auth.signInWithEmailAndPassword(email, senha);
      this.user = credencial.user!.multiFactor;
      this.setUserSubject(this.user);
      return credencial.user!.multiFactor;

    } catch (error) {
      this.erro = error;
      return error;
    }
  }

  async googleSignin(): Promise<any> {
    try {

      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
      this.router.navigate(['/']);
      return credential.user!.multiFactor;

    } catch (error) {
      this.erro = error;
      return error;
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.user = null;
    this.router.navigate(['login']);
  }

  private setUserSubject(user: any) {
    sessionStorage.setItem('user', btoa(JSON.stringify(user.user.email)));
    sessionStorage.setItem('token', btoa(JSON.stringify(user.user.accessToken)));
    this.userSubject.next(user);
  }
}
