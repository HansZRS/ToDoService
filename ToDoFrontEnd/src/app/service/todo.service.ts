import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public errorMessage?: string = 'create failed';

  constructor(private todoStore: TodoStoreService, private todoApi: TodoApiService) {
  }

  public getAll(): Observable<ToDoItem[]> {
    return this.todoApi.getAll();
  }

  public findById(id: number): Observable<ToDoItem> {
    return this.todoApi.getById(id);
  }

  public create(todoItem: ToDoItem): Observable<void> {
    return this.todoApi.create(todoItem);
  }

  public update(updateTodoItem: ToDoItem): Observable<ToDoItem> {
    return this.todoApi.update(updateTodoItem);
  }

  public delete(id: number): Observable<ToDoItem> {
    return this.todoApi.getById(id);
  }
}
