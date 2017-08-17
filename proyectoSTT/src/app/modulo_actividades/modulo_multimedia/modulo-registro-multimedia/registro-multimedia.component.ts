import { Component, ViewChild}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } 			from '@angular/forms';
import { ServiciosGlobales } from '../../../services/servicios-globales';
import { Servicios }         from '../../../services/servicios';


@Component({
	selector: 'registro-multimedia',
	templateUrl: './registro-multimedia.component.html',
	styleUrls: [ './registro-multimedia.component.css' ]
})

export class RegistroMultimedia{
	
	archivo = new Archivo('','','','','img');
	files:any;
	imagenName:string = "Cargar Archivo";
	imagenNameValid:string;	

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };
	
	
	onSubmitPro(multimediaForm:NgForm) {	
		var formData = new FormData();
		this.archivo.keym = this.serviciog.actividad.keym;
		this.archivo.id_usuario = this.serviciog.actividad.id_usuario;
		this.archivo.id_caracteristica = this.serviciog.actividad.id_caracteristica;

		this.archivo.id_usuario_act = this.serviciog.usuario.id_usuario + '';
		
		//formData.append('id_usuario',JSON.stringify (this.serviciog.usuario.id_usuario));
		formData.append('archivo',JSON.stringify (this.archivo));		

		if(this.files){
			formData.append('file', this.files);
		}		
		this.servicios.createMultimedia(formData)
		.then(message => {			 
			alert("" + message);
		} );
	}
	imageChangeMult(event){
		this.imagenName = event.target.files[0].name || event.srcElement.files[0].name;
		this.imagenNameValid = this.imagenName;
		this.files = event.target.files[0] || event.srcElement.files[0];
	}
	
	multimediaForm: NgForm;

	@ViewChild('multimediaForm') currentForm: NgForm;

	ngAfterViewChecked() {
		this.formChanged();
	}

	formChanged() {
		if (this.currentForm === this.multimediaForm) { return; }
		this.multimediaForm = this.currentForm;
		if (this.multimediaForm) {
			this.multimediaForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		}
	}

	onValueChanged(data?: any) {
		if (!this.multimediaForm) { return; }
		const form = this.multimediaForm.form;
		
		for (const field in this.formErrors) {

			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);

			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	formErrors = {
		'titulo': '',
		'subtitulo': '',
		'imagen': '',		
	};

	validationMessages = {
		'titulo': {
			'required': 'Nombre actividad obligatorio'	
		},
		'subtitulo': {
			'required': 'Descripcion Obligatorio'		
		},
		'imagen': {
			'required': 'Debe descargar un Imagen'		
		}
	};	
}

class Archivo{
	constructor(
		public keym:string,
		public id_usuario:string,
		public id_caracteristica:string,
		public id_usuario_act:string,
		public tipo:string,

		) {  }
}