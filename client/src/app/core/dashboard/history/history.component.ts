import { Component, OnInit, Input } from '@angular/core';
import { Events } from 'src/app/shared/enums/event.enum';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  currentUser: any;
  history: any[];
  private Events: typeof Events = Events;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.transactionService.getTransactionByPublicKey(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.history = result.data[0].transactionHistory;
      },
      error => {

      },
      () => {
      }
    );
  }

}
