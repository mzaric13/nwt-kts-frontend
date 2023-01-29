import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-forgotten-password',
  templateUrl: './page-forgotten-password.component.html',
  styleUrls: ['./page-forgotten-password.component.css']
})
export class PageForgottenPasswordComponent implements OnInit {

  forgottenPasswordForm = this.formBuilder.group({
    email: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  forgottenPasswordSubmit() {
    this.userService.checkIfUserExist(this.forgottenPasswordForm.value.email as string).subscribe(result => {
      if (result.exist === true) {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          position: 'center',
          title: result.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
      this.router.navigate(['/login']);
    })
  }

}
