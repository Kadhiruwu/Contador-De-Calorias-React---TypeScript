type CaloriesDisplayProps = {
    calories: number
    text: string
}

export default function CalorieDisplay({calories, text} : CaloriesDisplayProps) {
  return (
    <p className="text-white font-bold rounded-md grid grid-cols-1 gap-3 text-center">
    <span className="font-black text-6xl text-blue-500">{calories}</span>
    {text}
</p>
  )
}
