import useSWR from "swr"
import { fetchOrderList } from "../../utils/order-api"
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";


function OrderElement({order}) {
  console.log(order);
  const {id,orderTotalPrice, orderAt, name, count} = order;
  return (
    <>
      <Alert variant="secondary">주문 - {orderAt} (결제금액 {orderTotalPrice}원)</Alert>
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
