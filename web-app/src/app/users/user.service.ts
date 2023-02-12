import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { UserModel } from '../models/user.model';
import { BaseService } from '../services/base.service';
import { HttpService, Response } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private prefix: string = '/users';

  constructor(private httpService: HttpService) {
    super();
  }

  getUsers() {
    return this.httpService.get(this.prefix).pipe(
      map((response: Response) =>
        response?.data?.map((user: any) => new UserModel(user))
      ),
      catchError(this.handleError<UserModel[]>('getUsers', []))
    );
  }
}
