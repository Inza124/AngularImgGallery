import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import {AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {GalleryImage} from '../models/galleryImage.model';
import * as firebase from 'firebase';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
private uid: string;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null ) {
        this.uid = auth.uid;
      }
    });
  }
  getImages(): Observable<GalleryImage[]> {
    return this.db.list('uploads').valueChanges(); 
  }
}
