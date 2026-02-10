import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  logo: string;
  postedDate: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchQuery: string = '';
  allJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'We are looking for an experienced Frontend Developer to join our team and work on cutting-edge web applications.',
      logo: '🚀',
      postedDate: '2 days ago',
      tags: ['React', 'TypeScript', 'CSS']
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataFlow Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $170k',
      description: 'Join our backend team to build scalable microservices and APIs that power millions of users.',
      logo: '💻',
      postedDate: '3 days ago',
      tags: ['Node.js', 'Python', 'AWS']
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90k - $120k',
      description: 'Design beautiful and intuitive user interfaces for our web and mobile applications.',
      logo: '🎨',
      postedDate: '1 week ago',
      tags: ['Figma', 'Adobe XD', 'Prototyping']
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'StartupHub',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110k - $150k',
      description: 'Work on both frontend and backend technologies in a fast-paced startup environment.',
      logo: '⚡',
      postedDate: '4 days ago',
      tags: ['Angular', 'Node.js', 'MongoDB']
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$140k - $180k',
      description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
      logo: '☁️',
      postedDate: '5 days ago',
      tags: ['Docker', 'Kubernetes', 'CI/CD']
    },
    {
      id: 6,
      title: 'Mobile Developer',
      company: 'AppWorks',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$100k - $140k',
      description: 'Build native mobile applications for iOS and Android platforms.',
      logo: '📱',
      postedDate: '1 week ago',
      tags: ['React Native', 'Swift', 'Kotlin']
    },
    {
      id: 7,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$150k - $190k',
      description: 'Apply machine learning and statistical analysis to solve complex business problems.',
      logo: '📊',
      postedDate: '3 days ago',
      tags: ['Python', 'ML', 'TensorFlow']
    },
    {
      id: 8,
      title: 'Product Manager',
      company: 'ProductCo',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $160k',
      description: 'Lead product strategy and work with cross-functional teams to deliver great products.',
      logo: '📦',
      postedDate: '2 days ago',
      tags: ['Agile', 'Strategy', 'Roadmap']
    },
    {
      id: 9,
      title: 'QA Engineer',
      company: 'QualityFirst',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$80k - $110k',
      description: 'Ensure software quality through comprehensive testing and automation.',
      logo: '✅',
      postedDate: '6 days ago',
      tags: ['Selenium', 'Jest', 'Automation']
    }
    ];

  jobs: Job[] = [...this.allJobs];

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  viewJobDetails(jobId: number) {
    console.log('Viewing job:', jobId);
    // Navigate to job details page (you can implement this later)
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.jobs = [...this.allJobs];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.jobs = this.allJobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
}
