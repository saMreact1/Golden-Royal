import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../core/services/blog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  existingImage: string | null = null;
  isDragOver: boolean = false;

  constructor(
    private blog: BlogService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<CreateBlog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content:  ['', Validators.required],
      featuredImage:  ['', Validators.required],
      author: ['', Validators.required],
      category: [null, Validators.required],
      status: ['PUBLISHED']
    })

    if (this.data) {
      this.blogForm.patchValue({
        title: this.data.title,
        summary: this.data.summary,
        content: this.data.content,
        author: this.data.author,
        category: this.data.category,
        status: this.data.status
      });

      this.preview = this.data.featuredImage;
      this.existingImage = this.data.featuredImage;

      this.blogForm.get('featuredImage')?.clearValidators();
      this.blogForm.get('featuredImage')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.blogForm.invalid) return;

    if (!this.data) {
      const formData = this.buildFormData('PUBLISHED');
      this.createBlog(formData);
    } else {
      const formData = this.buildFormDataForUpdate('PUBLISHED');
      this.updateBlog(this.data.id, formData);
    }
  }

  createBlog(formData: FormData) {
    this.blog.createBlog(formData).subscribe({
      next: (res) => {
        this.snack.open('Blog successfully created ✅', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
        this.blogForm.reset();
        this.preview = null;
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Failed to create blog ❌', 'Close', { duration: 3000 })
      }
    })
  }

  updateBlog(id: string, formData: FormData) {
    this.blog.updateBlog(id, formData).subscribe({
      next: () => {
        this.snack.open('Blog updated successfully 🎉', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Update failed ❌', 'Close', { duration: 3000 });
      }
    });
  }

  buildFormData(status: 'DRAFT' | 'PUBLISHED') {
    const formData = new FormData();
    const values = this.blogForm.value;

    formData.append('title', values.title);
    formData.append('summary', values.summary);
    formData.append('content', values.content);
    formData.append('author', values.author);
    formData.append('category', values.category);
    formData.append('status', status);

    if (values.featuredImage instanceof File) {
      formData.append('featuredImage', values.featuredImage);
    } else if (this.existingImage) {
      formData.append('existingImage', this.existingImage);
    }

    return formData;
  }

  buildFormDataForUpdate(status: 'DRAFT' | 'PUBLISHED') {
    const formData = new FormData();
    const values = this.blogForm.value;

    // JSON blob for "data"
    formData.append(
      "data",
      new Blob([JSON.stringify({
        title: values.title,
        summary: values.summary,
        content: values.content,
        author: values.author,
        category: values.category,
        status: status
      })], { type: "application/json" })
    );

    // File part for "image"
    if (values.featuredImage instanceof File) {
      formData.append("image", values.featuredImage);
    } else if (this.existingImage) {
      formData.append("existingImage", this.existingImage);
    }

    return formData;
  }

  saveDraft() {
    if (!this.data) {
      const formData = this.buildFormData('DRAFT');
      this.blog.createBlog(formData).subscribe({
        next: () => {
          this.snack.open('Saved to Draft Successfully 🎉', 'Close', { duration: 3000 })
          this.dialogRef.close(true);
          this.blogForm.reset();
          this.preview = null;
        },
        error: (err) => {
          console.error(err);
          alert('Could not save draft');
        }
      });
    } else {
      const formData = this.buildFormDataForUpdate('DRAFT');
      this.updateBlog(this.data.id, formData);
    }
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

    this.blogForm.patchValue({ featuredImage: file })

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  close() {
    this.dialogRef.close();
  }
}
