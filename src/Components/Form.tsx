import { Dispatch, useState, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(), //esto es para generar id unico junto al v4 de import, tmb se le agrega al arreglo de Activity type
    category: 1,
    name: '',
    calories: 0
}

//Se importa la bd de data
//Se importa activity de types para crear el usetate de dentro de la function form

export default function Form({dispatch, state} : FormProps) {
//Se crea el useState de preferencia con los mismos nombres del campo del form
    const [activity, setActivity] = useState<Activity>(initialState)
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity);
        }
    }, [state.activeId])

 //se le agrega el handleChange para convertir en numero enteros la categoria y calorias
    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories', ].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
        
    }

 //se le agrega el isValidActivity para ver si estan vacios los campos y cambiar el boton de guardar
    const isValidActivity = () => {
        const {name, calories} = activity
         return name.trim() !== '' && calories > 0

    }

 //se le agrega el handleSubmit para enviar el formulario 
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'save-activity', payload:{newActivity:activity}})
        setActivity({
            ...initialState,
            id: uuidv4() //para generar ids diferentes por cada envio
        })
    }

  return (
    //se le agrega el onSubmit para enviar el formulario 
    <form className="space-y-5 bg-white shadow-2xl p-10 rounded-lg" onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria</label>
            <select className="border border-slate-500 p-2 rounded-lg bg-white w-full" id="category" 
            value={activity.category} onChange={handleChange} >
                {categories.map(categoty => (
                    <option key={categoty.id} value={categoty.id}>{categoty.name}</option>
                ))}
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
             <label htmlFor="name" className="font-bold">Actividad</label>
             <input type="text" className="border border-slate-500 p-2 rounded-lg bg-white w-full" id="name" 
             placeholder="Ej. Ejercicio, Comer ensaladas, Comer frutas, Caminar.." value={activity.name} onChange={handleChange}/>
        </div>

        <div className="grid grid-cols-1 gap-3">
             <label htmlFor="calories" className="font-bold">Calorias</label>
             <input type="number" className="border border-slate-500 p-2 rounded-lg bg-white w-full" id="calories" 
             placeholder="Calorias, Ej. 300, 100, 200, 350..." value={activity.calories} onChange={handleChange}/>
        </div>
        
        <input type="submit" value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} disabled={!isValidActivity()}
        className="bg-slate-800 hover:bg-zinc-600 text-white rounded-md py-2 px-4 font-bold cursor-pointer disabled:opacity-10"/>
    </form>
  )
}
