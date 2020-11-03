import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IMeData } from '../../Interfaces/session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  session: IMeData = {
    status: false,
  };
  access = false;
  role: string;

  constructor(private auth: AuthService) {
    this.auth.accessVar$.subscribe( (result) => {
      //console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user.role;
    });
   }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.resetSession();
  }

}
