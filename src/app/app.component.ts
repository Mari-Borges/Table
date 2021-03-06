import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Produto } from './mercado.interface';
import { MatDialog } from '@angular/material/dialog';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import {map} from 'rxjs/operators';
import { DialogComponent } from './dialog/dialog.component';
import { EditComponent } from './edit/edit.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 exampleDatabase: AppService | null;
 Columns : string[] = ['id', 'nomeProduto', 'valorProduto', 'actions'];

 dataSource!: Banco;
 produtos : Produto[] = [];
 Produto!: Produto;
 index!: number;
 id!: number;

  constructor(
    private rs : AppService,
    private dialogService: MatDialog,
   
    public httpClient: HttpClient
    ){}

    @ViewChild(MatSort) sort: MatSort;
   // @ViewChild('filter',  {static: true}) filter: ElementRef;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  ngOnInit(): void {
    this.rs.list().subscribe
    (
      (response)=>
      {
        this.produtos = response;
      },
    )
  }
  Adicionar() {
    const dialogRef = this.dialogService.open(CadastroComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.rs.getDialog());
        //this.refreshTable();
      }
    });
  }
  Edit(i: number, id: number, nomeProduto: string, valorProduto: number) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialogService.open(EditComponent, {
      data: {id: id, nomeProduto: nomeProduto, valorProduto: valorProduto}  
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.rs.dataChange.value.findIndex(x => x.id === this.id);
        this.rs.dataChange.value[foundIndex] = this.rs.getDialog();
       // this.refreshTable();
      }
    });
   // console.log(this.exampleDatabase);
  }
  Delete(i: number, id: number, nomeProduto: string, valorProduto: number) {
    this.index = i;
    this.id = id;
    console.log(this.id);
    const dialogRef = this.dialogService.open(DialogComponent, {
      data: {id: id, nomeProduto: nomeProduto, valorProduto: valorProduto}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.rs.dataChange.value.findIndex(x => x.id === this.id);
        this.rs.dataChange.value.splice(foundIndex, 1);
       // this.refreshTable();
      }
    });
  }
 
}

// dataSouce 
  export class Banco extends DataSource<Produto> {
    constructor(
      public rs: AppService
      ){
      super();
    }
   // @ViewChild('filter',  {static: true}) filter: ElementRef;
  
    connect(): Observable<any> {
      return this.rs.onContactsChanged
    }
    
    disconnect(): void {
    
  }
}
