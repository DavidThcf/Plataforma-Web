import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../model/usuario';
import { Servicios } from '../services/servicios';
import { ServiciosGlobales } from '../services/servicios-globales'


@Component({
	selector: 'modal-register',
	templateUrl: './modal-register.html',
	styleUrls: ['./modal-register.component.css']
})


export class ModalRegister {

	constructor(
		private servicios: Servicios,
		private serviciog: ServiciosGlobales,
		private router: Router
	) { };


	usuario = new Usuario(null, '', '', '', '', '', '', '', '', '', '');
	imagenName: string = "Imagen de Perfil";
	submit: boolean = false;
	files: any;

	onSubmit() {
		
		var formData = new FormData();
		formData.append('usuario', JSON.stringify(this.usuario));
		if (this.files) {
			formData.append('file', this.files);
		}
		this.servicios.createUser(formData)
			.then(message => {
				this.serviciog.showModalRegistro = !this.serviciog.showModalRegistro;
				alert("" + message);
			});
	}


	imageChange(event) {
		this.usuario.imagenName = event.target.files[0].name || event.srcElement.files[0].name;
		this.files = event.target.files[0] || event.srcElement.files[0];
	}

	loginForm: NgForm;

	@ViewChild('loginForm') currentForm: NgForm;

	ngAfterViewChecked() {
		this.formChanged();
	}

	formChanged() {
		if (this.currentForm === this.loginForm) { return; }
		this.loginForm = this.currentForm;
		if (this.loginForm) {
			this.loginForm.valueChanges
				.subscribe(data => this.onValueChanged(data));
		}
	}

	onValueChanged(data?: any) {

		if (!this.loginForm) { return; }
		const form = this.loginForm.form;

		for (const field in this.formErrors) {


			console.log(field)
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);

			
				
			if (field == "email") {
				console.log(control)
				if (control){
					console.log(control.value);
					var trigger = control.value,
					regexp = new RegExp(' /*@*/'),
					test = regexp.test(trigger);
					console.log(test + "");
				}
				// 
				// 	
				// 	
				// alert(test + "");

			}

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
		'telefono': '',
		'email': '',
		'password': ''
	};

	validationMessages = {
		'telefono': {
			'required': 'Telefono obligatorio - debe contener solo caracteres numericos'
		},
		'email': {
			'required': 'Email Obligatorio'
		},
		'password': {
			'required': 'Password Obligatorio'
		}
	};
}
