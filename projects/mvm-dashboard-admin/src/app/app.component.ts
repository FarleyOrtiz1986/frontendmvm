import { Component, OnInit, inject } from '@angular/core';
import { RoutesGuardsService } from 'projects/fy-guards/src/routes-guards.service';
import { ConnectionService } from 'projects/fy-lib-comp/src/services/connection.service';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { environment } from './environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = environment.titleApp;
  routeLogin = environment.routeLogin;
  routeNotLogin = environment.routeNotLogin;

  toastNotSvc = inject(ToastNotificationService);
  connectSvc = inject(ConnectionService);
  spinnerBgSvc = inject(SpinnerBgService);
  routeGuardSvc = inject(RoutesGuardsService);

  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) {
    this.routeGuardSvc.setRouteLogin(this.routeLogin);
    this.routeGuardSvc.setRouteLogin(this.routeNotLogin);
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }

  ngAfterViewInit() {
    this.translateChange('es')
  }

  translateChange(lang: string) {
    this.translateService.use(lang)
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res))
  }


}
