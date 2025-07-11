import { Link } from "react-router-dom";
import { requestAddToCart } from "../../utils/cart-api"

function Item({product, isOrderable=true}) {
  const addToCart=async()=>{
    try {
      const response = await requestAddToCart(product.id);
      alert(`장바구니에 ${response.data}개 담았습니다`);
    } catch(err) {
      console.log(err);
      alert(err.response.data);
    }
  }

  return (
    <div className="card" style={{width:300}}>
      <Link to={isOrderable? `/product/view?id=${product.id}`:`/seller/product/view?id=${product.id}`}>
        <img className="card-img-top" src={product.image} alt="Card image" style={{width:'100%'}} />
      </Link>
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <h5 className="card-text">{product.price}원</h5>
        {isOrderable && <button className="btn btn-primary" onClick={addToCart}>장바구니</button>}
        {product.orderExist && <button className="btn btn-danger" onClick={addToCart}>주문</button>}
      </div>
  </div>
  )
}
///seller/product/vie
export default Item