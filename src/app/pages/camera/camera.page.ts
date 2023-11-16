import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  
  selfieImage: string ='';

  
  latitude: number=0;
  longitude: number=0;

  usuario:any;
  usuarioFiltro:any;

  scannedData: string = '';
  

  constructor(private navCtrl: NavController,private router: Router,private storage:StorageService,private route: ActivatedRoute ,
    private auth:AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.cargarUsuario();
    this.route.paramMap.subscribe(params => {
      const rawData = params.get('data');
      if (rawData) {
        this.scannedData = JSON.parse(decodeURIComponent(rawData));
      } else {
        console.error('No se encontraron datos en la URL.');
      }
    });
   
  



  }

  async tomarSelfie() {
    const result = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
  
    if (result && result.dataUrl) {
      // Guarda la imagen capturada en la variable selfieImage
      this.selfieImage = result.dataUrl;
  
    }
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
  }

  async cargarUsuario() {
    this.usuario = await this.storage.obtenerUsuarios();
    console.log("USUARIOS REGISTRADOS", this.usuario);

    var user = await this.auth.currentUser;

    if (user) {
        var emailUserToken = user.email;
        this.usuarioFiltro = this.usuario.filter((e: { correo: string | null; }) => e.correo === emailUserToken);

        if (this.usuarioFiltro.length > 0) {
            const { nombre, apellido, rut, regionSel,comunaSel} = this.usuarioFiltro[0];
            console.log("Nombre:", nombre);
            console.log("Apellido:", apellido);
            console.log("RUT:", rut);
        } else {
            console.log("Usuario no encontrado.");
        }
    } else {
        console.log("Usuario no autenticado.");
    }
}








}
