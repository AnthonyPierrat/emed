import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Types } from 'src/app/shared/enums/type.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  private Types: typeof Types = Types;


  constructor(private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/signin");
  }

}
