import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.component.html',
  styles: []
})
export class AnteproyectoComponent implements OnInit {
  today = new Date();
  jstoday = '';
  constructor() {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
  }
  ngOnInit() {
  }
}
