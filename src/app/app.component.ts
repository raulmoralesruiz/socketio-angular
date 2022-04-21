import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'socketio';

  constructor(private socketService: SocketioService) {}

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.socket.disconnect();
  }

  emit(eventName: string, msg: string) {
    this.socketService.emit(eventName, msg);
  }

  on(eventName: string, callback: (data: any) => void) {
    this.socketService.on(eventName, callback);
  }

  disconnect() {
    this.socketService.disconnect();
  }

  connect() {
    this.socketService.connect();
  }
}
