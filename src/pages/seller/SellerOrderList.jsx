import useSWR, { mutate } from "swr"
import { fetchSellerOrderList, updateToShipping } from "../../utils/order-api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { useState } from "react";

function SellerOrderList() {
  const [ids, setIds] = useState([]);
  const {data: orders, error, isLoading}  = useSWR(["sellerOrderList"], ()=>fetchSellerOrderList());

  const handleChange=(e)=>{
    if(e.target.checked) {
      setIds(prev=>[...prev, e.target.value]);
    } else {
      setIds(prev=>prev.filter(el=>el!==e.target.value))
    }
  }

  const handleBtnClick=async()=>{
    if(ids.length==0) {
      alert("주문을 선택하세요");
      return;
    }
    const query = ids.map(id => `ids=${id}`).join('&');
    try {
      const newOrders = await updateToShipping(query);
      mutate(["sellerOrderList"], newOrders, false); 
      setIds([]);
    } catch(err) {
      console.log(err);
    }
  }

  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  return (
    <>
      <table className="table table-border">
        <thead>
          <tr>
            <th></th>
            <th>주문번호</th>
            <th>상품명</th>
            <th>배송지</th>
            <th>고객</th>
            <th>주문일</th>
            <th>개수</th>
            <th>배송상태</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order,idx)=>{
              return (
                <tr key={idx}>
                  <td>
                    {order.status==='PAY' && <input type='checkbox' value={order.id} onChange={handleChange} />}
                  </td>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.address}</td>
                  <td>{order.orderer}</td>
                  <td>{order.orderAt}</td>
                  <td>{order.quantity}개</td>
                  <td>{order.status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={handleBtnClick} disabled={ids.length===0}>발송 처리</button>
    </>
  )
}

export default SellerOrderList