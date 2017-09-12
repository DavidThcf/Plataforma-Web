import { Component, OnInit}  from '@angular/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

@Component({
	selector: 'estadisticas',
	templateUrl: './estadisticas.component.html',
	styleUrls: [ './estadisticas.component.css' ]
})

export class Estadisticas implements OnInit{
	option:number = 1;
	doughnutChartLabels:string[] ;
	doughnutChartData:number[];
	doughnutChartType:string = 'doughnut';
	Color:any[] = [{backgroundColor: ['rgba(32, 178, 35, 0.8)','rgba(206, 4, 4, 0.81)']}];

	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;

	public barChartData:any[] = [
	{data: [65, 59, 80, 81, 56, 55, 40], label: 'Categoria 1'},
	{data: [28, 48, 40, 19, 86, 27, 90], label: 'Categoria 2'},
	{data: [28, 48, 40, 19, 86, 27, 92], label: 'Categoria 3'}
	];

	public barColor:any[] = [
	{backgroundColor: 'rgba(9,128,1,.8)'},
	{backgroundColor: 'rgba(255,255,1,.8)'}, 
	{backgroundColor: 'rgba(254,0,0,.8)'},
	{backgroundColor: '#4d86dc'}, 
	{backgroundColor: '#f3af37'}
	];

	
	// events
	public chartClicked(e:any):void {		
		console.log(e);
	}

	public chartHovered(e:any):void {
		alert("HOver")
		console.log(e);
	}
	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
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
			console.log('PORCENTAJE '+this.serviciog.proyecto)
			var numNo = 100 - numSi;
			this.doughnutChartLabels = ['EJECUTADO ' + numSi + '%', 'NO EJECUTADO ' + numNo + '%'];
			this.doughnutChartData = [
			numSi,
			numNo
			]
		}			
	}

	cambioGrafico(value){		
		this.option = value;
		console.log(this.option)
	}


}
