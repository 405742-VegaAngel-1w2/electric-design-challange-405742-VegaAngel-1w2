import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ElectricService } from '../electric.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent {
  Data:Budget[]|null = null
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/components/lifecycle#
    - https://angular.dev/guide/http/making-requests#http-observables
    - https://angular.dev/guide/http/setup#providing-httpclient-through-dependency-injection
    - https://angular.dev/guide/http/making-requests#setting-request-headers
    - https://angular.dev/guide/http/making-requests#handling-request-failure
    - https://angular.dev/guide/http/making-requests#best-practices (async pipe)
    - https://angular.dev/guide/testing/components-scenarios#example-17 (async pipe)
  */
    private service:ElectricService = inject(ElectricService)
    constructor(private routes: Router) {}
   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.service.getBudges().subscribe(
      (respuesta) => {
        this.Data = respuesta
      },
      (error) => {
        console.error('Error:', error);
    });
   }

    seeDetails(){
      this.routes.navigate(['/budgetView'])
    }
}
