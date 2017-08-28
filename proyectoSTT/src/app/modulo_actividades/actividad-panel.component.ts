
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios }         from '../services/servicios';
import { ServiciosGlobalesActividades} from './servicios-globales-actividades'

@Component({
	selector: 'actividad-panel',
	templateUrl: './actividad-panel.component.html',
	styleUrls: [ './actividad-panel.component.css' ]
})

export class ActividadPanel implements OnInit{	
	miPorcentaje:number = 100;
	porcentajeAsignado:number = 0;
	flag:boolean=true;
	isEditar:boolean=false;
	isSubActivity:any = [];
	subActivity:any = 0;
	constructor(
		private serviciog:ServiciosGlobales,
		private serviGloAct:ServiciosGlobalesActividades,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		this.serviciog.actividades = [];
		if(this.serviciog.proyecto){
			this.serviciog.titulo = this.serviciog.proyecto.nombre;
			var keym = this.serviciog.proyecto.keym;
			var id_usuario = this.serviciog.proyecto.id_usuario;
			var id_caracteristica = this.serviciog.proyecto.id_caracteristica;		

			this.servicios.getActividad(keym,id_usuario,id_caracteristica)
			.then(actividades =>{				
				if(actividades){
					this.serviciog.actividades = actividades;					
					this.calculateValue(this.serviciog.actividades);

				}
			});	
		}else{
			let link = ['administrador'];
			this.router.navigate(link);
		}

	}

	actualizarActividad(actividad){
		this.isEditar = !this.isEditar;
		var formData = new FormData();
		formData.append("actividad",JSON.stringify(actividad));
		this.servicios.updateCaracteristica(formData)
		.then(message=>{
			alert(JSON.stringify(message));
		});
	}

	editarClick(){
		this.isEditar = !this.isEditar;
	}

	onSelectActivity(activity){
		this.miPorcentaje = 100;
		this.porcentajeAsignado =0;
		this.serviciog.actividad = activity;
		this.serviciog.isSelAct = true;		
		this.serviGloAct.actOpt = 1;
		this.serviGloAct.subActividades = [];
		
		var keym = activity.keym;
		var id_usuario = activity.id_usuario;
		var id_caracteristica = activity.id_caracteristica;		

		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividades =>{				
			if(actividades){
				this.serviGloAct.subActividades = actividades;
				this.calculateValue(actividades);												
			}
		});

	}

	valPor(flag,i){
		if(flag){
			if(this.serviciog.actividades[i].porcentaje < 0){				
				this.serviciog.actividades[i].porcentaje = 0;
				this.calculateValue(this.serviciog.actividades);
			}else if(this.serviciog.actividades[i].porcentaje > 100){				
				this.serviciog.actividades[i].porcentaje = 100;
				this.calculateValue(this.serviciog.actividades);				
			}else{				
				this.calculateValue(this.serviciog.actividades);
			}
		}else{			
			this.calculateValue(this.serviGloAct.subActividades);
		}		
	}

	tituloClick(){
		if(!this.serviciog.isSubActivity){
			this.serviciog.isSelAct = false;
			this.serviGloAct.actOpt = 0;
		}else{
			this.serviciog.actividad = this.serviciog.isSubActivity;
		}		
	}

	sendPercentage()
	{		
		var formData = new FormData();
		alert(this.serviciog.isSelAct);
		if(!this.serviciog.isSelAct){			
			formData.append("actividades",JSON.stringify(this.serviciog.actividades))
		}
		else{
			formData.append("actividades",JSON.stringify(this.serviGloAct.subActividades))
		}
		
		this.servicios.updatePercentage(formData)
		.then(message => {
			alert(JSON.stringify(message));
		});

	}

	inicio(){
		this.serviciog.titulo = this.serviciog.proyecto.nombre;
		var keym = this.serviciog.proyecto.keym;
		var id_usuario = this.serviciog.proyecto.id_usuario;
		var id_caracteristica = this.serviciog.proyecto.id_caracteristica;		
		this.serviciog.isSubActivity = null;
		this.serviciog.isSelAct = false;
		this.serviGloAct.actOpt = 0;
		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad => this.serviciog.actividades = actividad );
	}

    entrarACtividad(actividad){
    	this.subActivity = [];
	    this.serviciog.actividades = [];
		this.serviciog.actividad = actividad;
		this.serviciog.isSubActivity = actividad;
		var keym = actividad.keym;
		var id_usuario = actividad.id_usuario;
		var id_caracteristica = actividad.id_caracteristica;
		
		this.serviciog.titulo = actividad.nom_act;
		this.serviGloAct.actOpt= 1;
		this.serviGloAct.lastActividad = this.serviciog.isSubActivity;
				
		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad => { 
			if(actividad){
				this.serviciog.actividades = actividad;
			}		
		});
    }

    regresar(){
    	this.subActivity = [];
	    this.serviciog.actividades = [];
		this.serviciog.actividad = this.serviGloAct.lastActividad;
		this.serviciog.isSubActivity = this.serviGloAct.lastActividad;
		var keym = this.serviGloAct.lastActividad.keym;
		var id_usuario = this.serviGloAct.lastActividad.id_usuario;
		var id_caracteristica = this.serviGloAct.lastActividad.id_caracteristica;
		
		this.serviciog.titulo = this.serviGloAct.lastActividad.nom_act;
		this.serviGloAct.actOpt= 1;
				
		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad => { 
			if(actividad){
				this.serviciog.actividades = actividad;
			}		
		});

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

	public doughnutChartLabels:string[] = ['CUMPLIDO', 'NO CUMPLIDO'];
	public doughnutChartData:number[] = [10,20];
	public doughnutChartType:string = 'doughnut';

	// events
	public chartClicked(e:any):void {
		alert(JSON.stringify(e));
		console.log(e);
	}

	public chartHovered(e:any):void {
		alert("HOver")
		console.log(e);
	}


	c0(){		
		this.serviGloAct.actOpt = 0;

	}

	c1(){
		this.serviGloAct.actOpt = 1;
	}

	c2(){		
		this.serviGloAct.actOpt = 2;
	}

	c3(){		
		this.serviGloAct.actOpt = 3;
	}

	c4(){		
		this.serviGloAct.actOpt = 4;
	}

	c5(){		
		this.serviGloAct.actOpt = 5;
		var formData = new FormData();
		if(this.serviciog.isSelAct){			
			formData.append("caracteristica",JSON.stringify(this.serviciog.actividad))
		}
		else{			
			formData.append("caracteristica",JSON.stringify(this.serviciog.proyecto))
		}

		this.servicios.getPercentage(formData)
		.then(message=>{
			var numSi = Number(message);
			var numNo = 100 - Number(message)	
			this.doughnutChartData = [
			numSi,
			numNo

			]		

		})


	}
	c6(){		
		this.serviGloAct.actOpt = 6;
	}
	c7(){		
		this.serviGloAct.actOpt = 7;
	}
	c8(){		
		this.serviGloAct.actOpt = 8;

	}


	calculateValue(actividades){
		var percent = 0;
		for(let i = 0; i <actividades.length; i++){
			percent = percent + Number(actividades[i].porcentaje);
		}
		this.porcentajeAsignado = percent;
		this.miPorcentaje = 100 - this.porcentajeAsignado;
	}	
}


