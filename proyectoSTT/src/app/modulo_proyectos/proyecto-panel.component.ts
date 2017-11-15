import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios }         from '../services/servicios';

@Component({
	selector: 'proyecto-panel',
	templateUrl: './proyecto-panel.component.html',
	styleUrls: [ './proyecto-panel.component.css' ]
})

export class ProyectoPanel implements OnInit{
	proyectos:any;
	isSearch:boolean=false;

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		if(this.serviciog.usuario){
			this.servicios.getProyecto(this.serviciog.usuario.id_usuario + '')
			.then(cadena => {
				alert(JSON.stringify(cadena[0]))
				this.serviciog.proyecto = cadena
			});
		}
	}	

	search(term:string){
		if(term != ''){
			this.isSearch=true
		}
		console.log(this.proyectos)
		this.proyectos = this.serviciog.proyecto.filter(
			item  => item.nombre.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
			item.descripcion.toLowerCase().indexOf(term.toLowerCase()) !== -1

		);

	}

	entrar(proyect:any){
		this.serviciog.proyecto = proyect;		
		let link = ['actividades'];
		this.router.navigate(link);
	}
}