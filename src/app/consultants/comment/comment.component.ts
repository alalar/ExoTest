import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultantsService } from '../consultants.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Consultant } from '../../shared/consultant';


@Component({
  selector: 'comment-module',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() consultantId: number;

  public commentForm : FormGroup;
  private errorSavingComment:string = "";

  constructor(private fb: FormBuilder,
    private consultantsService: ConsultantsService, ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.commentForm = this.fb.group({
        user: [null, [Validators.required,Validators.minLength(3)] ],
        subject: [null, [Validators.required,Validators.minLength(5)]],
        body: [null, [Validators.required,Validators.minLength(10)] ],
        rating:[0],
        consultant:[this.consultantId]
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.consultantsService.addComment(this.commentForm.value)
        .subscribe(
          function(result) {
          window.location.reload();
        },
        function(errorData:HttpErrorResponse) {
              this.errorSavingComment = "";
              Object.keys(errorData.error).forEach(
                function(error) {
                  if (this.commentForm.controls[error]) {
                    this.commentForm.controls[error].setErrors({'required':true});
                  } else {
                    this.errorSavingComment += error + ": " + errorData.error[error];
                  }
                }.bind(this)
              )
          }.bind(this));
    }
  }

}
