// 封装Context组件
import { createContext, useContext, useEffect, useState, } from 'react'
import axios from 'axios'
const AppContext = createContext()
export const useGlobalContext = () => {
  return useContext(AppContext)
}
const ContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [selectedMeal, setSelectedMeal] = useState(null)

  // 
  const randomUserUrl = 'https://randomuser.me/api/'
  const searchMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
  const ramdomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

  // 根据餐品名称查询餐品
  const fetchMeals = async (url) => {
    setLoading(true)
    const res = await axios.get(url)
    setMeals(res.data.meals ?? [])
    setLoading(false)
  }


  // 喜爱/收藏
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) ?? [])
  const addFavorites = (idMeal) => {
    const meal = meals.find(meal => meal.idMeal === idMeal)
    // 如果该餐品已存在,则忽略
    if (favorites.find(item => item.idMeal === idMeal)) {
      return;
    }
    localStorage.setItem('favorites', JSON.stringify([...favorites, meal]))
    setFavorites([...favorites, meal])
  }
  // 移除收藏
  const removeFromFavorites = (idMeal) => {
    const arr = favorites.filter(ele => ele.idMeal !== idMeal)
    localStorage.setItem('favorites', JSON.stringify(arr))
    setFavorites(arr)
  }

  // 选中餐品
  const selectMeal = (idMeal) => {
    const meal = meals.find(meal => meal.idMeal === idMeal)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  // 关闭弹窗
  const closeModal = () => {
    setShowModal(false)
  }

  const fetchMealByName = (mealName) => {
    const url = searchMealUrl + mealName
    fetchMeals(url)
  }

  // 获取随机Meal
  const fetchRandomMeal = async () => {
    fetchMeals(ramdomMealUrl);
  }
  // 获取随机用户信息
  useEffect(() => {
    axios(randomUserUrl).then(res => {
    })
  }, [])

  // 获取餐品信息
  useEffect(() => {
    fetchMeals(searchMealUrl)
  }, [])

  const contexValue = { meals, loading, fetchRandomMeal, fetchMealByName, showModal, selectedMeal, selectMeal, closeModal, favorites, setFavorites, addFavorites, removeFromFavorites }
  return (
    <AppContext.Provider value={contexValue} >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, ContextProvider }