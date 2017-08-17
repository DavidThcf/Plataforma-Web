import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

@Component({
	selector: 'categorias',
	templateUrl: './categorias.component.html',
	styleUrls: [ './categorias.component.css' ]
})

export class Categorias implements OnInit{

	categoria:Categoria = new Categoria('','black','','','');
	titulo:string = "Categoria";
	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		

	}

	onSubmit(){
		this.categoria.keym_car = this.serviciog.proyecto.keym;
		this.categoria.id_caracteristica = this.serviciog.proyecto.id_caracteristica;
		this.categoria.id_usuario_car = this.serviciog.proyecto.id_usuario;
		

		alert("Categoria Guardada" + ' ' + JSON.stringify(this.categoria));
		var formData = new FormData();
		formData.append('categoria', JSON.stringify(this.categoria));

		this.servicios.createCategoria(formData)
		.then(message =>{
			alert(message);
		})
	}

	all(){
		//alert("cambio" + '  ' + JSON.stringify(this.categoria));

	}
	
}
class Categoria{
	constructor(
		public nombre:string,
		public color: string,
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		) {  }

}