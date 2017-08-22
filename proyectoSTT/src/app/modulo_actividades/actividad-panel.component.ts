
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios }         from '../services/servicios';

@Component({
	selector: 'actividad-panel',
	templateUrl: './actividad-panel.component.html',
	styleUrls: [ './actividad-panel.component.css' ]
})

export class ActividadPanel implements OnInit{
	titulo:string;
	actOpt:number = 0;
	actividades:any;	
	isSubActivity:any;


	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		if(this.serviciog.proyecto){
			this.titulo = this.serviciog.proyecto.nombre;
			var keym = this.serviciog.proyecto.keym;
			var id_usuario = this.serviciog.proyecto.id_usuario;
			var id_caracteristica = this.serviciog.proyecto.id_caracteristica;		

			this.servicios.getActividad(keym,id_usuario,id_caracteristica)
			.then(actividad => this.actividades = actividad );	
		}else{
			let link = ['proyecto'];
			this.router.navigate(link);
		}

	}

	onSelectActivity(activity){
		this.serviciog.actividad = activity;
		this.serviciog.isSelAct = true;
		this.actOpt = 1;	
	}

	tituloClick(){
		if(!this.isSubActivity){
			this.serviciog.isSelAct = false;
			this.actOpt = 0;
		}else{
			this.serviciog.actividad = this.isSubActivity;
		}
		
	}

	
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

	
	lat: number = 1.21;
	lng: number = -77.267;
	zoom: number = 14; 

	c0(){		
		this.actOpt = 0;

	}

	c1(){
		this.actOpt = 1;
	}

	c2(){		
		this.actOpt = 2;
	}

	c3(){		
		this.actOpt = 3;
	}

	c4(){		
		this.actOpt = 4;
	}

	c5(){		
		this.actOpt = 5;
	}
	c6(){		
		this.actOpt = 6;
	}
	c7(){		
		this.actOpt = 7;
	}

	entrarAct(subActividad){	
		this.serviciog.actividad = subActividad;
		this.isSubActivity = subActividad;
		var keym = subActividad.keym;
		var id_usuario = subActividad.id_usuario;
		var id_caracteristica = subActividad.id_caracteristica;
		
		this.titulo = subActividad.nom_act;
		
		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad => { 
			if(actividad){
				this.actividades = actividad;
				//this.serviciog.actividad = this.actividades[0];
			}else{
				this.actividades = [];
			}			
		});
	}
	
}
