import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, index) => start + index);
  }

  sleep (time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
