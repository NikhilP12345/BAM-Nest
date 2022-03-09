import { AsyncLocalStorage } from 'async_hooks';
import { IUser } from 'core/interfaces/user.interface';

export class RequestContext {
  static localStorage = new AsyncLocalStorage<RequestContext>();
  static user:IUser;

  static setUser(user:IUser){
    this.user = user;
  }

  static getUser(){
    return this.user;
  }
  
  constructor() {}

}
