import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from '../../model/ToDoItem';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-list-todoitem',
  templateUrl: './list-todoitem.component.html',
  styleUrls: ['./list-todoitem.component.scss']
})
export class ListTodoitemComponent implements OnInit {
  public toDoItems: ToDoItem[];
  // public toDoItems: ToDoItem[] = [
  //   {
  //     id: 0,
  //     title: '',
  //     description: '',
  //     isDone: false
  //   },
  // ];
  // public get toDoItems(): ToDoItem[] {
  //   return this.todoService.todoItems;
  // }

  constructor(private todoService: TodoService, private router: Router, private activeRoute: ActivatedRoute) {
    this.toDoItems = 
    [{
      id: 0,
      title: '',
      description: '',
      isDone: false
    }];
  }

  ngOnInit(): void {
    this.todoService.getAll().subscribe(res => this.toDoItems = res);
  }

  public detail(id: number): void {
    this.todoService.findById(id);
    this.router.navigate(['todos', id]);
  }

  async navToList(): Promise<boolean> {
    return this.router.navigate([''], {
      relativeTo: this.activeRoute.parent
    });
  }

  public update(id: number): void {
    this.todoService.findById(id);
    this.router.navigate(['todos', 'edit', id]);
  }

  public doDelete(id: number): void {
    this.todoService.delete(id).subscribe(() => {
      const index = this.toDoItems.findIndex(item => item.id === id);
      this.toDoItems.splice(index, 1);
    });
  }
}
