import { Alert } from "react-bootstrap";
import { convertToInt } from "../../utils/constants";
import { Link, Navigate, useSearchParams } from "react-router-dom";

import useSWR from "swr";
import DOMPurify from 'dompurify';
import ReviewList from "../../components/review/ReviewList";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { readProduct } from '../../utils/product-api '
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

function View() {
  const [params] = useSearchParams();
  let id = convertToInt(params.get('id'), null);
  const {data, error, isLoading } = useSWR(['product', id], ()=>readProduct(id), { revalidateOnFocus: false} );
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (data?.images?.length > 0) {
      setImage(data.images[0]);
    }
  }, [data]);

  if (!id) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>선택하신 상품이 존재하지 않습니다</Alert>;
  
  const {seller, info, name, price, productId, reviewCount, rating, stock, reviews, images} = data;


  return (
    <div>
      <div style={{ display: 'flex', width:1060, backgroundColor:'#fafafa', marginTop:30 }}>
        <div style={{ width:450}}>
          <img src={image} style={{width:400}} />
        </div>
        <div style={{ width:160}}>
          {
            images.map((i,idx)=><img key={idx} onClick={()=>setImage(i)} style={{width:120, marginBottom:20, border: i===image ? '1px solid red' : 'none'}} src={i} />) 
          }
        </div>
        <div style={{ width:450, height:400}} className='column'>
          <div style={{height:'20%'}}>
            <h4><Link to='/seller/product/list'>{seller}</Link></h4>
          </div>
          <div style={{height:'20%'}}>
            <h4>{name}</h4>
          </div>
          <div style={{height:'20%'}}>
            {reviewCount > 0 && (<>
              <FaStar style={{ color: 'red' }} /> {rating} / ({reviewCount}건)
            </>)}
            {reviewCount==0 && <h5>고객 리뷰가 아직 없습니다</h5>}
          </div>
          <div style={{height:'20%'}}>
            <h3>{price}원</h3>
          </div>
          <div style={{height:'20%'}}>
            <button className='btn btn-danger' style={{width:400}}>장바구니 담기</button>
          </div>
        </div>
      </div>
      <div style={{minHeight:"600px", backgroundColor:'#f1f1f1', padding:'5px'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info) }} />
      {
        reviews && <ReviewList reviews={reviews} productId={id} />
      }
    </div>
  )
}

export default View