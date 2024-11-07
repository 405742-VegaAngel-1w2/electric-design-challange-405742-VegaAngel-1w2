import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Budget, ModuleType, Zone } from '../models/budget';
import { ElectricService } from '../electric.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink,RouterOutlet],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
    zone = Object.values(Zone)
    private service:ElectricService = inject(ElectricService)
    TypeModules: ModuleType[] = [];
    constructor(private router: Router) {}

    ngOnInit(): void {
      this.service.getModules().subscribe((modules: ModuleType[]) => {
        this.TypeModules = modules;
     });
    }
    cambiarModulo(i : number){
      const firstModule = (this.form.controls['modules'] as FormArray).at(i) as FormGroup;

      // Accede a una propiedad específica del primer módulo, como 'moduleType'
 
       firstModule.controls['price'].setValue(this.TypeModules[(firstModule.controls['moduleType'].value) - 1].price) ;
       firstModule.controls['places'].setValue(this.TypeModules[(firstModule.controls['moduleType'].value) -1].slots) 
     }

    


     today = new Date()  
      form = new UntypedFormGroup({
        client:new UntypedFormControl('',[Validators.required]),
        date:new UntypedFormControl('',[Validators.required]),
        modules:new UntypedFormArray([],[])
      })
      onNewEvent(){
        const formArray = this.form.controls["modules"] as FormArray 
        //this.TypeModules = this.service.getModules()  
        const detailForm = new FormGroup({
          moduleType:new FormControl("",[]),
          ambient:new FormControl("",[Validators.required]),
          price:new FormControl({value:'',disabled:true}),
          places:new FormControl({value:'',disabled:true})
        })
        formArray.push(detailForm)
      }
      get modules(){
        return this.form.controls["modules"] as UntypedFormArray
      }
      onDeleteEvent(index:number){
        this.modules.removeAt(index);
      }
    back(){
      
    }
    minModules() {
      const modulesControl = this.form.get('modules') as UntypedFormArray;
      if (modulesControl.length < 2) {
        modulesControl.setErrors({ minModules: true });
      } else {
        modulesControl.setErrors(null);
      }
    }
    save(){
      this.modules.controls.forEach((module) => {
        module.enable()      
      });
    
        console.log(this.form.value)
        if(this.form.valid){
          const entity: Budget = this.form.value;
          const addSubscription = this.service.postCotizacion(entity).subscribe({
            next: () => {
              this.router.navigate(['budgetList']);
            },
            error: (err) => {
              alert('Error al comunicarse con la API')
            }
          });
          
        }
        }
    }

