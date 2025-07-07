import useSWR from 'swr';
import { fetchOrderDetail } from '../../utils/order-api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function MyOrderView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  
  const {data, error, isLoading} = useSWR("order", ()=>fetchOrderDetail(id));

  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;

  console.log(data.data);
  const {address, orderAt, devliveryAt, orderTotalPrice, status, orderItems} = data.data;

  return (
    <div>
      <Alert variant='success'>주문일:{orderAt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주문금액:{orderTotalPrice}원</Alert>
      {status==='PAY' && <Alert variant='primary'>배송지 : {address} (결제 완료)</Alert>}
      {status==='SHIPPING' && <Alert variant='primary'>배송지 : {address} (배송중)</Alert>}
      {status==='COMPLETE' && <Alert variant='primary'>배송지 : {address} (배송완료)</Alert>}
      {status==='COMPLETE' && <Alert variant='primary'>배송완료시간 : {devliveryAt} </Alert>}
      <table className="table table-border">
        <tbody>
          {
            orderItems.map((item,idx)=>{
              return (
                <tr key={idx}>
                  <td><img src={item.image} style={{height:120}} /></td>
                  <td className='align-middle'>{item.name} (수량:{item.quantity}개)</td>
                  <td className='align-middle'>{item.totalPrice}원</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default MyOrderView
