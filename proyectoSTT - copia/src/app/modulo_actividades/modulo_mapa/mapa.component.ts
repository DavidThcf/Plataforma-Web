import { Component, ElementRef, NgZone, OnInit}  from '@angular/core';

import { NgModule, ViewChild } 		 from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

import { } from 'googlemaps';

@Component({
	selector: 'mapa',
	templateUrl: './mapa.component.html',
	styleUrls: [ './mapa.component.css' ]
})

export class Mapa implements OnInit{
	public searchControl: FormControl;
	icon_marker = "";
	lat: number = 1.2144293922395473;
	lng: number = -77.27847844362259;
	zoom: number = 16; 
	categorias:any;
	categoria:any;
	http:string = this.serviciog.servidor + "Category/";
	ext:string = ".svg"	
	caracteristica: Caracteristica = new Caracteristica('','','');
	id_categoria:string;

	markers:Marker[] = [];
	mark:any;


	@ViewChild("search")
	public searchElementRef: ElementRef;
	
	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone	  
		){ };

	ngOnInit():void {
		this.searchControl = new FormControl();
		this.buscarLugar();

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
			if(marcador){
				this.id_categoria = marcador[0].id_categoria;
				this.markers= marcador;
			}
		});		
	}

	btnCat(category){		
		this.categoria = category;		
	}	
	
	mapClicked($event: any){		
		if(!this.mark){
			var marker:any = {				
				keym:this.serviciog.actividad.keym,
				id_caracteristica:this.serviciog.actividad.id_caracteristica,
				id_usuario:this.serviciog.actividad.id_usuario,
				latitud: $event.coords.lat,
				longitud: $event.coords.lng,
				id_categoria:this.categoria.id_categoria,
				url:this.http + this.categoria.id_categoria + '.svg'
			};
			
			var formData = new FormData();
			formData.append('marcador',JSON.stringify(marker));
			this.servicios.regPointMap(formData).
			then(message => {
				if(!message){
					alert("Error al Registrar");
				}else{
					this.markers.push(marker);
					//alert(JSON.stringify(this.markers))
				}
			});
		}else{
			var marker:any = {
				id_marcador:  this.id_categoria,
				keym:this.serviciog.actividad.keym,
				id_caracteristica:this.serviciog.actividad.id_caracteristica,
				id_usuario:this.serviciog.actividad.id_usuario,
				latitud: $event.coords.lat,
				longitud: $event.coords.lng,
				id_categoria:this.categoria.id_categoria
			};
			this.markers.push(marker);
			this.lat= $event.coords.lat;
			this.lng = $event.coords.lng;

			
		}
	}

	buscarLugar(){
		//this.setCurrentPosition();		
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				
			});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}
					var marker:any = {
						id_marcador:  this.id_categoria,
						keym:this.serviciog.actividad.keym,
						id_caracteristica:this.serviciog.actividad.id_caracteristica,
						id_usuario:this.serviciog.actividad.id_usuario,
						latitud: place.geometry.location.lat(),
						longitud: place.geometry.location.lng(),
						id_categoria:this.categoria.id_categoria
					};

					this.markers.push(marker);
					this.lat = place.geometry.location.lat();
					this.lng = place.geometry.location.lng();	
					
				});
			});
		});
	}

	setCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				var marker:any = {
					id_marcador:  this.id_categoria,
					keym:this.serviciog.actividad.keym,
					id_caracteristica:this.serviciog.actividad.id_caracteristica,
					id_usuario:this.serviciog.actividad.id_usuario,
					latitud: position.coords.latitude,
					longitud: position.coords.longitude,
					id_categoria:this.categoria.id_categoria
				};

				this.markers.push(marker);
				this.lat= position.coords.latitude;
				this.lng = position.coords.longitude;
			});
		}
	}

	guardarPunto(marker){
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


interface Marker{
	keym:string,
	id_caracteristica:string,
	id_usuario:string,
	latitud: number,
	longitud: number,
	id_categoria:string
}

class Caracteristica{
	constructor(	
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		) {  }
}