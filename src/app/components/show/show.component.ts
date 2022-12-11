import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

//Importar Modelo
import { Post } from 'src/app/post.model';
//Importar Sevicios
import { PostService } from 'src/app/post.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  documents;
  Posts: Post[]

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    //console.log(this.postService.getPosts())
    this.postService.getPosts().subscribe( (res) => {
      this.Posts = res.map((e) => {
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        };
      });
    });
  }

deleteRow = (post) => this.postService.deletePost(post)

}
