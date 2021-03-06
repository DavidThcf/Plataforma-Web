import { Component, ViewChild}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } 			from '@angular/forms';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';


@Component({
	selector: 'registro-proyecto',
	templateUrl: './registro_proyecto.component.html',
	styleUrls: [ './registro_proyecto.component.css' ]
})

export class RegistroProyecto{
	
	proyecto = new Proyecto('','');
	imagenName:string = "Subir Imagen";
	files:any;

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };
	
	
	onSubmitPro() {	
		var formData = new FormData();
		this.proyecto.id_usuario = this.serviciog.usuario.id_usuario + '';
		//formData.append('id_usuario',JSON.stringify (this.serviciog.usuario.id_usuario));
		formData.append('proyecto',JSON.stringify(this.proyecto));		

		if(this.files){
			formData.append('file', this.files);
		}		

		this.servicios.createProject(formData)
		.then(message => { 
			if(message){
				this.serviciog.isAlertShow = true;
				this.serviciog.alertMessage = "Proyecto creado correctamente";
				this.serviciog.alertM = "Exito";
				var audio = new Audio();
				audio.src = "../assets/audios/alerta.mp3";
				audio.load();
				audio.play();
				setTimeout(() => {
					this.serviciog.isAlertShow = false;
				}, 8000);
				this.serviciog.showModalRegistroProyecto = false;
				this.servicios.getProyecto(this.serviciog.usuario.id_usuario + '')
				.then(cadena => {
					this.serviciog.proyecto = cadena
				});
			}else{
				this.serviciog.showModalRegistroProyecto = false;
				this.serviciog.isAlertShow = true;
				this.serviciog.alertMessage = "El proyecto no pudo ser creado";
				this.serviciog.alertM = "Error";
				var audio = new Audio();
				audio.src = "../assets/audios/alerta.mp3";
				audio.load();
				audio.play();
				setTimeout(() => {
					this.serviciog.isAlertShow = false;
				}, 8000);

			}
		} );
	}


	imageChange(event){		
		this.imagenName = event.target.files[0].name || event.srcElement.files[0].name;
		this.files = event.target.files[0] || event.srcElement.files[0];
	}
	
	projectForm: NgForm;

	@ViewChild('projectForm') currentForm: NgForm;

	ngAfterViewChecked() {
		this.formChanged();
	}

	formChanged() {
		if (this.currentForm === this.projectForm) { return; }
		this.projectForm = this.currentForm;
		if (this.projectForm) {
			this.projectForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		}
	}

	onValueChanged(data?: any) {
		if (!this.projectForm) { return; }
		const form = this.projectForm.form;
		
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
		'nombre': '',
		'descripcion': '',
		'fecha_ini': '',
		'fecha_fin': ''
	};

	validationMessages = {
		'nombre': {
			'required': 'Nombre proyecto obligatorio'	
		},
		'descripcion': {
			'required': 'Descripcion Obligatorio'		
		},
		'fecha_ini': {
			'required': 'Fecha de Inicio Obligatorio'
		},
		'fecha_fin': {
			'required': 'Password Obligatorio'
		}
	};	
}

class Proyecto{
	constructor(
		public id_usuario:string,
		public nombre:string,
		) {  }
}
