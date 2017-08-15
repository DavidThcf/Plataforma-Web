import { Component, ViewChild}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { Router }            from '@angular/router';
import { NgForm } 			from '@angular/forms';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';


@Component({
	selector: 'registro-actividad',
	templateUrl: './registro_actividad.component.html',
	styleUrls: [ './registro_actividad.component.css' ]
})

export class RegistroActividad{
	
	actividad = new actividad('','');
	files:any;

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };
	
	
	onSubmitPro(activityForm:NgForm) {	
		var formData = new FormData();
		this.actividad.id_usuario = this.serviciog.usuario.id_usuario + '';
		//formData.append('id_usuario',JSON.stringify (this.serviciog.usuario.id_usuario));
		formData.append('actividad',JSON.stringify (this.actividad));		

		if(this.files){
			formData.append('file', this.files);
		}		
		this.servicios.createProject(formData)
		.then(message => { 
			alert("" + message);
		 } );
	}

	
	activityForm: NgForm;

	@ViewChild('activityForm') currentForm: NgForm;

	ngAfterViewChecked() {
		this.formChanged();
	}

	formChanged() {
		if (this.currentForm === this.activityForm) { return; }
		this.activityForm = this.currentForm;
		if (this.activityForm) {
			this.activityForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		}
	}

	onValueChanged(data?: any) {
		if (!this.activityForm) { return; }
		const form = this.activityForm.form;
		
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
			'required': 'Nombre actividad obligatorio'	
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

class actividad{
	constructor(
		public id_usuario:string,
		public nombre:string,
		) {  }
}