export const randomEnumValue = <T>(values: readonly T[]): T => {
    return values[Math.floor(Math.random() * values.length)]
}

export const buildRandomArray = (source: string[], min: number, max: number): string[] => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min
    const shuffled = [...source].sort(() => 0.5 - Math.random())
    
    return shuffled.slice(0, count)
}
