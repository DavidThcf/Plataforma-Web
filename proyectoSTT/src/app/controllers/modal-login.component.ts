import { Component , ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router }            from '@angular/router';

import { Usuario } from '../model/usuario';
import { Servicios }         from '../services/servicios';
import { ServiciosGlobales } from '../services/servicios-globales'


@Component({
	selector: 'modal-login',
	templateUrl: '../views/modal-login.html',
	styleUrls: [ '../src/css/modal-login.component.css' ]
})


export class Modallogin {

	constructor(
		private servicios: Servicios,
		private serviciog:ServiciosGlobales,
		private router:Router	  
		) {};


	usuario = new Usuario(null,'','','','');	

	cadena:string;
	hideModal: boolean = false;

	
	submitted = false;

	onSubmit() {

		this.submitted = true;

		this.servicios.getUsuario(this.usuario.e_mail,this.usuario.pass)
		.then( 
			cadena =>
			{
				this.serviciog.usuario = cadena;


				let link = ['proyecto'];
				this.router.navigate(link);
			});		
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
		'email': '',
		'password': ''
	};

	validationMessages = {
		'email': {
			'required': 'Email Obligatorio'		
		},
		'password': {
			'required': 'Password Obligatorio'
		}
	};	
}
