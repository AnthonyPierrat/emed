import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Genders } from 'src/app/shared/enums/gender.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  profile: any;
  private Genders: typeof Genders = Genders;


  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.transactionService.getTransactionByPublicKey(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.profile = result.data[0].data.record;
      },
      error => {

      },
      () => {
      }
    );
  }

}
