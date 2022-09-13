import { useGlobalContext } from '../Context'
const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext()
  const { strMealThumb: img, strMeal: title, idMeal: id, strInstructions, strSource } = selectedMeal
  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <img src={img} className="img modal-img" />
        <div className='modal-content'>
          <h3>{title}</h3>
          <p>Cooking Instructions</p>
          <p>{strInstructions}</p>
          <a href={strSource} target="_blank">Original Source</a>
          <button onClick={closeModal} className="btn btn-hipster close-btn">Close</button>
        </div>
      </div>
    </aside>)
}
export default Modal