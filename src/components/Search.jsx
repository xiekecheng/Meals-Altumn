import { useContext, useState } from "react"
import { useGlobalContext } from '../Context'
const Search = () => {
  const [text, setText] = useState('')
  const { fetchRandomMeal, fetchMealByName } = useGlobalContext()
  const textChange = (event) => {
    setText(event.target.value)
  }
  const keyPress = (evt) => {
    if (evt.code === "Enter") {
      handleSubmit()
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMealByName(text)
  }
  return (
    <section className='search-container'>
      <form onSubmit={handleSubmit}>
        <input className='form-input' placeholder="type favorite meal" value={text} onChange={textChange} onKeyPress={keyPress}></input>
        <button type='submit' className="btn">Search</button>
        <button onClick={fetchRandomMeal} className="btn btn-hipster">Surprise Me</button>
      </form>

    </section>
  )
}
export default Search