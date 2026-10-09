import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bubbleSort, Step } from './bubble-sort';
import { selectionSort } from './selection-sort';
import { insertionSort } from './insertion-sort';
import { quickSort } from './quick-sort';
import { mergeSort } from './merge-sort';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  array:number[]=[];
  comparing: number[]=[];
  swapping: number[]=[];
  isRunning = false;
  speed = 60;
  algorithm = 'bubble';
  arraySize=30;
  private cdr = inject(ChangeDetectorRef);

  constructor(){
    this.generateArray();
  }
  generateArray(){
    this.array=[];
    for (let i=0; i<this.arraySize; i++){
      this.array.push(Math.floor(Math.random() * 300) + 10);
    }
  }
  
  sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async run(){
    if(this.isRunning) return;
    this.isRunning = true;

    let steps: Step[];
    if (this.algorithm === 'selection'){
      steps = selectionSort(this.array);
    } else if (this.algorithm === 'insertion'){
      steps = insertionSort(this.array);
    } else {
      steps = bubbleSort(this.array);
    }

    
    if (this.algorithm === 'selection'){
      steps = selectionSort(this.array);
    }else if (this.algorithm === 'insertion'){
      steps = insertionSort(this.array);
    } else if (this.algorithm === 'quick'){
      steps = quickSort(this.array);
    } else if (this.algorithm === 'merge'){
      steps = mergeSort(this.array);
    } else {
      steps = bubbleSort(this.array);
    }

    for (const step of steps){
      if (step.type === 'compare'){
        this.comparing = [step.i , step.j];
        this.swapping = [];
      } else if (step.type === 'swap'){
        const temp = this.array[step.i];
        this.array[step.i]= this.array[step.j];
        this.array[step.j] = temp;
        this.swapping = [step.i, step.j];
        this.comparing = [];
      } else {
        this.array[step.i] = step.value as number;
        this.swapping = [step.i];
        this.comparing = [];
      
      } this.cdr.detectChanges();
      await this.sleep(this.speed);
    }
    this.comparing=[];
    this.swapping =[];
    this.isRunning = false;
    this.cdr.detectChanges();
  }
  onSizeChange(value: string){
    this.arraySize = +value;
    this.generateArray();
  }
  onSpeedChange(value:string){
    this.speed = 101-+value;
  }
  onAlgorithmChange(value: string) {
    this.algorithm = value;
  }
}

