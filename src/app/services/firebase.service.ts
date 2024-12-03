import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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

  getItems(collectionName: string): Observable<ITransacao[]> {
    const collectionRef: AngularFirestoreCollection<any> = this.afs.collection(collectionName);
    const items$: Observable<ITransacao[]> = collectionRef.valueChanges();
    return items$;
  }
}
