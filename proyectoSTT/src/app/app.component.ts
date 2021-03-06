import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from './model/usuario';
import { Modallogin } from './modulo_login/modal-login.component'
import { ServiciosGlobales } from './services/servicios-globales';
import { Servicios } from './services/servicios';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	closeResult: string;
	maxAlertas: number = 4;
	//isAlertShow: boolean = false;
	heightAlert: number = 200;
	e_mail: string;

	constructor(private serviciog: ServiciosGlobales,
		private persistenceService: PersistenceService,
		private router: Router,
		private servicios: Servicios) { }

	ngOnInit() {
		this.serviciog.usuario = this.persistenceService.get('user', StorageType.SESSION);
		if (this.serviciog.usuario) {
			var formData = new FormData();
			formData.append('id_usuario', this.serviciog.usuario.id_usuario + "");
			this.servicios.newAlert(formData)
				.then(data => {
					if (data) {
						this.serviciog.isAlertShow = true;
						this.serviciog.alertMessage = "Nuevas alertas";
						this.serviciog.alertM = "Alerta!!!";
						var audio = new Audio();
						audio.src = "../assets/audios/alerta.mp3";
						audio.load();
						audio.play();
						setTimeout(() => {
							this.serviciog.isAlertShow = false;
						}, 8000);
						this.serviciog.alert = data;
						this.serviciog.alertCont = 0;
						for (var i = 0; i < data.length; i++) {
							if (!data[i].visto) {
								this.serviciog.alertCont = this.serviciog.alertCont + 1;
							}
						}

					}
					//alert(JSON.stringify(data));
				});
		}

		this.serviciog.socket.on('alerta', (data) => {
			//alert(JSON.stringify(data))
			this.serviciog.isAlertShow = true;
			var audio = new Audio();
			audio.src = "../assets/audios/alerta.mp3";
			audio.load();
			audio.play();
			setTimeout(() => {
				this.serviciog.isAlertShow = false;
			}, 8000);
			this.serviciog.alert = data;
			this.serviciog.alertCont = 0;
			for (var i = 0; i < data.length; i++) {
				if (!data[i].visto) {
					this.serviciog.alertCont = this.serviciog.alertCont + 1;
				}
			}
		});

	}

	moreAlerts() {
		if (this.serviciog.alertCont > this.maxAlertas) {
			this.maxAlertas = this.maxAlertas + 4;
		}

	}

	deleteAlert(alerta, pos) {
		var formData = new FormData();
		formData.append("alerta", JSON.stringify(alerta));
		this.servicios.deleteAlert(formData)
			.then((message) => {
				if (message) {
					this.serviciog.alert.splice(pos, 1);
					this.serviciog.alertCont = this.serviciog.alertCont - 1;
				}
			});
	}

	changeVisble(alerta) {
		var visto = !alerta.visto;
		var formData = new FormData();
		formData.append('alerta', alerta.id_alerta);
		formData.append('visto', visto + "");
		this.servicios.changeVistoAlert(formData)
			.then(message => {
				if (message) {
					alerta.visto = visto;
					if (alerta.visto) {
						this.serviciog.alertCont = this.serviciog.alertCont - 1;
					} else {
						this.serviciog.alertCont = this.serviciog.alertCont + 1;
					}
				}
			});
	}

	goToMap(alerta) {
		this.serviciog.marcadorAlerta = alerta;
		let link = ['mapa2'];
		this.router.navigate(link);
	}



	logout() {
		this.serviciog.alert = null;
		this.serviciog.alertCont = 0;
		this.persistenceService.remove('user', StorageType.SESSION);
		this.serviciog.usuario = this.persistenceService.get('user', StorageType.SESSION);
		let link = [''];
		this.router.navigate(link);
	}
	/*-----------       RECUPERAR CONTRASEÑA     -----*/
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



	onSubmitRestart() {
		var formData = new FormData();
		formData.append("email", this.e_mail);
		
		this.servicios.restartPassword(formData).
		then(message =>{
			alert(message);
		});
	}
	/*-----------   FIN  RECUPERAR CONTRASEÑA     -----*/

}
