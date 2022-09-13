import { useGlobalContext } from '../Context'
const Favorites = () => {
  const { favorites, removeFromFavorites } = useGlobalContext()
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h3>Favorites</h3>
        <div className="favorites-container">
          {
            favorites.map(favorite => (
              <div className="favorite-item">
                <img src={favorite.strMealThumb} className="favorites-img img" />
                <button className='remove-btn' onClick={() => removeFromFavorites(favorite.idMeal)}>remove</button>
              </div>

            ))
          }
        </div>
      </div>
    </section>
  )
}
export default Favorites