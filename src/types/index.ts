//Se crea un type para la bd que solo tiene un id y un name
export type Category ={
    id:number,
    name: string
}

//se hace lo mismop para convertir en numero el category y calories y se le añade la caloria
export type Activity = {
    id: string,
    category: number,
    name: string,
    calories: number
}

