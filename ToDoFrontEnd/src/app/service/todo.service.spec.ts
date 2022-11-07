import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClient: any
  let httpClientSpy: any

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['post'])
    // httpClient = jasmine.createSpyObj("HttpClient",['post'])
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoitem when via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(9, 'hello', 'description', true);
    httpClientSpy.post.and.returnValue(of({}));
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith('https://localhost:5001/ToDos', todoItem);
  });

  it('should response error when create failed given failed', () => {
    // given
    const todoItem = new ToDoItem(9, 'hello', 'description', true);
    httpClientSpy.post.and.returnValue(
      throwError(() => { return { errorMessage: 'create failed' } }));
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create failed');
  });
});
