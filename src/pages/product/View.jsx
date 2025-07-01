import { Navigate, useSearchParams } from "react-router-dom";
import { convertToInt } from "../../utils/constants";
import useSWR from "swr";
import ReviewList from "../../components/review/ReviewList";
import { Alert } from "bootstrap";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { readProduct } from "../../utils/product-api ";
import DOMPurify from 'dompurify';

function View() {
  const [params] = useSearchParams();
  let id = convertToInt(params.get('id'), null);
  const {data, error, isLoading } = useSWR(['product', id], ()=>readProduct(id), { revalidateOnFocus: false} );

  if (!id) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>선택하신 상품이 존재하지 않습니다</Alert>;

  return (
    <div>
      <>
        <div className="read-title mb-2">{data.name}</div>
        <div className="mb-3" style={{display:'flex', justifyContent:'space-between'}}>
          <div>
            <span className='read-value'>{data.writer}</span>
            <span className='read-value'> | </span>
            <span className="read-key">상품번호 </span>
            <span className='read-value'>{data.productId}</span>
            <span className='read-value'> | </span>
            <span className='read-value'>{data.price}원</span>
            <span className='read-value'> | </span> 
            <span className="read-key">구매</span>
            <span className='read-value'>1234</span>
            <span className='read-value'> | </span> 
            <span className="read-key">평가 </span>
            <span className='read-value'>4.8</span>
          </div>
          <div style={{minHeight:"600px", backgroundColor:'#f1f1f1', padding:'5px'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.info) }} />
        </div>
      </>
      <ReviewList reviews={data.reviews} />
    </div>
  )
}

export default View