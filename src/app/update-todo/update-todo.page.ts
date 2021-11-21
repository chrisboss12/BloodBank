import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.page.html',
  styleUrls: ['./update-todo.page.scss'],
})
export class UpdateTodoPage implements OnInit {

  editForm: FormGroup;
  id: any;

  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) { 
    // Get the ID from the route parameters from the to-do list page
    // Then get the task with the associated ID from the url parameters
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService.getTask(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        title: [data['title']],
        description: [data['description']]
      })
    });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })
  }

  // Updates the form with the associated ID from Firebase database
  onSubmit(){
    this.todoService.updateTask(this.id, this.editForm.value);
  }
}
