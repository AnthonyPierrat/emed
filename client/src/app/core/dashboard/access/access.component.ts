import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/shared/enums/event.enum';
import Record from 'src/app/shared/models/record.model';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private transactionService: TransactionService, private toastr: ToastrService) { }

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
    data.message = `New access to ${formValue.publicKey}`;
    if (formValue.read) {
      data.canSee.push(formValue.publicKey);
    }
    if (formValue.write) {
      data.canWrite.push(formValue.publicKey);
    }
    this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
      (result: any) => {
        this.lastBlock = result.data.record;
        this.getPermissions();
      },
      error => {
        this.toastr.error("Grant Access", 'Transfer incorrect', { timeOut: 3000 });
      },
      () => {
        this.accessForm.reset();
        this.toastr.success("Grant Access", 'You just granted new access !', { timeOut: 3000 });
      }
    );
  }

  revokeWrite(key, index) {
    let data: Record = new Record(this.lastBlock);
    const i = data.canWrite.indexOf(index);
    data.canWrite.splice(i, 1);
    data.event = Events.REVOKE;
    data.message = `Write access revoke to ${key}`;
    this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
      (result: any) => {
        this.lastBlock = result.data.record;
      },
      error => {
        this.toastr.error("Revoke Access", 'Error while revoking write access', { timeOut: 3000 });
      },
      () => {
        this.getPermissions();
        this.toastr.success("Revoke Access", 'You have revoked write access', { timeOut: 3000 });
      }
    );
  }

  revokeRead(key, index) {
    let data: Record = new Record(this.lastBlock);
    console.log(data);
    const i = data.canSee.indexOf(index);
    data.canSee.splice(i, 1);
    data.event = Events.REVOKE;
    data.message = `Read access revoke to ${key}`;
    this.transactionService.addTransaction({ publicKey: this.currentUser._publicKey, data }).subscribe(
      (result: any) => {
        this.lastBlock = result.data.record;
      },
      error => {
        this.toastr.error("Revoke Access", 'Error while revoking read access', { timeOut: 3000 });
      },
      () => {
        this.getPermissions();
        this.toastr.success("Revoke Access", 'You have revoked read access', { timeOut: 3000 });
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
