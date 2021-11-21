import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { ToDo } from '../models/to-do';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  // Create a new todo task to send to the Firebase database
  createTask(todo: ToDo){
    return this.ngFirestore.collection('tasks').add(todo);
  }

  // Get a list of tasks stored on the FireStore database
  getTasks(){
    return this.ngFirestore.collection('tasks').snapshotChanges();
  }

  // Get a single todo task with the specified ID from the FireStore database
  getTask(id){
    return this.ngFirestore.collection('tasks').doc(id).valueChanges();
  }

  // Update a single todo task  with the specified ID from the FireStore database
  // then navigate to the to do list page
  updateTask(id, todo: ToDo){
    this.ngFirestore.collection('tasks').doc(id).update(todo)
    .then(() => {
      this.router.navigate(['/todo-list']);
    }).catch(error => console.log(error));
  }

  // Delete a single todo task with the specified ID from the FireStore database
  deleteTask(id: string){
    this.ngFirestore.doc('/tasks/' + id).delete();
  }
}
