import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupervisorToCreate } from 'src/app/models/supervisor';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-supervisor',
  templateUrl: './create-supervisor.component.html',
  styleUrls: ['./create-supervisor.component.css'],
})
export class CreateSupervisorComponent {
  supervisor: SupervisorToCreate = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    userImg: null,
  };

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onFileSelected($event: any) {
    const file: File = $event.target.files[0];
    this.supervisor.userImg = file;
    // Reset the file input element
    const fileInput: HTMLInputElement = $event.target;
    fileInput.value = '';
  }

  onSubmit() {
    this.usersService
      .createSupervisor(this.supervisor, this.supervisor.userImg!)
      .subscribe(
        (data) => {
          this.toastr.success('Supervisor user added.');
          this.router.navigateByUrl('/users');
        },
        (error) => {
          this.toastr.error(error.error.msg);
          // this.toastr.success('Supervisor user added.');
          // this.router.navigateByUrl('/users');
        }
      );
  }
}
