import { Component , ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router }            from '@angular/router';

import { Usuario } from '../model/usuario';
import { Servicios }         from '../services/servicios';
import { ServiciosGlobales } from '../services/servicios-globales'


@Component({
	selector: 'modal-register',
	templateUrl: '../views/modal-register.html',
	styleUrls: [ '../src/css/modal-register.component.css' ]
})


export class ModalRegister {

	constructor(
		private servicios: Servicios,
		private serviciog:ServiciosGlobales,
		private router:Router	  
		) {};


	usuario = new Usuario(null,'','','','','','','','');	

	cadena:string;
	hideModal: boolean = false;
	imagenName:string = "Imagen de Perfil";
	

	onSubmit() {		
		this.hideModal = true;
		alert(JSON.stringify(this.usuario));
		this.servicios.createUser(this.usuario)
		.then( () => { alert("usuario registrado"); } );	
	}

	imageChange(event){		
		this.imagenName = event.target.files[0].name;	
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
