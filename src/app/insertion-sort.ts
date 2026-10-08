import { Step } from "./bubble-sort";

export function insertionSort(input: number[]): Step[]{
    const arr = [...input];
    const steps: Step[] =  [];

    for (let i = 1; i < arr.length; i++){
        let j = i;

        while (j > 0) {
            steps.push({type: 'compare', i:j-1, j:j});

            if (arr[j-1] > arr[j]){
                const temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
                steps.push({type: 'swap',i:j - 1,j: j});
                j--;
            } else {
                break;
            }
        }
    }
    return steps;
}