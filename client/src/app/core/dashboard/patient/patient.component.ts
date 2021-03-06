import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],

})
export class PatientComponent implements OnInit {

  private currentUser: any;
  private patients: any = [];
  private selectedPatient: any;
  private lastRecord: any;
  private toggle: boolean = false;

  constructor(private transactionService: TransactionService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAccesses();
  }

  getAccesses() {
    this.transactionService.getAccessesByPublicKey(this.currentUser._publicKey).subscribe(
      (result: any) => {
        this.patients = result.data.usersCanWrite;
      },
      error => {

      },
      () => { }
    )
  }

  getLastRecords(key: string) {
    this.transactionService.getTransactionByPublicKey(key).subscribe(
      (result: any) => {
        this.lastRecord = Object.assign({}, result.data[0].data.record);
        console.log(this.lastRecord);
      },
      error => {

      },
      () => {
        // refresh due to immutable object
        // this.lastRecord.slice();
      }
    )
  }

  async onUpdatePatient(patient: any) {
    this.selectedPatient = patient;
    await this.getLastRecords(this.selectedPatient._publicKey);
  }

  toggleModal(toggle, reset) {
    this.toggle = !toggle;
  }

}
