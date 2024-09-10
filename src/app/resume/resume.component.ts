import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


export interface Qualification {
  degree: string;
  institute: string;
  year: number;
  grade: string;
  remarks: string;
}

export interface Resume {
  id: any;
  firstName: string;
  lastName: string;
  dob: string;
  photoUrl: string;
  summary: string;
  qualifications: Qualification[];
  experiences: []
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  resume: any = {
    firstName: '',
    lastName: '',
    dob: '',
    photoUrl: '',
    summary: '',
    qualifications: [],
    experience:[]

  };
  userId: string = '';
  resumeExists: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Get the logged-in userId from localStorage
this.userId = localStorage.getItem('userId') || '';
    console.log('Logged in as:', this.userId); // Add this line to debug
    
    if (!this.userId) {
      alert('User ID not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
    
    // Load the resume of the logged-in user
    this.loadUserResume();
  }
  

  loadUserResume() {
    this.http.get<any[]>(`http://localhost:3000/resumes?userId=${this.userId}`)
      .subscribe((resumes) => {
        if (resumes.length > 0) {
          // Load the first matching resume
          this.resume = resumes[0];
          this.resumeExists = true;
        } else {
          // If no resume exists for the user, show a blank form
          this.resumeExists = false;
        }
        if (!this.resume.qualifications) {
          this.resume.qualifications = [];
        }
        if (!this.resume.experiences) {
          this.resume.experiences = [];
        }
      });
  }

  
  onSubmit() {
    this.resume.userId = this.userId;
  
    // First, fetch the existing resume
    this.http.get<Resume[]>(`http://localhost:3000/resumes?userId=${this.userId}`)
      .subscribe(resumes => {
        if (resumes.length > 0) {
          // If resume exists, update it
          const existingResume = resumes[0];
          this.http.put(`http://localhost:3000/resumes/${existingResume.id}`, this.resume)
            .subscribe(
              () => alert('Resume updated successfully.'),
              error => console.error('Error updating resume:', error)
            );
        } else {
          // If no resume exists, create a new one
          this.http.post('http://localhost:3000/resumes', this.resume)
            .subscribe(
              () => alert('Resume created successfully.'),
              error => console.error('Error creating resume:', error)
            );
        }
      }, error => console.error('Error fetching resumes:', error));
  }


    addQualification() {
    if (this.resume.qualifications.length < 6) {
      this.resume.qualifications.push({
        degree: '',
        institute: '',
        year: new Date().getFullYear(),
        grade: '',
        remarks: ''
      });
    } else {
      alert('Maximum of 6 qualifications allowed.');
    }
  }

  removeQualification(index: number) {
    this.resume.qualifications.splice(index, 1);
  }

  
    addExperience() {
    if (this.resume.experiences.length < 6) {
      this.resume.experiences.push({
        organization: '',
        role: '',
        year: new Date().getFullYear(),
        remarks: ''
      });
    } else {
      alert('Maximum of 6 experiences allowed.');
    }
  }

  removeExperience(index: number) {
    this.resume.experiences.splice(index, 1);
  }
}
