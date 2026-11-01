
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  status: string;
  fee: number;
  paid: number;
  attendance: number;
  joined: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  activePage = 'Dashboard';
  searchText = '';
  selectedFilter = 'All';
  editingId: number | null = null;

  students: Student[] = [
    {
      id: 1,
      name: 'Aarav Sharma',
      email: 'aarav@gmail.com',
      phone: '9876543210',
      course: 'Computer Science',
      year: 'First Year',
      status: 'Active',
      fee: 50000,
      paid: 40000,
      attendance: 92,
      joined: '2026-06-10'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya@gmail.com',
      phone: '9876543211',
      course: 'Information Technology',
      year: 'Second Year',
      status: 'Active',
      fee: 45000,
      paid: 45000,
      attendance: 95,
      joined: '2026-06-12'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul@gmail.com',
      phone: '9876543212',
      course: 'Mechanical Engineering',
      year: 'Third Year',
      status: 'Inactive',
      fee: 55000,
      paid: 25000,
      attendance: 65,
      joined: '2026-06-15'
    },
    {
      id: 4,
      name: 'Sneha Deshmukh',
      email: 'sneha@gmail.com',
      phone: '9876543213',
      course: 'Computer Science',
      year: 'Final Year',
      status: 'Active',
      fee: 50000,
      paid: 50000,
      attendance: 98,
      joined: '2026-06-18'
    },
    {
      id: 5,
      name: 'Rohan Joshi',
      email: 'rohan@gmail.com',
      phone: '9876543214',
      course: 'Business Administration',
      year: 'Second Year',
      status: 'Active',
      fee: 40000,
      paid: 30000,
      attendance: 85,
      joined: '2026-06-20'
    },
    {
      id: 6,
      name: 'Ananya Singh',
      email: 'ananya@gmail.com',
      phone: '9876543215',
      course: 'Information Technology',
      year: 'First Year',
      status: 'Inactive',
      fee: 45000,
      paid: 15000,
      attendance: 70,
      joined: '2026-06-22'
    }
  ];

  form: Student = this.emptyStudent();

  emptyStudent(): Student {
    return {
      id: 0,
      name: '',
      email: '',
      phone: '',
      course: '',
      year: '',
      status: 'Active',
      fee: 0,
      paid: 0,
      attendance: 0,
      joined: new Date().toISOString().slice(0, 10)
    };
  }

  get totalStudents(): number {
    return this.students.length;
  }

  get activeStudents(): number {
    return this.students.filter(s => s.status === 'Active').length;
  }

  get inactiveStudents(): number {
    return this.students.filter(s => s.status === 'Inactive').length;
  }

  get totalFees(): number {
    return this.students.reduce((sum, s) => sum + s.fee, 0);
  }

  get collectedFees(): number {
    return this.students.reduce((sum, s) => sum + s.paid, 0);
  }

  get pendingFees(): number {
    return this.totalFees - this.collectedFees;
  }

  get filteredStudents(): Student[] {
    return this.students.filter(student => {
      const search = this.searchText.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.course.toLowerCase().includes(search);

      const matchesFilter =
        this.selectedFilter === 'All' ||
        student.status === this.selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }

  changePage(page: string): void {
    this.activePage = page;
    this.searchText = '';

    if (page === 'Add Student') {
      this.resetForm();
    }
  }

  saveStudent(): void {
    if (
      !this.form.name.trim() ||
      !this.form.email.trim() ||
      !this.form.phone.trim() ||
      !this.form.course ||
      !this.form.year ||
      this.form.fee < 0 ||
      this.form.paid < 0 ||
      this.form.paid > this.form.fee ||
      this.form.attendance < 0 ||
      this.form.attendance > 100
    ) {
      alert('Please enter valid student details.');
      return;
    }

    if (this.editingId !== null) {
      const index = this.students.findIndex(
        s => s.id === this.editingId
      );

      if (index !== -1) {
        this.students[index] = { ...this.form };
      }

      alert('Student updated successfully!');
    } else {
      const newStudent: Student = {
        ...this.form,
        id: Math.max(0, ...this.students.map(s => s.id)) + 1
      };

      this.students.push(newStudent);
      alert('Student added successfully!');
    }

    this.resetForm();
    this.activePage = 'Students';
  }

  editStudent(student: Student): void {
    this.form = { ...student };
    this.editingId = student.id;
    this.activePage = 'Add Student';
  }

  deleteStudent(id: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this student?'
    );

    if (confirmed) {
      this.students = this.students.filter(s => s.id !== id);
      alert('Student deleted successfully!');
    }
  }

  resetForm(): void {
    this.form = this.emptyStudent();
    this.editingId = null;
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }
}
