export const cutStartAndEndString = (string: string, cutnum: number) => {
    return `${string.slice(0, cutnum)}...${string.slice(-cutnum)}`
}