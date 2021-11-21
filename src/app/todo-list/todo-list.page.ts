import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo.service';
import { ToDo } from '../models/to-do';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  // ToDo interface instance
  Tasks: ToDo[];

  constructor(
    private todoService: TodoService,
    private router: Router,
    private authService: AuthenticationService
    ) { }
  
  // Get the list of tasks from Firebase
  ngOnInit() {
    this.todoService.getTasks().subscribe((res) => {
      this.Tasks = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as ToDo
        };
      })
    });
  }

  go(path: string) {
    this.router.navigate([path]);
  }

  
  todoList() {
    this.todoService.getTasks().subscribe((data) => {
      console.log(data);
    })
  }

  remove(id){
    console.log(id);
    if(window.confirm('Are you sure you want to delete this task?')){
      this.todoService.deleteTask(id)
    }
  }

  signOutUser(){
    this.authService.signOut();
    this.router.navigate(['']);
    //this.go('/')
  }
}
