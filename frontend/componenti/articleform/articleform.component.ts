import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'service/article.service';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.css']
})
export class ArticleformComponent implements OnInit  {
  articles: any[] = [];
  newArticle: any = {};
  
  constructor(private articleService: ArticleService) {}

  ngOnInit() {

    this.loadArticles();
  }
  loadArticles() {
        this.articleService.getArticles().subscribe((data: any) => {
        this.articles = data;
    });
}
addArticle() {
      this.articleService.createArticle(this.newArticle).subscribe(() => {
      this.loadArticles();
      this.newArticle = {};
  });
}
updateArticle(article: any) {
  this.articleService.updateArticle(article.id, article).subscribe(() => {
      this.loadArticles();
  });
}
  
deleteArticle(id: number) {
  this.articleService.deleteArticle(id).subscribe(() => {
      this.loadArticles();
  });
}


}
