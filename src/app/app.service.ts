import { Produto } from './mercado.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  dialogData: any;
  onParticipantesChanged: BehaviorSubject<any>;
  onContactsChanged: BehaviorSubject<any>;
  dataChange: BehaviorSubject<Produto[]> = new BehaviorSubject<Produto[]>([]);
 

  constructor(
    private http : HttpClient
  
  ) {
    this.onParticipantesChanged = new BehaviorSubject([]);
    this.onContactsChanged = new BehaviorSubject([]);

   }

  API = `${environment.API}produto`

  get data(): Produto[] {
    return this.dataChange.value;
  }
  getUsers()
  {
    return this.http.get<Produto[]>(this.API);
  }
  create(base: any){
    return this.http.post(this.API, base).pipe();

  }
  loadByID(id: Produto) {
    return this.http.get(`${this.API}/${id}`).pipe();
  }
  update(produto: Produto): Observable<Produto> | any {
    return this.http.put(`${this.API}/${produto.id}`, produto).pipe();
    
  }
  getParticipantes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.API}Users`)
        .subscribe((response: any) => {
          console.log(response);
        
        }, reject);
    }
    );
  }
  getAllIssues(): void {
    this.http.get<Produto[]>(this.API).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }
  updateIssue(produto: Produto): void {
    this.http.put(this.API, produto).pipe();
    console.log(produto)
  }
  getDialogData() {
    return this.dialogData;
 
  }
  deleteIssue(id: number): void {
    this.http.delete(`${this.API}/${id}`).pipe();
    console.log(id)
  }
}
