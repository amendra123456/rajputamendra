import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import MetisMenu from 'metismenujs';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import {listDATA} from './list';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { from } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})

/**
 * Sidebar Component
 */
export class SidebarComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  menu: any;
  menuItems: MenuItem[] = [];
  listDATA: any = [];
  isShowSubList: boolean = true;
  constructor(private router: Router, public translate: TranslateService,private _cd:ChangeDetectorRef) {
    translate.setDefaultLang('en');
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        // this._activateMenuDropdown();
      }
    });
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    document.body.classList.remove('sidebar-enable');
  }
  @HostListener('click',['$event'])
  onClick(event:MouseEvent){
   console.log(event);
   this.router.events.subscribe((event:any)=>{
    if(event instanceof NavigationEnd){
      document.body.classList.remove('sidebar-enable');
    }
   })
  }
  
  ngOnInit(): void {
    
    this.menuItems = MENU;
    //  Hiding the one of the  menu item from menuItems data of Material designs..
    //  let arr:any=[];
    //  for(let i in this.menuItems){
    //   if(+i < 2 ){
    //     arr.push(this.menuItems[i])
    //   }
    //  }
    //  this.menuItems=arr;
    // this.listDATA = [
    //   {
    //     name: 'Search Your Audience', icon: "briefcase", showSubList:'false',extraClass:'',
    //      sublist:
    //       [{name:'Quick view'},{ name: 'Level 1 - Demographic and Industry', },
    //        { name: 'Level 2 - Persona and Behaviour' },
    //       { name: 'Level 3 - Keyword Based' },
    //       ]
    //   },
    //   {
    //     name: 'Know Your Audience (Consumer 360° view)', icon: "briefcase", showSubList:'false',extraClass:'', sublist: [{name:'Quick view'},{ name: 'Level 2 - Persona and Behaviour (Limited Search Queries)' },
    //     { name: 'Level 3 - Keywords (Unlimited Search Queries)' }]
    //   },
    //   { name: 'Reach Your Audience', icon: "briefcase", showSubList:'false',extraClass:'', sublist: [{name:'Quick view'},{ name: 'Level 1' }, { name: 'Level 2' }] },
    //   { name: 'Research & Insights', icon: "briefcase", showSubList:'false',extraClass:'', sublist: [{name:'Quick view'}] }
    // ]

    this.listDATA=listDATA;
    console.log(this.menuItems);
    console.log(this.listDATA)
    this._cd.detectChanges()
  }

  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
  }
  // toggleStyle(i:number,str:string) {
  //   this.listDATA[i].showSubList=!this.listDATA[i].showSubList;
  //   if (str == 'show') {
  //    this.listDATA[i].extraClass='sub-link-show';
  //   }
  //   else {
  //     this.listDATA[i].extraClass='sub-link-hide';
  //   }
  //   this.listDATA.forEach((item:any,k:number)=>{
  //     if(k !== i){
  //       this.listDATA[k].extraClass='sub-link-hide';
  //       this.listDATA[k].showSubList='false';
  //     }
  //   })
  // }

  /***
   * Activate droup down set 
   */
  ngAfterViewInit() {
    this.menu = new MetisMenu('#side-menu');
    // this._activateMenuDropdown();
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className: any) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
    this._cd.detectChanges()
  }

  // tagNames:any=[];
  toggleClass(id:string){
    // this.tagNames.length = 0;
    const ele = document.getElementById(id);
    console.log(ele?.classList);
    
    for(let i of listDATA){
      if(i.id != ele?.id){
        let ele = document.getElementById(i.id);
        ele?.classList.remove('mm-active');
        ele?.classList.remove('mm-show')
        let ul = ele?.getElementsByTagName('ul')[0]
           ul?.classList.remove('mm-show')
      }
     
    }
  }
  // call_tags(){
  //  this.tagNames.forEach((item:any)=>{
  //   console.log(item)
  //   item?.classList?.remove('mm-show')
  //  })
  // }
  /**
   * Activate the parent dropdown
   */
  // hideChild(i:any){
  
  // }
  // _activateMenuDropdown() {
  //   this._removeAllClass('mm-active');
  //   this._removeAllClass('mm-show');
  //   const links: any = document.getElementsByClassName('side-nav-link-ref');
  //   let menuItemEl = null;
  //   // tslint:disable-next-line: prefer-for-of
  //   const paths = [];
  //   for (let i = 0; i < links.length; i++) {
  //     paths.push(links[i]['pathname']);
  //   }
  //   var itemIndex = paths.indexOf(window.location.pathname);
  //   if (itemIndex === -1) {
  //     const strIndex = window.location.pathname.lastIndexOf('/');
  //     const item = window.location.pathname.substr(0, strIndex).toString();
  //     menuItemEl = links[paths.indexOf(item)];
  //   } else {
  //     menuItemEl = links[itemIndex];
  //   }
  //   if (menuItemEl) {
  //     menuItemEl.classList.add('active');
  //     const parentEl = menuItemEl.parentElement;
  //     if (parentEl) {
  //       parentEl.classList.add('mm-active');
  //       const parent2El = parentEl.parentElement.closest('ul');
  //       if (parent2El && parent2El.id !== 'side-menu') {
  //         parent2El.classList.add('mm-show');
  //         const parent3El = parent2El.parentElement;
  //         if (parent3El && parent3El.id !== 'side-menu') {
  //           parent3El.classList.add('mm-active');
  //           const childAnchor = parent3El.querySelector('.has-arrow');
  //           const childDropdown = parent3El.querySelector('.has-dropdown');
  //           if (childAnchor) {
  //             childAnchor.classList.add('mm-active');
  //           }
  //           if (childDropdown) {
  //             childDropdown.classList.add('mm-active');
  //           }
  //           const parent4El = parent3El.parentElement;
  //           console.log(parent4El)
  //           if (parent4El && parent4El.id !== 'side-menu') {
  //             parent4El.classList.add('mm-show');
  //             const parent5El = parent4El.parentElement;
  //             console.log(parent5El)
  //             if (parent5El && parent5El.id !== 'side-menu') {
  //               parent5El.classList.add('mm-active');
  //               const childanchor = parent5El.querySelector('.is-parent');
  //               console.log(childanchor)
  //               if (childanchor && parent5El.id !== 'side-menu') {
  //                 childanchor.classList.add('mm-active');
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   this._cd.detectChanges()
  // }
}
