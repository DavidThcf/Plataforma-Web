import { Component, OnInit}  from '@angular/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'estadisticas',
	templateUrl: './estadisticas.component.html',
	styleUrls: [ './estadisticas.component.css' ]
})

export class Estadisticas implements OnInit{
	option:number = 1;
	caracteristica :Caracteristica = new Caracteristica('','','',2);
	isFirst:boolean = true;
	
	/*GRAFICA DE DONA AVANCE PROYECTO*/
	doughnutChartLabels:string[] ;
	doughnutChartData:number[];
	doughnutChartType:string = 'doughnut';
	Color:any[] = [{backgroundColor: ['rgba(32, 178, 35, 0.8)','rgba(206, 4, 4, 0.81)']}];
	/*FIN AVANCE PROYECTO*/

	/*GRAFICAS AVANCE ACTIVIDADES*/
	doughnutActivitiesChartLabels:string[] = [];
	doughnutActivitiesChartData:number[] = [];
	doughnutActivitiesChartType:string = 'doughnut';
	doughnutColorsActivities:any =[];
	/*-----------------------------------*/
	
	barActivitiesChartOptions:any = {
		//scaleShowVerticalLines: false,
		//responsive: true
	};
	chartActivitiesLabel:string[] = ['Actividades'];
	barActivitiesChartType:string = 'bar';
	barActivitiesChartLegend:boolean = true;
	barActivitiesChartData:any[] = [];
	/*FIN GRAFICA AVANCE ACTIVIDADES*/

	/*GRAFICA CATEGORIAS*/
	categorias:any;
	barChartOptions:any = {
		//scaleShowVerticalLines: false,
		//responsive: true
	};
	chartCategoriaLabel:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	barChartType:string = 'bar';
	barChartLegend:boolean = true;
	public barChartData:any[] = [];
	public barColor:any[] = [];
	/*FIN GRAFICA CATEGORIAS*/
	
	// events
	public chartClicked(e:any):void {		
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		this.getProyectAvance();
		this.getActivtyAvance();
		this.getActivityMarker();	
	}

	getProyectAvance(){
		if(this.serviciog.isSelAct){
			var numSi = this.serviciog.actividad.porcentaje_cumplido;
			var numNo = 100 - numSi;
			this.doughnutChartLabels = ['EJECUTADO ' + numSi + '%', 'NO EJECUTADO ' + numNo + '%'];
			this.doughnutChartData = [
			numSi,
			numNo
			]
		}
		else{
			var numSi = this.serviciog.proyecto.porcentaje_cumplido;			
			var numNo = 100 - numSi;
			this.doughnutChartLabels = ['EJECUTADO ' + numSi + '%', 'NO EJECUTADO ' + numNo + '%'];
			this.doughnutChartData = [
			numSi,
			numNo
			]
		}
		this.chartCategoriaLabel =[]
		for(let i = 0;i<this.serviciog.actividades.length ; i++){
			this.chartCategoriaLabel.push(this.serviciog.actividades[i].nom_act)					
		}

	}

	getActivtyAvance(){
		

		let progresoTotal:number  = 0;
		let backgroundColor:any = [];
		for(let i=0;i < this.serviciog.actividades.length ;i++){
			console.log(this.serviciog.actividades[i]);
			let progreso = this.serviciog.actividades[i].porcentaje_cumplido;
			let nombre1 = this.serviciog.actividades[i].nom_act + ' ' + progreso + '%';
			let asignacion = this.serviciog.actividades[i].porcentaje;			
			let color = "rgb("+ Math.floor(Math.random() * 255) + ","+ 
			Math.floor(Math.random() * 255) + ","+ 
			Math.floor(Math.random() * 255) + ")";
			
			progreso = (Number(progreso) * Number(asignacion) /100);
			let nombre = this.serviciog.actividades[i].nom_act + ' ' + progreso + '%';

			backgroundColor.push(color);
			progresoTotal = progresoTotal + progreso;
			/*----------Barras Actividades--------------*/
			let data ={
				data: [this.serviciog.actividades[i].porcentaje_cumplido,100],
				label:nombre1
			}

			this.barActivitiesChartData.push(data);
			/*------------------------------------------*/
			

			
			this.doughnutActivitiesChartLabels.push(nombre);
			this.doughnutActivitiesChartData.push(progreso);
		}
		backgroundColor.push('rgba(206, 4, 4, 0.81)');
		let colors= {
			'backgroundColor': backgroundColor
		}
		this.doughnutColorsActivities.push(colors);
		console.log(this.doughnutColorsActivities);
		progresoTotal = 100 - progresoTotal;
		this.doughnutActivitiesChartLabels.push('Pendiente ' + progresoTotal +'%');
		this.doughnutActivitiesChartData.push(progresoTotal);
	}

	getActivityMarker(){	
		
		/*Consultar Marcadores por Actividad*/
		this.caracteristica.keym_car = this.serviciog.proyecto.keym;
		this.caracteristica.id_caracteristica = this.serviciog.proyecto.id_caracteristica;
		this.caracteristica.id_usuario_car = this.serviciog.proyecto.id_usuario;
		this.caracteristica.opt = 2;
		
		var formData = new FormData();
		formData.append('caracteristica', JSON.stringify(this.caracteristica));
		this.servicios.getCategoryList(formData)
		.then(categorias => {
			if(categorias){
				this.barChartData = categorias;
				for(let i = 0; i < categorias.length; i++){
					let backgroundcolor = {
						backgroundColor: categorias[i].backgroundcolor
					}
					this.barColor.push(backgroundcolor);				
				}
			}			
		});
	}
	
	cambioGrafico(value){		
		this.option = value;	
	}

	changeGraphics(){
		this.isFirst = !this.isFirst;
	}
}
class Caracteristica{
	constructor(	
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		public opt: number
		) {  }
}