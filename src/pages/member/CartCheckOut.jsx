import useSWR from "swr";
import { createOrder, fetchOrderCheck } from "../../utils/order-api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import BlockButton from "../../components/common/BlockButton";

function CartCheckOut() {
  const [searchParams] = useSearchParams();
  const tempOrderId = searchParams.get('order_id');
  const navigate = useNavigate();

  const postcodeRef = useRef(null);
  const roadAddressRef = useRef(null);
  const address2 = useRef(null);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        postcodeRef.current.value = data.zonecode;
        roadAddressRef.current.value = data.roadAddress;
      },
    }).open();
  };

  const handleOrder=async ()=>{
    if(roadAddressRef.current.value==='' || address2.current.value==='') {
      alert('배송지를 검색하세요')
    }
    const address = roadAddressRef.current.value + " " + address2.current.value;
    const zipcode = postcodeRef.current.value;
    const id = tempOrderId;
    try {
      const orderId = await createOrder({id, zipcode, address});
      navigate(`/member/order?id=${orderId}`, {replace:true});
      return;
    } catch(err) {
      console.log(err);
    }
  }

  const {data, error, isLoading} = useSWR('checkout', ()=>fetchOrderCheck(tempOrderId), { revalidateOnFocus: false} );

  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;

  const {orderTotalPrice, orders} = data.data;

  return (
    <>
      <div className="mt-3 mb-3">
        <button className="btn btn-dark" onClick={handleAddressSearch}>배송주소 검색</button>
        <div>
          <div className="mt-3 mb-3">
            <label className="form-label">우편번호</label>
            <input className="form-control" ref={postcodeRef} placeholder="주소를 검색하세요" disabled />
          </div>
          <div className="mt-3 mb-3">
            <label className="form-label">주소</label>
            <input className="form-control" ref={roadAddressRef} placeholder="주소를 검색하세요" disabled />
          </div>
          <div className="mt-3 mb-3">
            <label htmlFor="address2" className="form-label">상세 주소</label>
            <input className="form-control" name="address2" ref={address2} placeholder="검색 후 상세주소 입력..." />
          </div>
        </div>
      </div>        
      <hr/>
      <div className='mt-3 mb-3'>
        <Alert variant="success">주문상품 {orders.length}개</Alert>
        <table className="table table-border">
          <tbody>
            {
              orders.map((item,idx)=>{
                return (
                  <tr key={idx}>
                    <td><img src={item.image} style={{height:120}} alt={item.name} /></td>
                    <td className='align-middle'>{item.name} (수량:{item.quantity}개)</td>
                    <td className='align-middle'>{item.totalPrice}원</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='3' > 
                <h5 style={{textAlign:'right'}}>총 주문금액 {orderTotalPrice}원</h5>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <BlockButton label="주문하기" onClick={handleOrder} styleName='primary' />
    </>
  )
}

export default CartCheckOut