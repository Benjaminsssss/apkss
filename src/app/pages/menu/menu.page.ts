import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonCard, MenuController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { Menu } from 'src/app/models/menu';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;

  private animation!: Animation;


  menuArray:Menu[]=[];

  loading:boolean= true;

  constructor(
            private router:Router, 
            private animationCtrl: AnimationController,
            private helper:HelperService,
            private storage:StorageService,
            private menuCtrl:MenuController,
            private auth:AngularFireAuth
    ) { }

  ngOnInit() {
    this.cargarMenu();
   
    
    console.error("Mi primer erorr en TS");
    console.warn("Mi primera advertencia en TS");
    setTimeout(()=> {this.loading = false},3000);
    this.cargaUsaurios();
    
  }

  async mostrarModal() {
    const loader = await this.helper.showLoader("Cargando");
    
    await loader.dismiss();
    this.helper.showAlert("Se le llevara al apartado scaner, para que pueda escanear la clase con un qr" ,"Ayuda");
  }


  perfilUsuario(){
    
    this.router.navigateByUrl("perfil-usuario");
  }

  ionViewDidLeave(){
    this.menuCtrl.close();
  }

  menu(){
    this.menuCtrl.toggle();
  }

  closeMenu(){
    this.menuCtrl.close();
  }


  async cargaUsaurios(){
    console.log("USUARIOS", await this.storage.obtenerUsuarios());
  }
  

//aqui se cargara el menu
  cargarMenu(){
    this.menuArray.push(
      {
        id:1,
        icono:"game-controller-outline",
        nombre:"Menú uno",
        url:"/123/menu-uno",
        disabled:true
      },
      {
        id:2,
        icono:"heart-half-outline",
        nombre:"Menú dos",
        url:"/menu-dos"
      }
    )
  }
  

  

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll("ion-card"))
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }


  play(){
    this.animation.play();
  }

  pause(){
    this.animation.pause();
  }

  stop(){
    this.animation.stop();
  }


  menuUno(){
    var parametroIdEmpleado = "123456789";
    this.router.navigateByUrl(parametroIdEmpleado + "/menu-uno");
  }

  menuTres(){
    var parametroIdAsignatura = "PGY4121";
    this.router.navigateByUrl(parametroIdAsignatura + "/menu-tres");
  }

  menuCuatro(){
    var nota = 55;
    this.router.navigateByUrl("menu-cuatro/" + nota);
  }

  async logout(){
    
    var confirm = await this.helper.showConfirm("Desea cerrar la sesión actual?","Confirmar","Cancelar");
    if(confirm == true ) {
      await this.auth.signOut();
      this.router.navigateByUrl("login");
    }
  }


}
