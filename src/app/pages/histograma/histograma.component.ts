import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Observable } from 'rxjs';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})
export class HistogramaComponent implements OnInit {

  constructor(private north: NorthwindService) { }
  @Input() selectDimension:string="";
  //DATA NG SELECT
  defaultBindingsList = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Producto' },
    { value: 3, label: 'Empleado'}
];

//Ng-select multiple item dimension
cliente$: Observable<any>;
selectedItemDim:any[]=[];

//Ng-select multiple año
anio$: Observable<any>;
selectedAnio:any[]=[];

//Ng-select multiple mes
mes$: Observable<any>;
selectedMes:any[]=[];

valoresBody:string="";
//valoresBody:any[]=[];
selectedDimension = null;
selectedItemsDimension=[];
  columnas:Label[]=[];
  datosTabla:any[]=[];

  ngOnInit(): void {
    //this.selectedAnio=this.anio$;
    this.datosTabla=[ { data: [] },]
    this.mes$=this.north.getMonths();
    this.anio$=this.north.getYears();
    this.selectedDimension = this.defaultBindingsList[0];
    this.selectDimension="Selecciona "+this.selectedDimension.label;
    this.cliente$ = this.north.getItemsByDimension(this.selectedDimension.label,'DESC');
  }

  recibeEvento($event){
    console.log($event);
  }


  onChangedDimension($event){
    console.log('Item seleccionado: ', $event);
    this.selectedItemDim = [];
    this.selectedAnio = [];
    this.selectedMes= [];
    this.selectedDimension=$event;
    this.selectDimension="Selecciona "+this.selectedDimension.label;
   
    this.cliente$ = this.north.getItemsByDimension(this.selectedDimension.label,'DESC');
  }

  clearModel() {
    this.selectedItemDim = [];
  }

changeModel() {
    this.selectedItemDim = [{ name: 'Nuevo cliente' }];
}

valorJson = [];
onChangedItemDimension($event){
  this.valorJson=[
    {itemdim:this.selectedItemDim ,anios:this.selectedAnio,meses:this.selectedMes},
  ]
  //this.valoresBody="{ itemdim:"+this.selectedItemDim+", anios:"+this.selectedAnio+", meses:"+this.selectedMes+"}";
  if(this.selectedAnio.length==0&&this.selectedMes.length==0){
    this.selectedAnio.push('1996');
    this.selectedAnio.push('1997');
    this.selectedAnio.push('1998');
    this.selectedMes.push('Enero');
    this.selectedMes.push('Febrero');
    this.selectedMes.push('Marzo');
    this.selectedMes.push('Abril');
    this.selectedMes.push('Mayo');
    this.selectedMes.push('Junio');
    this.selectedMes.push('Julio');
    this.selectedMes.push('Agosto');
    this.selectedMes.push('Septiembre');
    this.selectedMes.push('Octubre');
    this.selectedMes.push('Noviembre');
    this.selectedMes.push('Diciembre');
  }

  if(this.selectedAnio.length==0&&this.selectedMes.length>0){
    this.selectedAnio.push('1996');
    this.selectedAnio.push('1997');
    this.selectedAnio.push('1998');
    
  }
  if(this.selectedAnio.length>0&&this.selectedMes.length==0){
    this.selectedMes.push('Enero');
    this.selectedMes.push('Febrero');
    this.selectedMes.push('Marzo');
    this.selectedMes.push('Abril');
    this.selectedMes.push('Mayo');
    this.selectedMes.push('Junio');
    this.selectedMes.push('Julio');
    this.selectedMes.push('Agosto');
    this.selectedMes.push('Septiembre');
    this.selectedMes.push('Octubre');
    this.selectedMes.push('Noviembre');
    this.selectedMes.push('Diciembre');
    
  }

   
    /*if(this.selectedMes.length==0&&this.selectedAnio.length>0){
      this.mes$.forEach(function (value) {
        this.selectedMes.push(value);
      }); 
    }*/
    
  
  this.north.getDataBarByDimension(this.selectedDimension.label,'DESC',this.valorJson[0]).subscribe((result:any)=>{
    this.datosTabla=result.datosTabla;
    this.columnas=result.columnas;
  });
}


onChangedYear($event){
  this.valorJson=[
    {itemdim:this.selectedItemDim ,anios:this.selectedAnio,meses:this.selectedMes},
  ]
  //this.valoresBody="{ itemdim:"+this.selectedItemDim+", anios:"+this.selectedAnio+", meses:"+this.selectedMes+"}";
    this.north.getDataBarByDimension(this.selectedDimension.label,'DESC',this.valorJson[0]).subscribe((result:any)=>{
      this.datosTabla=result.datosTabla;
      this.columnas=result.columnas;
    });
}
}
