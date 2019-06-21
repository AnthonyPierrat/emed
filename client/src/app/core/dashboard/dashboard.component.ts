import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private activeTab: number = 1;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

}
