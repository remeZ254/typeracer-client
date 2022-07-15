import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { get } from 'lodash';

@Injectable()
export class ConfigService {
  private readonly config$: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.config$ = new BehaviorSubject<any>({});
  }

  initConfiguration(): Observable<any> {
    const config = this.http.get(environment.configPath);
    config.subscribe(this.config$);
    return config;
  }

  get(...keys: string[]): any {
    return get(this.config$.getValue(), keys);
  }
}
