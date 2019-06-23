import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/shared/enums/event.enum';
import Record from 'src/app/shared/models/record.model';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  currentUser: any;
  lastBlock: any;
  permissions: any;

  private accessForm: FormGroup;
  private publicKeyCtrl: FormControl;
  private readCtrl: FormControl;
  private writeCtrl: FormControl;
  private Events: typeof Events = Events;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getLastBlock();
    this.getPermissions();
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
    let data: Record = new Record(this.lastBlock);
    data.event = Events.TRANSFER;
    data.message = `You given access to your medical record to ${formValue.publicKey}`;
    if (formValue.read) {
      data.canSee.push(formValue.publicKey);
    }
    if (formValue.write) {
      data.canWrite.push(formValue.publicKey);
    }
    this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
      result => {
        // todo
      },
      error => {
        // todo
      },
      () => {
        // todo
      }
    );
  }

  revokeWrite(key, index) {
    let data: Record = new Record(this.lastBlock);
    const i = data.canWrite.indexOf(index);
    data.canWrite.splice(i, 1);
    data.event = Events.REVOKE;
    data.message = `You have revoke write access to your medical record to ${key}`;
    this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
      result => {
        // todo
      },
      error => {
        // todo
      },
      () => {
        // todo
      }
    );
  }

  revokeRead(key, index) {
    let data: Record = new Record(this.lastBlock);
    const i = data.canSee.indexOf(index);
    data.canSee.splice(i, 1);
    data.event = Events.REVOKE;
    data.message = `You have revoke read access to your medical record to ${key}`;
    this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
      result => {
        // todo
      },
      error => {
        // todo
      },
      () => {
        // todo
      }
    );
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.accessForm.invalid) {
      return;
    }

    if (!this.accessForm.value.write && !this.accessForm.value.read) {
      return;
    }
    this.addTransaction(this.accessForm.value);
  }

  getPermissions() {
    this.transactionService.getPermissionsByPublicKey(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.permissions = result.data;
      },
      error => {

      },
      () => {
      }
    );
  }

}
