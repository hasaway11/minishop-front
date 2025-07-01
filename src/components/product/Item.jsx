function Item({product}) {
  return (
    <div className="card" style={{width:300}}>
      <a href={`/product/view?id=${product.id}`}>
        <img className="card-img-top" src={`http://localhost:8080/api/images/${product.image}`} alt="Card image" style={{width:'100%'}} />
      </a>
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <h5 className="card-text">{product.price}원</h5>
        <a href="#" class="btn btn-primary">장바구니</a>
      </div>
  </div>
  )
}

export default Item