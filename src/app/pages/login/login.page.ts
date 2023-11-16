import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string = "";
  contrasena:string = "";

  showPassword: boolean = false;
  constructor(
              private router:Router,
              private helper:HelperService,
              private auth:AngularFireAuth,
              private storage:StorageService
              ) { }

  ngOnInit() {
    console.log("El resultado de la suma es: ",this.helper.sumar(12,1));
    this.helper.showToast("Bienvenidos");
  }
  async onLogin() {
    const loader = await this.helper.showLoader("Cargando");
  
    if (this.usuario == "") {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar un usuario", "Error");
      return;
    }
  
    // Validar que el correo electrónico termine en "@gmail.com"
    const gmailRegex = /@gmail\.com$/;
    if (!gmailRegex.test(this.usuario)) {
      await loader.dismiss();
      await this.helper.showAlert("El correo debe ser de dominio @gmail.com", "Error");
      return;
    }
  
    if (this.contrasena == "") {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar una contraseña", "Error");
      return;
    }
    //hola
    try {
      const req = await this.auth.signInWithEmailAndPassword(this.usuario, this.contrasena);
  
      if (req.user) {
        console.log("TOKEN", await req.user.getIdToken());
  
        this.storage.correoUsuario = this.usuario;
        await loader.dismiss();
        await this.router.navigateByUrl('menu');
      } else {
        await loader.dismiss();
        this.helper.showAlert("Contraseña incorrecta", "Error");
      }
    } catch (error: any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.", "Error");
      }
      else if (error.code == 'auth/wrong-password') {
        await loader.dismiss();
        await this.helper.showAlert("Contraseña incorrecta", "Error");
      }
      else if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert("El largo de la contraseña es muy corto.", "Error");
      } else {
        await loader.dismiss();
        console.error(error);
        await this.helper.showAlert("Contraseña incorrecta", "Error");
      }
    }
  }
  

  
  veronover() {
    this.showPassword = !this.showPassword;
  }


}
