import { Step } from "./bubble-sort";

export function quickSort(input: number[]): Step[]{
    const arr = [...input];
    const steps: Step[] = [];

    function swap(a: number, b: number){
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        steps.push({type: 'swap', i: a, j:b});
    }
    function partition(low: number, high: number): number{
        const pivot = arr[high];
        let i = low - 1;

        for(let j = low; j < high; j++){
            steps.push({type: 'compare',i: j, j: high});

            if (arr[j] < pivot){
                i++;
                if (i !== j){
                    swap(i,j);
                }
            }
        }
        if (i + 1 !== high){
            swap(i + 1, high);
        }
        return i + 1;
    }
    function sort(low: number, high: number){
        if (low < high){
            const p = partition(low, high);
            sort(low, p -1);
            sort(p + 1, high);
        }
    }
    sort(0, arr.length - 1);
    return steps;
}