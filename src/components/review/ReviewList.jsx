import { Button } from "react-bootstrap";
import { useAuthStore } from "../../stores/useAuthStore";
import { requestDeleteAndFetchNewReviews } from "../../utils/review-api";
import { mutate } from "swr";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ratingMessage } from "../../utils/constants";

function ReviewList({reviews, productId}) {
	const loginId = useAuthStore(state=>state.username);
	const onRemove = async (id)=>{
		try {
			const data = await requestDeleteAndFetchNewReviews(id);
			mutate(['product', productId], (prev)=>{
				if(!prev) return prev;
				return {...prev, reviews:data};
			}, false)
		} catch(err) {
			console.log(err);
		}
	}

	const getStars=(rating)=>{
		const stars = [];
		for(let i=1; i<=5; i++) {
			if(i<=rating)
				stars.push(<FaStar style={{fontSize:15, marginRight:5, color:'red'}} />);
			else
				stars.push(<FaRegStar style={{fontSize:15, marginRight:5}} />);
		}
		return stars;
	}

  return (
		<>
		{
			reviews.map(review=>{
				return (
					<div key={review.id} className='mt-2 mb-2'>
						<div> {getStars(review.rating)} ({ratingMessage[review.rating-1]}) </div>
						<div className='upper'style={{display:"flex", justifyContent: "space-between"}}>
							<div>
								<strong>{review.writer}</strong>&nbsp;&nbsp;
								{
									(review.writer===loginId) && <Button variant="outline-danger" size="sm" onClick={()=>onRemove(review.id)}>삭제</Button>
								}			
							</div>
						<div>{review.writeTime}</div>	
						</div>
						<div className='lower'>{review.content}</div>
						<hr />
					</div>	
				)			
			})
		}
		</>
  )
}

export default ReviewList