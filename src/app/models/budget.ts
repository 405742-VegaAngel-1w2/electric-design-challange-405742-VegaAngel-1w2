import { NumberValueAccessor } from "@angular/forms";

export interface Budget {
  id?: string;
  client: string;
  date: Date;
  modules :moduleDetails[]
  /* TODO
     Add collection to hold data about:
        - zone
        - moduleType reference that has information about (slots, price, type)
  */
}
export class Cotizacion{
  ambient:string = ''
  modules:ModuleType[] = []

  constructor(){
    this.ambient = ''
    this.modules = []
  }
}
export interface moduleDetails{
  moduleType: string;
  ambient: string;
  price: number;  // Puedes cambiar a 'number' si el precio es numérico
  places: string; 
}

export enum Zone {
  LIVING = 'Living',
  COMEDOR = 'Comedor',
  KITCHEN = 'Cocina',
  ROOM = 'Dormitorio'
}

export interface ModuleType {
  id: number;
  name: string;
  slots: number;
  price: number;
}
