import { useNavigate } from 'react-router-dom'
import './index.css'
function Cart(props) {
  const{title, image, price} = props.product.attributes;
  const{id} = props.product;
  const navigate = useNavigate();

  function handleRedirect(){
    navigate(`/about/${id}`)
  }
  return (
    <div className='p-2 shadow-sm mb-5 bg-body rounded w-25' style={{cursor:'pointer'}} onClick={handleRedirect}>
      <img  width={300} height={300} src={image} alt="" />
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  )
}

export default Cart