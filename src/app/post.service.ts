import { Injectable } from '@angular/core';

//iportad los modulos para DB con firebase
import {AngularFirestore} from '@angular/fire/compat/firestore';

//importamos el modelo creado
import{Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) { }

  //Metodos para CRUD
  getPosts(){
    return this.angularFirestore
              .collection("posts")
              .snapshotChanges()
  }
  GetPostById(id){
    return this.angularFirestore
              .collection("posts")
              .doc(id)
              .valueChanges()
  }
  createPost(post: Post){
    return new Promise<any> ( (resolve, reject) => {
      this.angularFirestore
        .collection("posts")
        .add(post)
        .then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }
  updstePost(post: Post, id){
    return this.angularFirestore
      .collection("posts")
      .doc(id)
      .update({
        title: post.title,
        content: post.content,
        author: post.author,
      });
  }
  deletePost(post){
    return this.angularFirestore
      .collection("posts")
      .doc(post.id)
      .delete();
  }
}
