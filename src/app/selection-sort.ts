import { Step } from "./bubble-sort";

export function selectionSort(input: number[]): Step[]{
    const arr = [...input];
    const steps: Step[] = [];

    for (let i=0; i < arr.length - 1; i++){
        let min = i;

        for (let j = i + 1; j < arr.length; j++){
            steps.push ({type: 'compare', i: min, j:j});
            if (arr[j] < arr[min]){
                min = j;
            }
        }
        if (min ! == i){
            const temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
            steps.push({type: 'swap',i:i,j: min});
        }
    }
    return steps;
}