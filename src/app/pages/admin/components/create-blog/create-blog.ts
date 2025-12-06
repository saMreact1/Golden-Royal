import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../core/services/blog.service';

@Component({
  selector: 'app-create-blog',
  standalone: false,
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog implements OnInit {
  date = new Date();

  blogForm!: FormGroup;
  preview: string | ArrayBuffer | null = null;
  isDragOver: boolean = false;

  constructor(
    private blog: BlogService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content:  ['', Validators.required],
      featuredImage:  ['', Validators.required],
      author: ['', Validators.required],
      category: [null, Validators.required]
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.handleFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const file = event.dataTransfer?.files[0];
    this.handleFile(file);
  }

  handleFile(file: File | undefined) {
    if (!file) return;

    this.blogForm.patchValue({ featuredImage: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
