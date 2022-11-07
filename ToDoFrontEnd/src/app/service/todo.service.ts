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
  // todo: ToDoItem
  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  constructor(private todoStore: TodoStoreService, private todoApi: TodoApiService) {
    // this.todo = {
    //   id: 0,
    //   title: '',
    //   description: '',
    //   isDone: false
    // };
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

  public update(id: number, updateTodoItem: ToDoItem): void {
    this.todoApi.update(id, updateTodoItem);
    // this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): Observable<ToDoItem> {
    return this.todoApi.getById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }
}
