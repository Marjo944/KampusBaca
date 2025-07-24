import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage {
  nim = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.api.register({ nim: this.nim, password: this.password }).subscribe((res: any) => {
      if (res.success) {
        alert("Registrasi berhasil");
        this.router.navigateByUrl('/login');
      } else {
        alert(res.message);
      }
    });
  }
}
