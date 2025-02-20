export function getProjectOutsideTemp(zone: number) {
    switch(zone){
        case 1:
            return -16;
        case 2:
            return -18;
        case 3:
            return -20;
        case 4:
            return -22;
        case 5:
            return -24;
    }
}