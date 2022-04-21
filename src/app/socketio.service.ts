import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: any;

  constructor() {}

  // Método que establece la conexión con el servidor
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    // enviar mensaje al servidor cuando se conecte el cliente
    this.socket.emit('my message', 'Hola desde Angular.');

    // escuchar mensaje del servidor
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });

    // escuchar mensaje del servidor. función predeterminada
    this.socket.on('message', (data: any) => {
      console.log(data);
    });
  }

  // Método para cerrar la conexión con el servidor
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Método para abrir la conexión con el servidor
  connect() {
    if (this.socket) {
      this.socket.connect();
    }
  }

  // Método para enviar información al servidor
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
    console.log(data);
  }

  // Método para escuchar información del servidor
  on(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }
}
