import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Property {
  id: number;
  type: string;
  numberOfRooms: number;
  area: number;
  price: number;
  Location: string;
  status: string;
  images: string[];
  company?: {
    Id: string;
    Name: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  active: boolean;
  joinDate: Date;
}

interface Company {
  Id: string;
  Name: string;
  Email: string;
  City: string;
  Address: string;
  Image: string;
  propertyCount?: number;
}

interface AdminStats {
  totalProperties: number;
  totalUsers: number;
  totalCompanies: number;
  totalRevenue: number;
}

interface AdminSettings {
  enableRegistration: boolean;
  requireApproval: boolean;
  enableReviews: boolean;
  newUserNotification: boolean;
  newPropertyNotification: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // Dashboard stats
  stats: AdminStats = {
    totalProperties: 0,
    totalUsers: 0,
    totalCompanies: 0,
    totalRevenue: 0
  };

  // Tab management
  currentTab: string = 'properties';

  // Search and filter
  searchQuery: string = '';
  filterStatus: string = '';

  // Data arrays
  properties: Property[] = [];
  users: User[] = [];
  companies: Company[] = [];

  // Settings
  settings: AdminSettings = {
    enableRegistration: true,
    requireApproval: false,
    enableReviews: true,
    newUserNotification: true,
    newPropertyNotification: true
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  // Fetch dashboard data
  loadDashboardData() {
    // In a real app, these would be API calls
    this.loadProperties();
    this.loadUsers();
    this.loadCompanies();

    // Update stats
    this.updateStats();
  }

  loadProperties() {
    // Mock data - replace with API call
    this.properties = [
      {
        id: 1,
        type: 'Apartment',
        numberOfRooms: 3,
        area: 120,
        price: 1200000,
        Location: 'Cairo, Egypt',
        status: 'For Sale',
        images: ['assets/images/property1.jpg'],
        company: {
          Id: '1',
          Name: 'Cairo Realty'
        }
      },
      {
        id: 2,
        type: 'Villa',
        numberOfRooms: 5,
        area: 350,
        price: 3500000,
        Location: 'Alexandria, Egypt',
        status: 'For Sale',
        images: ['assets/images/property2.jpg'],
        company: {
          Id: '2',
          Name: 'Alexandria Properties'
        }
      },
      {
        id: 3,
        type: 'House',
        numberOfRooms: 4,
        area: 200,
        price: 15000,
        Location: 'Giza, Egypt',
        status: 'For Rent',
        images: ['assets/images/property3.jpg'],
        company: {
          Id: '1',
          Name: 'Cairo Realty'
        }
      },
      {
        id: 4,
        type: 'Apartment',
        numberOfRooms: 2,
        area: 80,
        price: 800000,
        Location: 'Sharm El Sheikh, Egypt',
        status: 'Sold',
        images: ['assets/images/property4.jpg'],
        company: {
          Id: '3',
          Name: 'Red Sea Homes'
        }
      }
    ];
  }

  loadUsers() {
    // Mock data - replace with API call
    this.users = [
      {
        id: 1,
        name: 'Ahmed Mohamed',
        email: 'ahmed@example.com',
        avatar: 'assets/images/user1.jpg',
        role: 'Admin',
        active: true,
        joinDate: new Date('2023-01-15')
      },
      {
        id: 2,
        name: 'Sarah Ibrahim',
        email: 'sarah@example.com',
        avatar: 'assets/images/user2.jpg',
        role: 'User',
        active: true,
        joinDate: new Date('2023-03-22')
      },
      {
        id: 3,
        name: 'Mohamed Ali',
        email: 'mohamed@example.com',
        avatar: 'assets/images/user3.jpg',
        role: 'Agent',
        active: true,
        joinDate: new Date('2023-06-10')
      },
      {
        id: 4,
        name: 'Fatma Hassan',
        email: 'fatma@example.com',
        avatar: 'assets/images/user4.jpg',
        role: 'User',
        active: false,
        joinDate: new Date('2023-08-05')
      }
    ];
  }

  loadCompanies() {
    // Mock data - replace with API call
    this.companies = [
      {
        Id: '1',
        Name: 'Cairo Realty',
        Email: 'info@cairorealty.com',
        City: 'Cairo',
        Address: 'Nasr City, Cairo',
        Image: 'assets/images/company1.jpg',
        propertyCount: 12
      },
      {
        Id: '2',
        Name: 'Alexandria Properties',
        Email: 'contact@alexproperties.com',
        City: 'Alexandria',
        Address: 'Montazah, Alexandria',
        Image: 'assets/images/company2.jpg',
        propertyCount: 8
      },
      {
        Id: '3',
        Name: 'Red Sea Homes',
        Email: 'info@redsehomes.com',
        City: 'Sharm El Sheikh',
        Address: 'Nabq Bay, Sharm El Sheikh',
        Image: 'assets/images/company3.jpg',
        propertyCount: 15
      }
    ];
  }

  updateStats() {
    this.stats = {
      totalProperties: this.properties.length,
      totalUsers: this.users.length,
      totalCompanies: this.companies.length,
      totalRevenue: 25000 // Example revenue
    };
  }

  // Filter properties based on search query and status filter
  get filteredProperties(): Property[] {
    return this.properties.filter(property => {
      // Filter by search query
      const matchesSearch = !this.searchQuery ||
        property.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.Location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.company?.Name.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Filter by status
      const matchesStatus = !this.filterStatus || property.status.toLowerCase() === this.filterStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }

  // Action Methods
  deleteProperty(id: number) {
    if (confirm('Are you sure you want to delete this property?')) {
      // In a real app, you would call an API to delete the property
      this.properties = this.properties.filter(p => p.id !== id);
      this.updateStats();
    }
  }

  saveSettings() {
    // In a real app, you would call an API to save the settings
    console.log('Saving settings:', this.settings);
    alert('Settings saved successfully!');
  }

  logout() {
    // In a real app, you would call an authentication service to logout
    localStorage.removeItem('admin_token');
    this.router.navigate(['/login']);
  }
}
