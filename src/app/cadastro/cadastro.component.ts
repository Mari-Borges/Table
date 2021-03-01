import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from '../app.service';
import { Produto } from '../mercado.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  submitted!: boolean;
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private rs: AppService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document
   
    ) { }
    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);
  ngOnInit(): void {
   
  }
  openDialog() {
   this.dialog.open(CadastroComponent);
  }

  Salvar(): void {
    this.rs.create(this.data).subscribe()
    }
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :   
        '';
  }
  Cancel(): void {
    this.dialogRef.close();
  }
  submit() {
  // emppty stuff
  }
}
