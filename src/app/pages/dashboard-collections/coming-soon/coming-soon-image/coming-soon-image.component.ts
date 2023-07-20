import { Component,OnInit } from '@angular/core';
//import { NgModule } from '@angular/core';
//import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { Router } from '@angular/router';


@Component({
  selector: 'app-coming-soon-image',
  templateUrl: './coming-soon-image.component.html',
  styleUrls: ['./coming-soon-image.component.scss']
})

export class ComingSoonImageComponent implements OnInit {
  public href: string = "";
  comingSoonImg : any;

    constructor(private router: Router) {}

    ngOnInit() {
        this.href = this.router.url;
        console.log("DATATTTTTTTAAAA<<<<<<",this.router.url);
        if(this.router.url=="/search-audience/demographic"){
        this.comingSoonImg = "assets/images/Demographic-and-Industry (2).png"
        }else if(this.router.url=="/search-audience/person"){
          this.comingSoonImg = "assets/images/Persona-and-Behaviour-2.png"

        }else if(this.router.url=="/search-audience/keyword"){
          this.comingSoonImg = "assets/images/Keyword-Based.png"
        }else if(this.router.url=="/know-audience/persona"){
          this.comingSoonImg = "assets/images/Persona-and-Behaviour-(Limited-Search-Queries).png"

        }else if(this.router.url=="/know-audience/keyword"){
          this.comingSoonImg = "assets/images/Keywords-(Unlimited-Search-Queries).png"

        }else if(this.router.url=="/reach-audience/level1"){
          this.comingSoonImg = "assets/images/level-1.png"

        }else if(this.router.url=="/reach-audience/level2"){
          this.comingSoonImg = "assets/images/level-2.png"

        }else if(this.router.url=="/know-audience/demographic"){
          this.comingSoonImg = "assets/images/Know-Your-Audience-Demographic.png"

        }else if(this.router.url=="/insight/insight"){
          this.comingSoonImg = "assets/images/research-and-insight.png"
        }
    }
  
}
