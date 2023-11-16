import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario:string = '';
  contrasena:string = '';
  nombre:string ='';
  apellido:string='';
  rut:string ='';

  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;

  disabledComuna:boolean = true;

  constructor(private auth:AngularFireAuth,
              private helper:HelperService,
              private router:Router,
              private storage:StorageService,
              private locationService:LocationService         
    ) { }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
    
    console.log("REGIONES",this.regiones);
  }

  async cargarComuna(){
    try {
      const req = await this.locationService.getComuna(this.regionSel);
      this.comunas = req.data;
      this.disabledComuna = false;
    } catch (error:any) {
      await this.helper.showAlert(error.error.msg,"Error");
    }
  }


  
  async registro() {
    const loader = await this.helper.showLoader("Cargando");

    //valida que el nombre de usuario no sea vacio
    if (this.usuario === '') {
      await loader.dismiss();
      await this.helper.showAlert("Rellene el campo Correo", "Error");
      return;
    }

    // Validar que el correo electrónico termine en "@gmail.com"
    const gmailRegex = /@gmail\.com$/;
    if (!gmailRegex.test(this.usuario)) {
      await loader.dismiss();
      await this.helper.showAlert("El correo debe ser de dominio @gmail.com", "Error");
      return;
    }

    //valida que el apartado contraseña no este vacio
    if (this.contrasena === '') {
      await loader.dismiss();
      await this.helper.showAlert("Rellene el campo Contraseña", "Error");
      return;
    }

    // valida que la contraseña tiene que ser mayor a 6 caracteres
    if (this.contrasena.length < 6) {
      await loader.dismiss();
      await this.helper.showAlert("La contraseña es demasiado corta (debe ser al menos 6 caracteres).", "Error");
      return;
    }

    //valida que el apartado nombre no este vacio
    if (this.nombre === '') {
      await loader.dismiss();
      await this.helper.showAlert("Rellene el campo Nombre", "Error");
      return;
    }

    //valida que el apartado apellido no este vacio
    if (this.apellido === '') {
      await loader.dismiss();
      await this.helper.showAlert("Rellene el campo Apellido", "Error");
      return;
    }

    //valida que el apartado rut no este vacio
    if (this.rut === '') {
      await loader.dismiss();
      await this.helper.showAlert("Rellene el campo rut", "Error");
      return;
    }
    
    // Validar que el RUT contenga solo números y tenga una longitud de 9 caracteres
    if (!/^\d{9}$/.test(this.rut)) {
      await loader.dismiss();
      await this.helper.showAlert("Rut incorrecto (debe contener solo números y tener 9 caracteres).", "Error");
      return;
    }
    
        // Verificar que se haya seleccionado una región
    if (!this.regionSel) {
      await loader.dismiss();
      await this.helper.showAlert("Debe seleccionar una región", "Error");
      return;
    }

    // Verificar que se haya seleccionado una comuna
    if (!this.comunaSel) {
      await loader.dismiss();
      await this.helper.showAlert("Debe seleccionar una región", "Error");
      return;
    }

    
  
    
  
    var user = [
      {
        correo: this.usuario,
        contrasena: this.contrasena,
        nombre: this.nombre,
        apellido: this.apellido,
        rut: this.rut,
        regionSel: this.regionSel,
        comunaSel: this.comunaSel,
      }
    ];
  
    try {
      const request = await this.auth.createUserWithEmailAndPassword(this.usuario, this.contrasena);
      this.storage.guardarUsuario(user);
      await this.router.navigateByUrl('login');
      await loader.dismiss();
      await this.helper.showAlert("Usuario registrado correctamente", "Información");
    } catch (error: any) {
      if (error.code == 'auth/email-already-in-use') {
        await loader.dismiss();
        await this.helper.showAlert("El correo ya se encuentra registrado.", "Error");
      }
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es válido.", "Error");
      }
      if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert("La contraseña es demasiado débil (debe ser al menos 6 caracteres).", "Error");
      }
    }
  }
  
  

}
