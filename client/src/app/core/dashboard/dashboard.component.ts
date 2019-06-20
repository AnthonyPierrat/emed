import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  lastBlock: any;
  history: any[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.transactionService.getTransactionByPublicKey(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.lastBlock = result.data[0].data.record;
        this.history = result.data[0].transactionHistory;
      },
      error => {

      },
      () => {
        console.log(this.history, this.lastBlock);
      }
    );
  }

}
