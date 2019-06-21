import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/shared/enums/event.enum';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  currentUser: any;
  lastBlock: any;
  canSee: any[];
  canWrite: any[];

  private accessForm: FormGroup;
  private publicKeyCtrl: FormControl;
  private readCtrl: FormControl;
  private writeCtrl: FormControl;
  private Events: typeof Events = Events;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getLastBlock();
    this.getCanSee();
    this.publicKeyCtrl = new FormControl('', [Validators.required, Validators.maxLength(44), Validators.minLength(44)]);
    this.readCtrl = new FormControl(false);
    this.writeCtrl = new FormControl(false);

    this.accessForm = new FormGroup({
      publicKey: this.publicKeyCtrl,
      read: this.readCtrl,
      write: this.writeCtrl,
    });
  }

  getLastBlock() {
    this.transactionService.getTransactionByPublicKey(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.lastBlock = result.data[0].data.record;
      },
      error => {

      },
      () => {
      }
    );
  }

  addTransaction(formValue) {
    // let data = {
    //   firstName: this.lastBlock._firstName,
    //   lastName: this.lastBlock._lastName,
    //   birthdate: this.lastBlock._birthdate,
    //   canSee: this.lastBlock._canSee,
    //   canWrite: this.lastBlock._canWrite,
    //   event: Events.TRANSFER,
    //   message: `You given access to your medical record to ${formValue.publicKey}`
    // }
    // if (formValue.read) {
    //   data.canSee.push(formValue.publicKey);
    // }
    // if (formValue.write) {
    //   data.canWrite.push(formValue.publicKey);
    // }
    // this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
    //   result => {
    //     // todo
    //   },
    //   error => {
    //     // todo
    //   },
    //   () => {
    //     // todo
    //   }
    // );
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.accessForm.invalid) {
      return;
    }

    if (!this.accessForm.value.write && !this.accessForm.value.read) {
      return;
    }
    console.log(this.accessForm);
    // this.addTransaction(this.accessForm.value);
  }

  getCanSee() {
    this.transactionService.getTransactionCanSee(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.canSee = result.data;
      },
      error => {

      },
      () => {
        console.log(this.canSee);
      }
    );
  }

}
