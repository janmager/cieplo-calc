export function numberWithSpaces(x: number, toFix: number) {
    return x.toFixed(toFix).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}