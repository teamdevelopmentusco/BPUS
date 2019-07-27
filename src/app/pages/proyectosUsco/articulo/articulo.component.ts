import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styles: []
})
export class ArticuloComponent implements OnInit {
  today = new Date();
  jstoday = '';
  constructor() {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');
  }
  ngOnInit() {
  }
}
