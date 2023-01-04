import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.css']
})
export class PageResetPasswordComponent implements OnInit {

  email!: string;

  resetPasswordForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let param = params.get('email');
      if (param !== null) {
        this.email = param;
      }
    })
  }

  resetPasswordSubmit() {
    this.userService.resetPassword(this.resetPasswordForm.value.password as string, this.resetPasswordForm.value.confirmPassword as string, this.email).subscribe(result => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title: 'Your password is successfully reseted',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/login']);
    }, error => {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: error.message,
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

}
