import { useGlobalContext } from '../Context'
import { AiOutlineLike } from "react-icons/ai";

const Meals = () => {
  const { meals, loading, selectMeal,addFavorites } = useGlobalContext()
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    )
  }
  if (!meals?.length) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    )
  }
  return (
    <section className="section-center" >
      {
        meals.map(meal => {
          const { strMeal: title, strMealThumb: image, idMeal: id } = meal
          return (
            <article key={id} className="single-meal">
              <img src={image} className='img' onClick={() => selectMeal(id)} />
              <footer>
                <h4>{title}</h4>
                <button className='like-btn' onClick={()=>addFavorites(id)}><AiOutlineLike /></button>
              </footer>
            </article>
          )
        })
      }
    </section>
  )
}
export default Meals