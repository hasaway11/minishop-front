import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { convertToInt } from "../../utils/constants";
import useSWR from "swr";
import ReviewList from "../../components/review/ReviewList";
import { Alert } from "bootstrap";
import { blockProduct } from "../../utils/product-api ";

function SellerView() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  let productId = convertToInt(params.get('product_id'), null);
  const {data, error, isLoading } = useSWR(['productId', productId], ()=>read(pno), { revalidateOnFocus: false} );

   const handleBlock = async () => {
    try {
      await blockProduct(productId);
      // mutate는 Promise 리턴 : 이 키에 해당하는 데이터를 다시 가져오고, 캐시에 반영될 때까지 기다려라
      await mutate(['productId', productId]); 
    } catch (err) {
      alert('작업이 실패했습니다');
    }
  };

  if (!productId) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>상품 정보를 읽을 수 없습니다</Alert>;

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
          <div className='mt-3 mb-3'>
            <Button variant="success" onClick={()=>navigate(`/seller/product/moodify?product_id=${productId}`)} className="me-3">변경으로</Button>
            <Button variant="danger" onClick={handleBlock}>비활성화</Button>
          </div>
        </div>
      </>
      <ReviewList reviews={data.reviews} />
    </div>
  )
}

export default SellerView