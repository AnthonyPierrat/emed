import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Record from '../../../../shared/models/record.model';
import { Events } from 'src/app/shared/enums/event.enum';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],

})
export class RecordFormComponent implements OnInit, OnChanges {

  @Input() record: any;
  @Input() patient: any;

  private recordForm: FormGroup;
  private firstNameCtrl: FormControl;
  private lastNameCtrl: FormControl;
  private weightCtrl: FormControl;
  private heightCtrl: FormControl;
  private bloodCtrl: FormControl;
  private sexCtrl: FormControl;
  private birthdateCtrl: FormControl;
  private emailCtrl: FormControl;
  private messageCtrl: FormControl;

  private Events: typeof Events = Events;


  constructor(private transactionService: TransactionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
  }

  initForm() {
    this.firstNameCtrl = new FormControl(this.record._firstName);
    this.lastNameCtrl = new FormControl(this.record._lastName);
    this.weightCtrl = new FormControl(this.record._weight);
    this.heightCtrl = new FormControl(this.record._height);
    this.bloodCtrl = new FormControl(this.record._bloodType);
    this.birthdateCtrl = new FormControl(this.record._birthdate);
    this.sexCtrl = new FormControl(this.record._sex);
    this.messageCtrl = new FormControl('', [Validators.required]);

    this.recordForm = new FormGroup({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      weight: this.weightCtrl,
      height: this.heightCtrl,
      bloodType: this.bloodCtrl,
      birthdate: this.birthdateCtrl,
      sex: this.sexCtrl,
      message: this.messageCtrl,
    });
  }

  addTransaction(formValue) {
    let data: Record = new Record(formValue);
    data.canSee = this.record._canSee;
    data.canWrite = this.record._canWrite;
    data.event = Events.VISIT;
    this.transactionService.addTransaction({ publicKey: this.patient._publicKey, data }).subscribe(
      result => {
        // todo
      },
      error => {
        this.toastr.error("Record", 'Error while adding record', { timeOut: 3000 });
      },
      () => {
        this.toastr.success("Record", 'You just added a new record !', { timeOut: 3000 });
        // location.reload();
      }
    );
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.recordForm.invalid) {
      return;
    }

    this.addTransaction(this.recordForm.value);
  }

}
