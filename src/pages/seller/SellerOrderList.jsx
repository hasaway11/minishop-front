import useSWR from "swr"
import { fetchSellerOrderList, updateSellerOrderStatus } from "../../utils/order-api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { useState } from "react";

function SellerOrderList() {
  const [ids, setIds] = useState([]);
  const {data, error, isLoading} = useSWR(["sellerOrderList"], ()=>fetchSellerOrderList());

  const handleChange=(e)=>{
    const id = e.target.dataset.id;
    const pid = e.target.dataset.pid;
    if(e.target.checked) {
      setIds(prev=>[...prev, {id:id, productId:pid}]);
    } else {
      setIds(prev=>prev.filter(el=>!(el.id==id&&el.productId==pid)))
    }
  };

  const handleBtnClick=async()=>{
    try {
      await updateSellerOrderStatus(ids);
    } catch(err) {
      console.log(err);
    }
  }



  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  const orderList = data.data;

  console.log(ids);
  return (
    <>
      <table className="table table-border">
        <thead>
          <tr>
            <th></th>
            <th>주문시간</th>
            <th></th>
            <th>상품명</th>
            <th>가격</th>
            <th>주문개수</th>
            <th>주문상태</th>
          </tr>
        </thead>
        <tbody>
          {
            orderList.map((order,idx)=>{
              return (
                <tr key={idx}>
                  <td><input type="checkbox" data-id={order.orderId} data-pid={order.productId} onChange={handleChange} /></td>
                  <td>{order.orderAt}</td>
                  <td><img src={order.image} style={{height:100}}/></td>
                  <td>{order.productName}</td>
                  <td>{order.productPrice}원</td>
                  <td>{order.quantity}개</td>
                  <td>{order.status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <button onClick={handleBtnClick}>업데이트</button>
    </>
  )
}

export default SellerOrderList