import { inject, Injectable } from '@angular/core';
import { Budget, ModuleType } from './models/budget';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ElectricService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }


  postCotizacion(body: Budget): Observable<Budget> {
    return this.http.post<Budget>('http://localhost:3000/budgets', body);
    }

  getModules():Observable<ModuleType[]>{
    return this.http.get<ModuleType[]>('http://localhost:3000/module-types');
  }
  getBudges():Observable<Budget[]>{
    return this.http.get<Budget[]>('http://localhost:3000/budgets')
  }
  getBudgesById(id:number):Observable<Budget>{
    return this.http.get<Budget>('http://localhost:3000/budgets/'+ id)
  }
}
