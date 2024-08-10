
import { useReducer, useEffect, useMemo } from "react"
import Form from "./Components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./Components/ActivityList";
import CalorieTracker from "./Components/CalorieTracker";
function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  useEffect( () => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-blue-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-center text-xl font-bold text-white p-2">Administrador de Calorias</h1>
            <button className="bg-white text-black font-bold py-1 px-2 rounded-md hover:bg-slate-300 disabled:opacity-10" 
            disabled= {!canRestartApp()} onClick={() => dispatch({type: 'restart-app'})}>Reinciar App</button>
        </div>
      </header>
      <section className="bg-blue-400 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
          dispatch = {dispatch}
          state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker
                activities={state.activities}
            />
          </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
          <ActivityList 
          activities = {state.activities}
          dispatch = {dispatch}
          />
      </section>
      <footer>
          <p className="p-2 bg-blue-500 text-white font-bold text-center ">Derechos reservados - Kadhir Avila Gallardo</p>
      </footer>
    </>
  )
}

export default App
