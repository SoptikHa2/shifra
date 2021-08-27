import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  tasksRunningCount: number = 0;

  set TasksRunningCount(value: number) {
    this.tasksRunningCount = value;
    this.loading.next(!!this.tasksRunningCount);
  }

  get TasksRunningCount() {
    return this.tasksRunningCount;
  }

  loading: BehaviorSubject<boolean>;

  constructor() {
    this.loading = new BehaviorSubject<boolean>(false);
  }

  startLoading<T>(task: Observable<T>): Observable<T> {
    ++this.TasksRunningCount;
    console.log("remaining tasks:", this.TasksRunningCount);
    return task.pipe(
      tap((val) => {
        console.log(val)
        --this.TasksRunningCount;
        console.log("remaining tasks:", this.TasksRunningCount);
      }),
      catchError(err => {
        if (!environment.production) console.error(err);
        --this.TasksRunningCount;
        console.log("remaining tasks:", this.TasksRunningCount);
        return throwError(err);
      })
    );
  }
}