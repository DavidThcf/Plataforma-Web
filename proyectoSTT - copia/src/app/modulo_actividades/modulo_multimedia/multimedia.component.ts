
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'multimedia',
	templateUrl: './multimedia.component.html',
	styleUrls: [ './multimedia.component.css' ]
})

export class Multimedia implements OnInit{

	isMapSelected:boolean =false;
	imagenEditView: any[] = [];
	archivoShow:any;
	urlShow:SafeResourceUrl;
	url:string;
	//current_url: SafeResourceUrl;
	//tipo:string = "img";

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios,
		public sanitizer:DomSanitizer	  
		){ };

	ngOnInit():void {

		var formData = new FormData();
		//alert(JSON.stringify(this.serviciog.actividad));
		formData.append('keym',this.serviciog.actividad.keym);
		formData.append('id_caracteristica',this.serviciog.actividad.id_caracteristica);
		formData.append('id_usuario',this.serviciog.actividad.id_usuario);
		formData.append('tipo',this.serviciog.tipo);

		this.servicios.getMultimedia(formData)
		.then(imagenes => {
			if(imagenes){
				this.serviciog.imagenes = imagenes
			}else{
				this.serviciog.imagenes = []
			}
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

	show(imagen){
		this.archivoShow = imagen;
		this.url = "http://docs.google.com/gview?url="+this.archivoShow.val_configuracion+this.archivoShow.srcServ+this.archivoShow.nombre_archivo+"&embedded=true";
		this.urlShow = this.sanitizer.bypassSecurityTrustResourceUrl(this.url); 		
	}

	cambio($event){
		this.serviciog.imagenes = [];
		//alert("cambio " + JSON.stringify(this.tipo));
		var formData = new FormData();
		//alert(JSON.stringify(this.serviciog.actividad));
		formData.append('keym',this.serviciog.actividad.keym);
		formData.append('id_caracteristica',this.serviciog.actividad.id_caracteristica);
		formData.append('id_usuario',this.serviciog.actividad.id_usuario);
		formData.append('tipo',this.serviciog.tipo);

		this.servicios.getMultimedia(formData)
		.then(imagenes => {
			if(imagenes){
				this.serviciog.imagenes = imagenes
			}else{
				this.serviciog.imagenes = []
			}
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



