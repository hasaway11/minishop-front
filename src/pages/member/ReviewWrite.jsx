import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import useSWR from "swr";
import { createReview, fetchProductSummaryByOrderItemId } from "../../utils/review-api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import BlockButton from "../../components/common/BlockButton";
import { useSearchParams } from "react-router-dom";


function MyStar({jumsu, handleClick}) {
  return (
    <FaStar style={{fontSize:35, marginRight:15}} onClick={()=>handleClick(jumsu)} />
  )
}

function MyRegStar({jumsu, handleClick}) {
  return (
    <FaRegStar style={{fontSize:35, marginRight:15}} onClick={()=>handleClick(jumsu)} />
  )
}


function ReviewWrite() {
  const [searchParams] = useSearchParams();
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState([]);
  const [content, setContent] = useState('');
  const [length, setLength] = useState(0);
  const orderItemId = searchParams.get('id');

  const {data, error, isLoading} = useSWR('product', ()=>fetchProductSummaryByOrderItemId(orderItemId));

  useEffect(()=>{
    const ar = [];
    for(let i=1; i<=5; i++) {
      if(i<=rating)
        ar.push(<MyStar key={i} jumsu={i} handleClick={setRating} />);
      else
        ar.push(<MyRegStar key={i} jumsu={i} handleClick={setRating} />);
    }
    setStars(ar);
  },[rating]);

  const handleChange=(e)=>{
    setContent(e.target.value);
    setLength(e.target.value.length);
  }

  const handleSubmit=()=>{
    if(rating==0) {
      alert('별점을 선택하세요');
      return;
    }
    if(length<10) {
      alert('리뷰는 10글자이상입니다');
      return;
    }
    
    const params = {orderItemId, content, rating, productId};
    createReview(params).then(res=>console.log(res)).catch(err=>console.log(err));
  }

  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  const {productId, productName, image} = data.data;

  return (
    <div style={{width:600, margin:'0 auto'}}>
      <table className='table table-bordered'>
        <tbody>
          <tr>
            <td style={{textAlign:'center'}}>
              <img src={image} style={{height:100}} />
              <span>{productName}</span>
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'center'}}>
              <h4>상품에 만족하셨나요?</h4>
              <div className="mt-3 mb-3">
              { stars.map(star=>star) }
              </div>
              <h6>별점을 선택해주세요<span style={{color:'red'}}>필수 선택</span></h6>            
            </td>
          </tr>
          <tr>
            <td>
              <label>리뷰를 남겨주세요</label>
              <div style={{position:'relative'}}>
                <textarea className="form-control" rows="5" onChange={handleChange} placeholder="자세한 리뷰는 다른 고객님들의 구매에 큰 도움이 됩니다 (최소 10자이상 입력)"></textarea>
                <span style={{position:'absolute', right:20, bottom: 20}}>{length}/200</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <BlockButton label='작성하기' styleName='dark' onClick={handleSubmit} />
    </div>
  )
}

export default ReviewWrite