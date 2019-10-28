import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private router: Router, private credentials: UserService) { }

  ngOnInit() {
    this.credentials.login().subscribe(
      () => console.log('Cache login'),
      error => this.router.navigate(['/'])
    );
  }

  logout() {
    this.router.navigate(['/']);
    this.credentials.logout();
  }
}
