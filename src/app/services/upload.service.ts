import { Injectable } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {GalleryImage} from '../models/galleryImage.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";
import {Upload} from '../models/upload.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';
  private uploads: FirebaseListObservable<GalleryImage[]>;
  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) { }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const putUpload = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    putUpload.on(firebase.storage.TaskEvent.STATE_CHANGED,

    (snapshot) => {
      upload.progress = (putUpload.snapshot.bytesTransferred / putUpload.snapshot.totalBytes) * 100;
    },
    (error) => {
      console.log(error);
    },
    (): any => {
      upload.url = putUpload.snapshot.downloadURL;
      upload.name = upload.file.name;
      this.saveFileData(upload);
    }
  );
}
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log(upload.url);
  }
}
