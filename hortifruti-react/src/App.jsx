import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FormsAddProduto from './components/FormsAddProduto'
import ProdutosGrid from './components/ProdutosGrid'

import './App.css'

const STORAGE_KEY = 'hortifruti:produtos'

function App() {

  const[produtos, setProdutos] = useState(() => {
    try{
      const salvos = localStorage.getItem(STORAGE_KEY)
      return salvos ? JSON.parse(salvos) : []
    } catch{
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos))
  }, [produtos])

  function addProduto(produto){
    const novo = {...produto, id: crypto.randomUUID()}
    setProdutos((anteriores) => [...anteriores,novo])
  }


  return (
    <>
    <Navbar />
    <Hero />
    <FormsAddProduto onAdicionar={addProduto}/>
    <ProdutosGrid produtos={produtos} />

    </>
   

    
    
  )
}

export default App
