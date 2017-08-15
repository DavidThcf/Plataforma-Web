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

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		if(this.serviciog.usuario){
			this.servicios.getProyecto(this.serviciog.usuario.id_usuario + '')
			.then(cadena => {
				this.serviciog.proyecto = cadena

			});
		}
	}	

	entrar(proyect:any){
		this.serviciog.proyecto = proyect;		
		let link = ['actividades'];
		this.router.navigate(link);
	}
}