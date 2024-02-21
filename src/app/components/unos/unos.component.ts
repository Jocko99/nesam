import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Record } from 'src/app/interfaces/record';

@Component({
  selector: 'app-unos',
  templateUrl: './unos.component.html',
  styleUrl: './unos.component.scss'
})
export class UnosComponent implements OnInit {

  isNew = false;

  record!: Record;
  records: Record[] = [];
  entityForm!: UntypedFormGroup;

  createRecord(){
    
  }

  deleteRecord(){

  }

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.entityForm = this.fb.group({
      id: [''],
      rb:[''],
      korisnikUsluge: [''],
      mestoRada: [''],
      rukovaoc: [''],
      radnoVremeOd: [new Date()],
      radnoVremeDo: [new Date()],
      datum: [new Date()],
      vrstaMasine:[''],
      sifra:[''],
      stanjeMotocasovnikaOd:[''],
      stanjeMotocasovnikaDo:['']
    });
    this.router.params.subscribe(params => {
      if(params['id'] === 'new'){
        this.isNew = true;
      }else{
        this.records = JSON.parse(localStorage.getItem('records') || '{}');
        this.record = this.records.find(record => record.id === parseInt(params['id']))!;
        if (this.record) {
          this.record.radnoVremeOd = new Date(this.record.radnoVremeOd);
          this.record.radnoVremeDo = new Date(this.record.radnoVremeDo);
          this.record.datum = new Date(this.record.datum);
          this.entityForm.patchValue(this.record);
        }
      }
    });
  }

  save(){
    this.isNew ? this.saveRecord() : this.updateRecord();
  }

  saveRecord(){
    let id = 0;
    this.record = this.entityForm.value;
    if(localStorage.getItem('records')){
      this.records = JSON.parse(localStorage.getItem('records') || '{}');
      this.record.id = this.records.length > 0 ?  this.records.map((record: Record) => record.id).reduce((a: number, b: number) => Math.max(a, b)) + 1 : 1;
      this.records.push(this.record);
      localStorage.setItem('records', JSON.stringify(this.records));
    }else{
      this.record.id = id + 1;
      this.records.push(this.record);
      localStorage.setItem('records', JSON.stringify(this.records));
    }
    this.messageService.add({severity:'success', summary:'Success', detail:'Zapis je uspešno sačuvan!'});
    this.entityForm.reset();
  }

  updateRecord(){
    this.records = JSON.parse(localStorage.getItem('records') || '{}');
    this.record = this.entityForm.value;
    let index = this.records.findIndex(record => record.id === this.record.id);
    this.records[index] = this.record;
    localStorage.setItem('records', JSON.stringify(this.records));
    this.messageService.add({severity:'success', summary:'Success', detail:'Zapis je uspešno ažuriran!'});
  }
}
