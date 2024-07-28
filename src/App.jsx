import { useEffect,useState } from 'react'

import './App.css'
const RANDOM_FACT_CAT_ENDPOINT='https://catfact.ninja/fact'
const IMAGE_CAT_ENDPOINT=`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`
function App() {
 
  const [fact,setFact]=useState('')
  useEffect(()=>{
       fetch(RANDOM_FACT_CAT_ENDPOINT).then(res=>res.json())
       .then(data=>setFact(data.fact)).then(console.log(fact))
  }, [])
  
  return (
   <main>
    <h1>random fact</h1>
    {fact &&<p>{fact}</p>}
   </main>
  )
}

export default App
