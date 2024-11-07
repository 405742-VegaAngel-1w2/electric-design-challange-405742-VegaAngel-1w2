import { Component, inject, numberAttribute } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ElectricService } from '../electric.service';
import { Budget, Cotizacion, Zone } from '../models/budget';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent {
  // ADDITIONAL DOCS: same as BudgetListComponent
  private service:ElectricService = inject(ElectricService)
  constructor(private route: Router,private router: ActivatedRoute) {}
  zone = Object.values(Zone)
  id : any = '';
  boxNecesaries:number =0;
  cajaDisponible:number = 0;
  data:Budget|null = null
  total:number = 0
  cotizaciones : Cotizacion[]  = []
  ContizacionX :Cotizacion = new Cotizacion()

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.service.getBudgesById(this.id).subscribe(
      (respuesta) => {


        this.data = respuesta
        console.log(this.data)
    this.calculateBoxes()
    this.calculateTotal()
    this.calculateCotizaciones()
    console.log(this.cotizaciones)

      },
      (error) => {
        console.error('Error:', error);
    });
  }
  backToList(){
    this.route.navigate(['/budgetList'])
  }
  calculateBoxes(){
    
      this.data?.modules.forEach(item => {
        if(this.cajaDisponible == 3){
            this.boxNecesaries++
        }
        else if(this.cajaDisponible == 0){
            this.cajaDisponible = Number(item.places)
        }
        else if((this.cajaDisponible + Number(item.places)) == 3){
            this.boxNecesaries++
            this.cajaDisponible = 0
        }
        else if((this.cajaDisponible % 3)==0){
          this.boxNecesaries = this.boxNecesaries + Number(item.places)
        }else if(this.cajaDisponible + Number(item.places) != 3){
          this.cajaDisponible = this.cajaDisponible + Number(item.places)
        }
        else{
          this.cajaDisponible= this.cajaDisponible + Number(item.places)
        }
      }); 
      if(this.cajaDisponible == 3){
        this.boxNecesaries++
     }else if(this.cajaDisponible != 0){
      this.boxNecesaries++
     }
      
  }
  calculateTotal(){
    if(this.data!= null){
    for (let index = 0; index < this.data?.modules.length; index++) {
      this.total = this.total + this.data.modules[index].price
    }
  }
  }
  calculateCotizaciones(){
    this.cotizaciones = []; // Reinicia el array para que no acumule datos de llamadas previas
    for (let index = 0; index < this.zone.length; index++) {
      // Crea una nueva instancia de Cotizacion para cada zona
      let cotizacionX: Cotizacion = new Cotizacion();
      cotizacionX.ambient = this.zone[index];
  
      if (this.data != null) {
        for (let index2 = 0; index2 < this.data.modules.length; index2++) {
          if (this.zone[index] == this.data.modules[index2].ambient) {
            cotizacionX.modules.push({
              id: index,
              name: this.data.modules[index2].moduleType,
              slots: Number(this.data.modules[index2].places),
              price: Number(this.data.modules[index2].price)
            });
          }
        }
  
        // Añade la nueva instancia al array
        this.cotizaciones?.push(cotizacionX);
      }
    }}
}
