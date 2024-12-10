import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { INovaCategoria, IProjeto, ITransacao } from '../interfaces/ITransacao';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private afs: AngularFirestore = inject(AngularFirestore);

  addItem(collectionName: string, newDocumentData: ITransacao | INovaCategoria | IProjeto) {
    return this.afs.collection(collectionName).add(newDocumentData)
      .then(docRef => {
        console.log('Document added with ID:', docRef.id);
        // Handle success, e.g., display a message
      })
      .catch(error => {
        console.error('Error adding document:', error);
        // Handle errors, e.g., display an error message
      });
  }

  deleteItem(collectionName: string, documentId: string) {
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(`${collectionName}/${documentId}`);
    docRef.delete()
      .then(() => {
        console.log('Document deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting document:', error);
      });
  }

  updateItem(collectionName: string, documentId: string, newDocumentData: any) {
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(`${collectionName}/${documentId}`);
    docRef.update(newDocumentData)
      .then(() => {
        console.log('Document updated successfully');
      })
      .catch(error => {
        console.error('Error updating document:', error);
      });
  }

  getItems(collectionName: string): Observable<QuerySnapshot<any>> {
    const collectionRef: AngularFirestoreCollection<any> = this.afs.collection(collectionName);
    const items$: Observable<QuerySnapshot<any>> = collectionRef.get();
    return items$;
  }
}
