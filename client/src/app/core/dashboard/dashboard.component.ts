import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private activeTab: number = 1;
  private currentUser: any;

  constructor(private transactionService: TransactionService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
