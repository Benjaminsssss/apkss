import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  usuario:any;
  usuarioFiltro:any;
  constructor(
              private storage:StorageService,
              private auth:AngularFireAuth
              ) { }

  ngOnInit() {
    this.cargarUsuario();
  }


  async cargarUsuario(){
    this.usuario = await this.storage.obtenerUsuarios();
    console.log("USUARIOS REGISTRADOS",this.usuario);
    var emailUserToken = await this.auth.currentUser;
    this.usuarioFiltro = this.usuario.filter((e: { correo: string; }) => e.correo == emailUserToken?.email);
    console.log("USUARIO FILTRADOS", this.usuarioFiltro);
    

    
  }

}
