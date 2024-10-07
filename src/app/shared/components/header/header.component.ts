import {Component, OnDestroy} from '@angular/core';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons, IonChip,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map} from 'rxjs/operators';
import {Subject, takeUntil} from "rxjs";
import {addIcons} from "ionicons";
import {help, logOutOutline, settings} from "ionicons/icons";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    NgIf,
    IonMenu,
    IonMenuButton,
    IonList,
    IonLabel,
    IonItem,
    IonMenuToggle,
    IonAvatar,
    AsyncPipe,
    IonChip,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy{
  _unsubscribeAll: Subject<any> = new Subject<any>()
  showBackButton = false;
  title = 'Income & Expense';
  noBackButtonRoutes: string[] = ['/tabs/incomes/list', '/tabs/dashboard', '/tabs/expenses/list'];
  noHeader:string[] = ['/login']
  showHeader: boolean=true;

  constructor(protected router: Router, private route: ActivatedRoute,protected authService:AuthService) {
    addIcons({settings,logOutOutline,help})
    this.router.events
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.title || 'Income & Expense';
        })
      )
      .subscribe((pageTitle: string) => {
        this.title = pageTitle;
      });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.showBackButton = !this.noBackButtonRoutes.includes(currentRoute);
        this.showHeader = !this.noHeader.includes(currentRoute);
      }
    });
  }
  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete()
  }

  goToPage(s: string) {
    this.router.navigate([s]).then(() => {
    });
  }

  logout() {
    this.authService.logout()
  }
}
