import useSWR from "swr"
import { fetchOrderList } from "../../utils/order-api"
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";


function OrderElement({order}) {
  const {id,status, orderTime, name, count} = order;
  return (
    <>
      {status==='COMPLETE' && <Alert variant="seconary">주문번호 {order.id} - 배송완료 ({orderTime})</Alert>}
      {status==='SHIPPING' && <Alert variant="primary">주문번호 :{order.id} - 배송중 {orderTime} 주문</Alert>}
      {status==='PAY' && <Alert variant="success">주문번호 {order.id} - 결제완료 : {orderTime} 주문</Alert>}
      <div style={{textAlign:'right'}}>
        {name}외 {count}건 <Link to={`/mypage/orders/view?id=${id}`}>전제 상품보기</Link>
      </div>
      <hr/>
    </>
  )
}

function MyOrderList() {
  const {data, error, isLoading} = useSWR("orders", ()=>fetchOrderList());

  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;

  const orderList = data.data;
  console.log(orderList);
  return (
    <div>
      <hr/>
      {
        orderList.map(order=>{
          return(
            <OrderElement key={order.id} order={order} />
          )
        })
      }
    </div>
  )
}

export default MyOrderList
