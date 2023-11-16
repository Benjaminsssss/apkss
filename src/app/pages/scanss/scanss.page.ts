import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanss',
  templateUrl: './scanss.page.html',
  styleUrls: ['./scanss.page.scss'],
})
export class ScanssPage implements OnInit {

  codigoEscaneado: string = '';

  constructor(private navCtrl: NavController) {}
  ngOnInit() {
  }
  async escans() {
    const result = await BarcodeScanner.scan();
    if (result) {
      // Guarda los datos escaneados en una variable
      const datosEscaneados = result;
  
      // Navega a "Página Uno" y pasa los datos escaneados como parámetro de ruta
      this.navCtrl.navigateForward(`/camera/${JSON.stringify(datosEscaneados)}`);
    } else {
      this.codigoEscaneado = 'No se escaneó ningún código QR.';
    }
  }
  

  }