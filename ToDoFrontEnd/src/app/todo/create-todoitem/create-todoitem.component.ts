import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from '../../model/ToDoItem';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-create-todoitem',
  templateUrl: './create-todoitem.component.html',
  styleUrls: ['./create-todoitem.component.scss']
})
export class CreateTodoitemComponent implements OnInit, OnDestroy {

  public toDoItem: ToDoItem;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {
    this.toDoItem = 
    {
      id: 0,
      title: '',
      description: '',
      isDone: false
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy() { 
  }

  async navToList(): Promise<boolean> {
    return this.router.navigate([''], {
      relativeTo: this.route.parent
    });
  }

  public createToDoItem(): void {
    if (this.toDoItem.id != null){
      this.todoService.create(this.toDoItem).subscribe(() => {
        this.navToList();
      });
    }
  }
}
