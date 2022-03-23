

export const  getKeyByValue = (object: any, value: string): string | undefined => {
    return Object.keys(object).find(key => object[key] === value);
}

