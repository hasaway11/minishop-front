import { fetchCarts, requestDecreaseQuantity, requestIncreaseQuantity, requestOrderSelectedItems, requestRemoveItem, requestRemoveSelectedItems } from "../../utils/cart-api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

function CartList() {
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();
  const {data, error, isLoading, mutate } = useSWR('carts', ()=>fetchCarts(), { revalidateOnFocus: false} );

  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;

  const {cartTotalPrice, items} = data.data;

  const handleChange=(e)=>{
    if(e.target.checked) {
      setIds(prev=>[...prev, e.target.value]);
    } else {
      setIds(prev=>prev.filter(el=>el!==e.target.value))
    }
  }

  const handleCartUpdate = async (requestFn) => {
    try {
      const updatedCart = await requestFn();
      mutate(updatedCart, false);
    } catch (err) {
      alert(err.response?.data || '에러 발생');
      console.error(err);
    }
  };

  const increaseQuantity = (id)=>handleCartUpdate(()=>requestIncreaseQuantity(id));

  const decreaseQuantity = (id)=>handleCartUpdate(()=>requestDecreaseQuantity(id));

  const removeItem = (id)=>handleCartUpdate(()=>requestRemoveItem(id));
  
  const removeSelectedItems = ()=>{
    if(ids.length==0) {
      alert("삭제할 상품을 선택해주세요");
      return;
    }
    const query = ids.map(id => `ids=${id}`).join('&');
    handleCartUpdate(()=>requestRemoveSelectedItems(query));
  };

  const orderSelectedItems=async()=>{
    if(ids.length==0) {
      alert("구매할 상품을 선택해주세요");
      return;
    }
    const query = ids.map(id => `ids=${id}`).join('&');
    try {
      const response = requestOrderSelectedItems(query);
      navigate(`/order/checkout?order_id=${response.data}`);
    } catch(err) {
      alert("주문에 실패했습니다");
      console.log(err);
    }
  }

  return (
    <>
      {!data.data.items.length && <Alert variant="warning">장바구니가 비었습니다</Alert>}
      {data.data.items.length>0 && (
        <>
          <table className="table table-border">
            <tbody>
            {
              items.map(item=>{
                return (
                  <tr key={item.id}>
                    <td><input type='checkbox' value={item.id} onChange={handleChange} /></td>
                    <td><img src={item.image} style={{height:120}} /></td>
                    <td>{item.name}</td>
                    <td>
                      <button disabled={item.quantity==1} onClick={()=>decreaseQuantity(item.id)} className="btn btn-primary">-</button>
                      <span style={{fontWeight:'bold'}}> {item.quantity} </span>
                      <button onClick={()=>increaseQuantity(item.id)} className="btn btn-primary">+</button>
                    </td>
                    <td>
                      {item.totalPrice}원
                    </td>
                    <td>
                      <button onClick={()=>removeItem(item.id)} className="btn btn-danger">삭제</button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          <div>최종결계예상금액:{cartTotalPrice}원</div>
          <div >
            <button onClick={removeSelectedItems} className="btn btn-warning">선택 삭제</button>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-success" onClick={orderSelectedItems}>선택 주문</button>
          </div>
        </>
      )}
    </>
  )
}

export default CartList
