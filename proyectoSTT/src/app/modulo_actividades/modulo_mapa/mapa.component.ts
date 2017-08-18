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
	lat: number = 1.21;
	lng: number = -77.267;
	zoom: number = 16; 
	categorias:any;
	categoria:any;
	caracteristica: Caracteristica = new Caracteristica('','','');
	newMarker: Marker = new Marker('','','','','','','','');
	marker: Marker = new Marker('','','','','','','','');

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
			this.marker = marcador;			
			this.marker.url = 'http://10.42.0.1:81/category/' + marcador.id_categoria + '.svg';
			alert(JSON.stringify(this.marker) +'  '+ this.marker.url );
		});		
	}

	btnCat(category){		
		this.categoria = category;
		//alert("Selecciono la categoria" + category.nombre + " " +JSON.stringify(this.categoria));
	}

	btnSelMap(){
		/*this.serviciog.isSelAct = !this.serviciog.isSelAct;
		if(!this.serviciog.isSelAct){
			alert("Actualización Correcta");
		}*/
	}

	clickedMarker(label: string, index: number) {
		
	}
	
	mapClicked($event: any){				
		
		if(this.marker.keym === ''){
			alert("Agregar");
			this.newMarker.keym = this.serviciog.actividad.keym;
			this.newMarker.id_caracteristica = this.serviciog.actividad.id_caracteristica;
			this.newMarker.id_usuario = this.serviciog.actividad.id_usuario;
			this.newMarker.longitud = $event.coords.lng;
			this.newMarker.latitud =  $event.coords.lat;
			this.newMarker.id_categoria = this.categoria.id_categoria;
			this.newMarker.url = 'http:///10.42.0.1:81/category/' + this.categoria.id_categoria + '.svg';
			var formData = new FormData();
			formData.append('marcador',JSON.stringify(this.newMarker));
			this.servicios.regPointMap(formData).
			then(message => {
				if(!message){
					alert("Error al Registrar");
				}else{
					this.marker = this.newMarker;
				}
			});
		}else{
			this.newMarker.id_marcador = this.marker.id_marcador;
			this.newMarker.keym = this.serviciog.actividad.keym;
			this.newMarker.id_caracteristica = this.serviciog.actividad.id_caracteristica;
			this.newMarker.id_usuario = this.serviciog.actividad.id_usuario;
			this.newMarker.longitud = $event.coords.lng;
			this.newMarker.latitud =  $event.coords.lat;
			this.newMarker.id_categoria = this.categoria.id_categoria;
			this.newMarker.url = 'http:///10.42.0.1:81/category/' + this.categoria.id_categoria + '.svg';
			alert("Actualizar" +' '+ JSON.stringify(this.newMarker));
			var formData = new FormData();
			formData.append('marcador',JSON.stringify(this.newMarker));
			this.servicios.updatePointMap(formData).
			then(message => {
				//alert(message);
				if(!message){
					alert("Error al actualizar");
				}else{
					this.marker = this.newMarker;
				}
			});
		}
		
	}
}
class Marker {
	constructor(
		public id_marcador:string,
		public keym:string,
		public id_caracteristica:string,
		public id_usuario:string,
		public latitud: string,
		public longitud: string,
		public id_categoria:string,
		public url:string
		){}
}
class Caracteristica{
	constructor(	
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		) {  }
}