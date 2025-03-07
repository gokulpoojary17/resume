import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumeview',
  templateUrl: './resumeview.component.html',
  styleUrl: './resumeview.component.css'
})
export class ResumeviewComponent {
  resume: any = {
    firstName: '',
    lastName: '',
    dob: '',
    photoUrl: '',
    summary: '',
    qualifications: [],
    experiences: []
  };
  userId: string = '';

  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    const resumeId = this.route.snapshot.paramMap.get('id');

    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
      alert('User ID not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
    
    if (resumeId) {
      this.loadResumeById(resumeId);
      this.loadUserResume(); 
    } else {
      // alert('Resume ID not provided.');
      this.router.navigate(['/adminview']); // Or handle it as needed
    }
  }

  loadUserResume() {
    this.http.get<any[]>(`http://localhost:3000/resumes?userId=${this.userId}`)
      .subscribe((resumes) => {
        if (resumes.length > 0) {
          this.resume = resumes[0];
        } else {
          // alert('No resume found for this user.');
        }
      }, error => console.error('Error fetching resume:', error));
  }
  loadResumeById(resumeId: string) {
    this.http.get<any>(`http://localhost:3000/resumes/${resumeId}`)
      .subscribe((resume) => {
        this.resume = resume;
      }, error => console.error('Error fetching resume by ID:', error));
  }
}
