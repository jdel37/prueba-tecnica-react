import './App.css'
import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'
import { Otro } from './components/Otro.jsx'
export function App () {
  const { fact, refreshFact } = useCatFact()
 

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main className="text-center p-6 max-w-md mx-auto bg-slate-400 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">App de gatitos</h1>

      <button onClick={handleClick} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Change Fact
</span>
</button>

      {fact && <p className='mb-3 text-lg text-gray-700 md:text-xl dark:text-gray-700'>{fact}</p>}
   <Otro fact={fact}/>
    </main>
  )
}
export default App