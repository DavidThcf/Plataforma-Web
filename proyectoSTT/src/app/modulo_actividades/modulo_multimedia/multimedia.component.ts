
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

@Component({
	selector: 'multimedia',
	templateUrl: './multimedia.component.html',
	styleUrls: [ './multimedia.component.css' ]
})

export class Multimedia implements OnInit{

	isMapSelected:boolean =false;
	imagenEditView: any[] = [];
	tipo:string = "img";

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {

		var formData = new FormData();
		//alert(JSON.stringify(this.serviciog.actividad));
		formData.append('keym',this.serviciog.actividad.keym);
		formData.append('id_caracteristica',this.serviciog.actividad.id_caracteristica);
		formData.append('id_usuario',this.serviciog.actividad.id_usuario);
		formData.append('tipo',this.tipo);

		this.servicios.getMultimedia(formData)
		.then(imagenes => {
			this.serviciog.imagenes = imagenes
			//alert(JSON.stringify(imagenes));
		});		
	}

	checked(imagen){
		var img = imagen;

		img.isViewMap = !img.isViewMap;	
		var sss = this.imagenEditView.findIndex(x => x === img);

		if(sss => 0){				
			this.imagenEditView.splice(sss,1)		
		}else{
			this.imagenEditView.push(img);
		}		

	}

	cambio($event){
		//alert("cambio " + JSON.stringify(this.tipo));
		var formData = new FormData();
		//alert(JSON.stringify(this.serviciog.actividad));
		formData.append('keym',this.serviciog.actividad.keym);
		formData.append('id_caracteristica',this.serviciog.actividad.id_caracteristica);
		formData.append('id_usuario',this.serviciog.actividad.id_usuario);
		formData.append('tipo',this.tipo);

		this.servicios.getMultimedia(formData)
		.then(imagenes => {
			this.serviciog.imagenes = imagenes
			//alert(JSON.stringify(imagenes));
		})
	}

	envioCambios(){
		this.isMapSelected = false;
		if(this.imagenEditView.length > 0){
			alert("Cambios Actualizados");
		}else{
			alert("No se realizaron Cambios");
		}		
	}

	btnAddImgMap(){
		this.isMapSelected = true;
	}

	
}



