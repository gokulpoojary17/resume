import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrl: './adminview.component.css'
})
export class AdminviewComponent {
  resumes: any[] = [];
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadResumes();
  }

  loadResumes() {
    this.http.get<any[]>('http://localhost:3000/resumes')
      .subscribe((resumes) => {
        this.resumes = resumes.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      }, error => console.error('Error fetching resumes:', error));
  }

  viewResume(resumeId: string) {
    this.router.navigate(['/view', { id: resumeId }]);
  }
}
