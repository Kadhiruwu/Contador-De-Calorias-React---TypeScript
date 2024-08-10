import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {
    //Contadores
    const caloriesConsumo = useMemo(() => activities.reduce((total, activity) =>activity.category === 1 ? total + activity.calories : total, 0) , [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) =>activity.category === 2 ? total + activity.calories : total, 0) , [activities])
    const CaloriesTotals = useMemo(() =>caloriesConsumo - caloriesBurned , [activities]) 

  return (
    <>
    
    <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
    <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
        <CalorieDisplay
            calories= {caloriesConsumo}
            text= 'Consumidas' 
        />

        <p className="text-white font-bold rounded-md grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-orange-500">{caloriesBurned}</span>
            Quemadas
        </p>

        <p className="text-white font-bold rounded-md grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-lime-500">{CaloriesTotals}</span>
            Diferencia
        </p>
    </div>
       
    </>
  )
}
