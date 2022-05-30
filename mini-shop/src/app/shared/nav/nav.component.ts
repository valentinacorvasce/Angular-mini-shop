import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  events$
  current!: string;

  constructor(private router: Router) {
    this.events$ = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.current = event.url;
            console.log(this.current)
          }
        }
      )
  }

  ngOnInit(): void {
  }

}
