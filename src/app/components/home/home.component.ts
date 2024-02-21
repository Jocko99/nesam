import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Record } from 'src/app/interfaces/record';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  datumOdSearch: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  datumDoSearch: Date = new Date();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  records: Record[] = [];
  
  createRecord(){
      this.router.navigate(['/unos','new']);
  }

  getRecords(){
    if(localStorage.getItem('records')){
      this.records = JSON.parse(localStorage.getItem('records') || '{}');
    }
  }

  deleteRecord(id: number){
    this.records = this.records.filter(record => record.id !== id);
    localStorage.setItem('records', JSON.stringify(this.records));
    this.getRecords();
  }

  downloadData(){
    let data = JSON.stringify(this.records);
    let blob = new Blob([data], { type: 'text/plain' });
    let url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  search(){
    let datumOd = new Date(this.datumOdSearch);
    let datumDo = new Date(this.datumDoSearch);
    if (this.datumOdSearch && this.datumDoSearch) {
      this.records = this.records.filter(record => {
        let datum = new Date(record.datum);
        return datum >= datumOd && datum <= datumDo;
      });
    }
  }

  editRecord(id: number){
    this.router.navigate(['/unos', id]);
  }

  clearFilters(){
    this.datumOdSearch = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.datumDoSearch = new Date();
    this.getRecords();
  }
}
