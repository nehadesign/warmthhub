import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyArray } from 'mongoose';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}
  searchForm!: FormGroup;
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchBox: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.router.navigate(['/search', form.value.searchBox])

  }
}
