import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: []
})
export class ProyectoComponent implements OnInit {
  today = new Date();
  jstoday = '';
  constructor() {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
  }
  ngOnInit() {
  }
}
