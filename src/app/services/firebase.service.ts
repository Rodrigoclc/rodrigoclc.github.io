import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ITransacao } from '../interfaces/ITransacao';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private afs:AngularFirestore = inject(AngularFirestore);

  addItem(collectionName: string, newDocumentData: ITransacao) {
    this.afs.collection(collectionName).add(newDocumentData)
      .then(docRef => {
        console.log('Document added with ID:', docRef.id);
        // Handle success, e.g., display a message
      })
      .catch(error => {
        console.error('Error adding document:', error);
        // Handle errors, e.g., display an error message
      });
  }

  getTransacoes(collectionName: string): Observable<QuerySnapshot<any>> {
    const collectionRef: AngularFirestoreCollection<any> = this.afs.collection(collectionName);
    const items$: Observable<QuerySnapshot<any>> = collectionRef.get();
    return items$;
  }

  getProjetos(collectionName: string): Observable<string[]> {
    const collectionRef: AngularFirestoreCollection<any> = this.afs.collection(collectionName);
    const items$: Observable<string[]> = collectionRef.valueChanges();
    return items$;
  }
}
