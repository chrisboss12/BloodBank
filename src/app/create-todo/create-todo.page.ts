import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {

  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    public formBuilder: FormBuilder,    
    private router: Router
  ) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })
  }

  /**
   * Checks the form for the required fields and if the form is valid to submit
   * 
   * If unsuccessful -> returns false and the form is invalid.
   * If successful -> calls the create method on the authentication service with the
   * values from the form. Resets the form and the user redirected to the to-do list page
   */
  onSubmit() {
    if(!this.todoForm.valid){
      return false;
    } else {
      this.todoService.createTask(this.todoForm.value)
      .then(() => {
        this.todoForm.reset();
        this.router.navigate(['/todo-list']);
      }).catch((err) => {
          console.log(err);
        });
    }
  }
}
