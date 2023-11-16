import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  correo: string = '';
  isCaptchaValid = false;

  constructor(
    private router: Router,
    private helper: HelperService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
  }
  //sip
  get sitekey() {
    return environment.recaptcha.sitekey;
  }

  async mostrarModal() {
    const loader = await this.helper.showLoader("Cargando");

    await loader.dismiss();
    this.helper.showAlert("Se le mandará un email al correo para cambiar la contraseña", "Ayuda");
  }

  async resetPassword() {
    const loader = await this.helper.showLoader("Cargando");
    if (this.correo == '' || !this.isCaptchaValid) {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar un correo y resolver el reCAPTCHA.", "Error");
      return;
    }
    try {
      await this.auth.sendPasswordResetEmail(this.correo);
      await this.helper.showAlert("Debe revisar su correo", "Información");
      await loader.dismiss();
      await this.router.navigateByUrl("login");
    } catch (error: any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es correcto.", "Error");
      }
    }
  }

  captchaResolved(event: any) {
    this.isCaptchaValid = event;
  }

 //benjamin
}
