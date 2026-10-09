import { Step } from "./bubble-sort";

export function mergeSort(input: number[]): Step[]{
    const arr = [...input];
    const steps: Step[] = [];

    function merge(low: number, mid: number, high: number){
        const left = arr.slice(low, mid + 1);
        const right = arr.slice(mid + 1, high + 1);
        let l = 0;
        let r = 0;
        let k = low;

        while (l < left.length && r < right.length){
            steps.push({type: 'compare', i: low + l, j: mid + 1 +r});

            if (left[l] <= right[r]) {
                arr[k] = left[l];
                steps.push({type: 'overwrite',i:k, j:k, value: left[l]});
                l++;
            } else {
                arr[k] = right[r];
                steps.push({type: 'overwrite',i:k,j:k, value:right[r]});
                r++;
            }
            k++;
        }
        while (l < left.length){
            arr[k] = left[l];
            steps.push({type: 'overwrite', i:k, j:k, value: left[l]});
            l++;
            k++;
        }
        while (r < right.length){
            arr[k] = right[r];
            steps.push({type: 'overwrite',i: k, j:k, value:right[r]});
            r++;
            k++;
        }
    }
    function sort(low: number, high: number){
        if (low >= high) return;
        const mid = Math.floor((low + high) / 2);
        sort(low, mid);
        sort(mid +1, high);
        merge(low, mid, high);
    }
    sort(0, arr.length - 1);
    return steps;
}