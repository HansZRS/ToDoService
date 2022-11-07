import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todoitem-detail',
  templateUrl: './todoitem-detail.component.html',
  styleUrls: ['./todoitem-detail.component.scss']
})
export class TodoitemDetailComponent implements OnInit {

  // get todoItem(): ToDoItem{
  //   return this.todoService.currentTodoItem();
  // }

  public todoItem: ToDoItem = {} as ToDoItem;
  
  constructor(public todoService: TodoService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    // console.log(id);
    this.todoService.findById(Number(id)).subscribe(res => {
      this.todoItem = res;
    });
  }

  update(): void {
    this.todoService.update(this.todoItem);
  }
}
