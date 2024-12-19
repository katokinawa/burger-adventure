import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { API_URL } from '../../utils/constants'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default function App() {
  const [data, setData] = useState({})


  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(error => console.log(`Не могу получить данные: ${error}`))
  }, [])
  return (
    <>
      <AppHeader />
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </>
  )
}