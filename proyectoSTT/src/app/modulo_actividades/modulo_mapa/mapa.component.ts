import { Component, OnInit}  from '@angular/core';
import { NgModule, ViewChild } 		 from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

@Component({
	selector: 'mapa',
	templateUrl: './mapa.component.html',
	styleUrls: [ './mapa.component.css' ]
})

export class Mapa implements OnInit{
	icon_marker = "";
	lat: number = 1.2144293922395473;
	lng: number = -77.27847844362259;
	zoom: number = 16; 
	categorias:any;
	categoria:any;
	caracteristica: Caracteristica = new Caracteristica('','','');
	markers:any[] = [];
	mark:any;
	
	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		this.caracteristica.keym_car = this.serviciog.proyecto.keym;
		this.caracteristica.id_caracteristica = this.serviciog.proyecto.id_caracteristica;
		this.caracteristica.id_usuario_car = this.serviciog.proyecto.id_usuario;
		
		var formData = new FormData();
		formData.append('caracteristica', JSON.stringify(this.caracteristica));
		this.servicios.getCategoryList(formData)
		.then(categorias => {
			this.categorias = categorias;
			if(categorias[0]){
				this.categoria = categorias[0];
			}						
		});

		var formData = new FormData();
		formData.append('caracteristica', JSON.stringify(this.serviciog.actividad));
		this.servicios.getPointList(formData)
		.then(marcador =>{	
			alert(JSON.stringify(marcador));
			this.markers = marcador;
			alert(JSON.stringify(this.markers)); 			
		});		
	}

	btnCat(category){		
		this.categoria = category;		
	}	
	
	mapClicked($event: any){

		if(this.mark){
			var marker:any = {
				id_marcador: this.serviciog.actividad.keym,
				keym:this.serviciog.actividad.id_caracteristica,
				id_caracteristica:this.serviciog.actividad.id_usuario,
				id_usuario:$event.coords.lng,
				latitud: $event.coords.lat,
				longitud: this.categoria.id_categoria,
				id_categoria:this.categoria.id_categoria,
				url:'http:///localhost:81/category/' + this.categoria.id_categoria + '.svg'
			};

			var formData = new FormData();
			formData.append('marcador',JSON.stringify(marker));
			this.servicios.regPointMap(formData).
			then(message => {
				if(!message){
					alert("Error al Registrar");
				}else{
					this.markers.push(marker);
				}
			});
		}else{
			var marker:any = {
				id_marcador: this.serviciog.actividad.keym,
				keym:this.serviciog.actividad.id_caracteristica,
				id_caracteristica:this.serviciog.actividad.id_usuario,
				id_usuario:$event.coords.lng,
				latitud: $event.coords.lat,
				longitud: this.categoria.id_categoria,
				id_categoria:this.categoria.id_categoria,
				url:'http:///localhost:81/category/' + this.categoria.id_categoria + '.svg'
			};

			var formData = new FormData();
			formData.append('marcador',JSON.stringify(marker));
			this.servicios.updatePointMap(formData).
			then(message => {
				if(!message){
					alert("Error al actualizar");
				}else{
					this.markers.push(marker);
				}
			});
		}
	}
}

class Caracteristica{
	constructor(	
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		) {  }
}