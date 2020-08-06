import { Injectable } from '@angular/core';
import { Stats } from '../models/stats.model';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './signalr.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private statsUrl = `${ environment.apiUrl }stats`;


  // Observable stats stream
  statsChanged$ = this.signalRService.statsChangedSource.asObservable();

  constructor(private http: HttpClient, private signalRService: SignalRService) { }

  getStats() : Observable<Stats>
  {
    return this.http.get<Stats>(this.statsUrl);
  }
}
