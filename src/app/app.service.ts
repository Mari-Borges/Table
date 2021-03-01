import { Produto } from './mercado.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  dialogData: any;
  onParticipantesChanged: BehaviorSubject<any>;
  onContactsChanged: BehaviorSubject<any>;
  dataChange: BehaviorSubject<Produto[]> = new BehaviorSubject<Produto[]>([]);
 
  constructor(
    private http : HttpClient,
    private toasterService: ToastrService
  ) {
    this.onParticipantesChanged = new BehaviorSubject([]);
    this.onContactsChanged = new BehaviorSubject([]);

   }

  API = `${environment.API}produto/`

  get data(): Produto[] {
    return this.dataChange.value;
  }
  list()
  {
    return this.http.get<Produto[]>(this.API);
  }
  create(base: any){
    return this.http.post(this.API, base).pipe();

  }
  getDialog() {
    return this.dialogData;
 
  }
  Atualizar(produto: Produto): void {
    this.http.put(this.API + produto.id, produto).subscribe(data => {
        this.dialogData = produto; },
  
    );
  }
  delete(produto: Produto): void {
    this.http.delete(this.API + produto.id).subscribe(data => {}, 
    );
  }
}
