import { Routes } from '@angular/router';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetViewComponent } from './budget-view/budget-view.component';

export const routes: Routes = [
    {path:'budgetForm',component:BudgetFormComponent},
    {path:'budgetList',component:BudgetListComponent},
    {path:'budgetView/:id',component:BudgetViewComponent}
];
