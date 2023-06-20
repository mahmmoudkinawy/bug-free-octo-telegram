import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserResult } from 'src/app/models/user-response';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserResult[] = [];

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.loadUsers().subscribe((users) => {
      this.users = users;
    });
  }
  
  onDeleteUser(user: UserResult) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(user._id).subscribe(
        (data) => {
          this.toastr.success('Deleted the user successfully');
          this.loadUsers();
        },
        (error) => {
          this.toastr.success('Deleted the user successfully');
          this.loadUsers();
          console.log(error);
        }
      );
    }
  }
}
