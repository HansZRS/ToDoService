import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.scss']
})
export class UpdateTodoItemComponent implements OnInit {

  todoItem: ToDoItem

  constructor(public todoService: TodoService, private router: Router, private activeRoute: ActivatedRoute) {
    this.todoItem = 
      {
        id: 0,
        title: '',
        description: '',
        isDone: false
      };
   }

  ngOnInit(): void { 
    const id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.todoService.findById(Number(id)).subscribe(res => {
      this.todoItem = res;
    });
  }

  async navToList(): Promise<boolean> {
    return this.router.navigate([''], {
      relativeTo: this.activeRoute.parent
    });
  }

  update(): void {
    this.todoService.update(this.todoItem).subscribe(() => {
      this.navToList();
    });;
  }
}
