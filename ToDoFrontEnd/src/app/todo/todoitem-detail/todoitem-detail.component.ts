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

  public todoItem: ToDoItem;

  constructor(public todoService: TodoService, private activeRoute: ActivatedRoute) {
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
    // console.log(id);
    this.todoService.findById(Number(id)).subscribe(res => {
      this.todoItem = res;
    });
  }

  update(): void {
    this.todoService.update(this.todoItem);
  }
}
