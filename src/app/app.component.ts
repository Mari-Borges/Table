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

 dataSource!: FilesDataSource;
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
    this.rs.getUsers().subscribe
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
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.rs.getDialogData());
        //this.refreshTable();
      }
    });
  }
  Edit(i: number, id: number, nomeProduto: string, valorProduto: number) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialogService.open(EditComponent, {
      data: {id: id, nomeProduto: nomeProduto, valorProduto: valorProduto}
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.rs.getDialogData();
        // And lastly refresh table
       // this.refreshTable();
      }
    });
    console.log(this.dataSource)
  }
  Delete(i: number, id: number, nomeProduto: string, valorProduto: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialogService.open(DialogComponent, {
      data: {id: id, nomeProduto: nomeProduto, valorProduto: valorProduto}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
       // this.refreshTable();
      }
    });
  }
 
}

// dataSouce 
  export class FilesDataSource extends DataSource<Produto> {

    _filterChange = new BehaviorSubject('');

   get filter(): any {
    return this._filterChange.value;
  }
  set filter(filter: any) {
    this._filterChange.next(filter);
  }
  filteredData: Produto[] = [];
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
    

  
  function compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
}
