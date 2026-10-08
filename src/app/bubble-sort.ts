export interface Step{
    type: 'compare' | 'swap';
    i: number ;
    j: number ;
}
export function bubbleSort(input: number[]): Step[]{
    const arr = [...input];
    const steps:Step[] = [];

    for (let end = arr.length -1; end > 0; end--){
        for (let k=0; k < end; k++){
            steps.push({type:'compare',i:k, j:k+1});

            if (arr[k]> arr[k+1]) {
                const temp = arr[k];
                arr[k] = arr[k+1];
                arr[k+1] = temp;
                steps.push({type:'swap',i:k,j:k+1});
            }
        }
    }
    return steps;
}