import useSWR from 'swr';
import { fetchOrderDetail } from '../../utils/order-api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BlockButton from '../../components/common/BlockButton';

function MyOrderView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  
  const {data, error, isLoading} = useSWR("order", ()=>fetchOrderDetail(id));

  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;
  const {address, orderAt, orderTotalPrice, orderItems} = data.data;
  
  return (
    <div>
      <Alert variant='success'>주문일:{orderAt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주문금액:{orderTotalPrice}원</Alert>
      <Alert variant='dark'>배송지 : {address}</Alert>
      <table className="table table-border">
        <thead>
          <tr>
            <th colSpan='2' className='text-center'>상품</th>
            <th className='text-center'>수량</th>
            <th className='text-center'>가격</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            orderItems.map((item,idx)=>{
              return (
                <tr key={idx}>
                  <td><img src={item.image} style={{height:120}} /></td>
                  <td className='align-middle'>{item.name} {item.quantity}개</td>
                  <td className='align-middle'>{item.totalPrice}원</td>
                  <td className='align-middle text-center'>
                    {item.status==='PAY' && "결제완료"}
                    {item.status==='SHIPPING' && "배송중"}
                    {item.status==='COMPLETE' && "배송완료"}&nbsp;&nbsp;&nbsp;
                    {item.reviewWritable && <button className='btn btn-dark' onClick={()=>navigate(`/mypage/review/write?id=${item.id}`)}>리뷰쓰기</button> }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <BlockButton label='목록으로' onClick={()=>navigate('/mypage/orders')} styleName='primary' />
    </div>
  )
}

export default MyOrderView
