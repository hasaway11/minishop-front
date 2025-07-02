import { Alert } from "react-bootstrap";
import { convertToInt } from "../../utils/constants";
import { readProduct } from "../../utils/product-api";
import { Navigate, useSearchParams } from "react-router-dom";

import useSWR from "swr";
import DOMPurify from 'dompurify';
import ReviewList from "../../components/review/ReviewList";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function View() {
  const [params] = useSearchParams();
  let id = convertToInt(params.get('id'), null);
  const {data, error, isLoading } = useSWR(['product', id], ()=>readProduct(id), { revalidateOnFocus: false} );

  if (!id) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>선택하신 상품이 존재하지 않습니다</Alert>;
  
  const {images, info, name, price, productId, reviewCount, star, stock, reviews} = data.data;
  return (
    <div>
      <>
        {
          images && images.map((image,idx)=><img key={idx} style={{width:200}} src={image} />) 
        }
        <div className="read-title mb-2">{name}</div>
        <div className="mb-3" style={{display:'flex', justifyContent:'space-between'}}>
          <span className='read-value'>{data.writer}</span>
          <span className='read-value'> | </span>
          <span className="read-key">상품번호 </span>
          <span className='read-value'>{id}</span>
          <span className='read-value'> | </span>
          <span className='read-value'>{price}원</span>
          <span className='read-value'> | </span> 
          <span className="read-key">리뷰</span>
          <span className='read-value'>{reviewCount}</span>
          <span className='read-value'> | </span> 
          <span className="read-key">평가 </span>
          <span className='read-value'>{star}</span>
        </div>            
        <div style={{minHeight:"600px", backgroundColor:'#f1f1f1', padding:'5px'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info) }} />
        {
          reviews && <ReviewList reviews={reviews} />
        }
      </>
    </div>
  )
}

export default View