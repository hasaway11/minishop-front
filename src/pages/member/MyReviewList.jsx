import useSWR from "swr"
import { fetchMyReviws } from "../../utils/review-api"
import { Alert } from "react-bootstrap";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ratingMessage } from "../../utils/constants";

function Review({writeTime, image, name, rating, content}) {
  const getStars=(rating)=>{
    const stars = [];
    for(let i=1; i<=5; i++) {
      if(i<=rating)
        stars.push(<FaStar style={{fontSize:25, marginRight:10, color:'red'}} />);
      else
        stars.push(<FaRegStar style={{fontSize:25, marginRight:10}} />);
    }
    return stars;
  }

  return (
    <>
      <hr/>
        <div>{writeTime}</div>
        <div style={{border:'1px solid #f1f1f1'}}>
          <img src={image} style={{height:120}} /> {name}
        </div>
        <div>
          {getStars(rating)} ({ratingMessage[rating-1]})
        </div>
        <div style={{backgroundColor:'#fafafa', height:100}}>
          {content}
        </div>
      <hr/>
    </>
  )
}

function MyReviewList() {
  const {data, error, isLoading} = useSWR('reviews', ()=>fetchMyReviws(), {revalidateOnFocus: false}) 

  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;
  const reviews = data.data;

  return (
    <div style={{width:600, margin:'0 auto'}}>
      {
        reviews.map(review=><Review {...review} />)
      }    
    </div>
  )
}

export default MyReviewList
