import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { get } from 'lodash';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  initConfiguration(): Observable<any> {
    return this.http.get(environment.configUrl).pipe(tap((config: any) => (this.config = config)));
  }

  get(...keys: string[]): any {
    return get(this.config, keys);
  }
}
