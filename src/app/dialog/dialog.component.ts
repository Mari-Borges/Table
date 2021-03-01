import { AppService } from './../app.service';
import { Routes } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../mercado.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  produtos : Produto[] = [];
  produto: Produto;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public rs: AppService
    
  ) { }

  ngOnInit(): void {
  }
  Cancel(): void {
    this.dialogRef.close();
  }

  confirma(): void {
    this.rs.deleteIssue(this.data.id);
    console.log(this.data.id)
  }
}
