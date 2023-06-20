import { take } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appSupervisorHasRole]',
})
export class SupervisorHasRoleDirective implements OnInit {
  @Input() appHasRole: number = 3000;
  user: User | undefined = JSON.parse(localStorage.getItem('user') as any);

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      if (user === undefined) {
        user = JSON.parse(localStorage.getItem('user') as any);
      }
    });
  }

  ngOnInit(): void {
    if (this.appHasRole === 3000) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }

    // clear view if no roles
    if (!this.user?.user?.role || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }
  }
}
