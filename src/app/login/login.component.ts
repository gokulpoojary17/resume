import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}
  

  onSubmit() {
    const reversedUserId = this.userId.split('').reverse().join('');
    if (this.userId === 'admin') {
      localStorage.setItem('userId', this.userId);
      this.router.navigate(['/admin']);
      return;


    }
    

  if (this.password === reversedUserId) {
    localStorage.setItem('userId', this.userId);
    this.router.navigate(['/user']);
  } else {
    alert('Invalid User ID or Password');
  }
    if (this.password !== reversedUserId) {
      alert('Invalid password');
      return;
    }
    this.http.get<any[]>(`http://localhost:3000/users?userId=${this.userId}`)
    .subscribe(users => {
      if (users.length === 0) {
        // User doesn't exist, so create a new one
        const newUser = { userId: this.userId, password: this.password };
        this.http.post('http://localhost:3000/users', newUser)
          .subscribe(() => {
            // Store the userId in localStorage and navigate to the resume form
            localStorage.setItem('userId', this.userId);
            this.router.navigate(['/user']);
          });
      } else {
        // User exists, proceed to the resume form
        localStorage.setItem('userId', this.userId);
        this.router.navigate(['/user']);
      }
    });

   
  }
}

