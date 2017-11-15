
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios }         from '../services/servicios';
import { ServiciosGlobalesActividades} from './servicios-globales-actividades'

import { Mapa }   from './modulo_mapa/mapa.component';

@Component({
	selector: 'actividad-panel-publico',
	templateUrl: './actividad-panel-publico.component.html',
	styleUrls: [ './actividad-panel-publico.component.css' ]
})

export class ActividadPanelPublico implements OnInit{	
	miPorcentaje:number = 100;
	porcentajeAsignado:number = 0;
	flag:boolean=true;
	isEditar:boolean=false;
	isSubActivity:any = [];
	subActivity:any = 0;
	usuarios:any = []
	isSearch:boolean = false;
	actividades:any;
	porcentaje_ejecutado:number;
	http:string = this.serviciog.servidor + "Category/";
	nombreUsuario:string = "";
	public nombreDireccion:string = "";
	
	constructor(
		private serviciog:ServiciosGlobales,
		private serviGloAct:ServiciosGlobalesActividades,
		private router:Router,
		private servicios: Servicios,
		private mapa: Mapa  
		){ };

	ngOnInit():void {		
		//this.nombreUsuario = this.serviciog.usuario.nombre +" "+ this.serviciog.usuario.apellido;
		this.serviciog.actividades = [];
		this.serviciog.actividad =null;
		this.serviciog.isSelAct =false;
		this.serviciog.isSubActivity = null;
		this.serviciog.isSelAct = false;
		this.serviGloAct.actOpt = 0;


		if(this.serviciog.proyecto_publico){			
			
			this.serviciog.proyecto = this.serviciog.proyecto_publico;
			this.serviciog.titulo =  this.serviciog.proyecto.nom_pro;
			alert(JSON.stringify(this.serviciog.titulo))			
			var keym = this.serviciog.proyecto_publico.keym;
			var id_usuario = this.serviciog.proyecto_publico.id_usuario;
			var id_caracteristica = this.serviciog.proyecto_publico.id_caracteristica;		

			this.servicios.getActividad(keym,id_usuario,id_caracteristica)
			.then(actividades =>{				
				if(actividades){
					this.serviciog.actividades = actividades;					
					this.calculateValue(this.serviciog.actividades);
				}
			});	
		}else{
			let link = ['proyectospublico'];
			this.router.navigate(link);
		}
	}

	actualizarActividad(actividad){
		var isUpdatePercentage = false;
		this.isEditar = !this.isEditar;
		////se comprueba si ubieron cambios en el porcentaje ejecutado
		if(this.porcentaje_ejecutado != actividad.porcentaje_cumplido){
			this.porcentaje_ejecutado = actividad.porcentaje_cumplido - this.porcentaje_ejecutado;
			//this.porcentaje_ejecutado = this.porcentaje_ejecutado * (actividad.porcentaje/100);
			
			isUpdatePercentage = true;
			console.log(this.porcentaje_ejecutado);
			alert("entra cambios")
		}

		var formData = new FormData();
		formData.append("actividad",JSON.stringify(actividad));
		formData.append("porcentaje_cumplido",JSON.stringify(this.porcentaje_ejecutado));
		formData.append("isUpdatePercentage",JSON.stringify(isUpdatePercentage));
		
		this.servicios.updateCaracteristica(formData)
		.then(message=>{
			alert(JSON.stringify(message));					
		});
	}

	/*----------------Mapas Metodos----------------*/

	
	
	/*-----------------Fin Mapas Metodos-----------*/
	editarClick(actividad){
		this.isEditar = !this.isEditar;
		this.porcentaje_ejecutado = actividad.porcentaje_cumplido;
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

	search(term: string){
		if(term != ''){
			this.isSearch=true
		}
		this.actividades = this.serviciog.actividades.filter(
			item  => item.nom_act.toLowerCase().indexOf(term.toLowerCase()) !== -1	 	
			);			
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
			this.serviciog.actividad = null;
		}else{
			this.serviciog.actividad = this.serviciog.isSubActivity;
		}		
	}

	sendPercentage()
	{		
		var formData = new FormData();
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
		this.serviciog.titulo = this.serviciog.proyecto_publico.nom_pro;
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

		this.serviGloAct.lastActividad = this.serviciog.isSubActivity;


		this.subActivity = [];
		this.serviciog.actividades = [];
		this.serviciog.actividad = actividad;
		this.serviciog.isSubActivity = actividad;
		var keym = actividad.keym;
		var id_usuario = actividad.id_usuario;
		var id_caracteristica = actividad.id_caracteristica;
		
		this.serviciog.titulo = actividad.nom_act;
		this.serviGloAct.actOpt= 1;
		

		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad => { 
			if(actividad){
				this.serviciog.actividades = actividad;
			}		
		});
	}

	regresar(){		
		if(this.serviGloAct.lastActividad != this.serviciog.isSubActivity && this.serviGloAct.lastActividad){
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
		}else{			
			this.inicio();
		}
	}

	getUsers(){		
		this.servicios.getUserList(null)
		.then(usuarios => {
			if(usuarios){				
				this.usuarios = usuarios;
			}			
		})
	}

	asignarUsuario(usuario){
		this.serviciog.actividad.usr_nom = usuario.nombre;
		this.serviciog.actividad.usr_ape = usuario.apellido;
		this.serviciog.actividad.e_mail = usuario.e_mail;
		var formData = new FormData();
		formData.append("keym","0");
		formData.append("usuario",JSON.stringify(usuario));
		formData.append("caracteristica",JSON.stringify(this.serviciog.actividad));
		this.servicios.assignActivityToUser(formData)
		.then(message =>{
			alert(JSON.stringify(message));
		})
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


