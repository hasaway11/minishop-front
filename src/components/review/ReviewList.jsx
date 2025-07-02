import { Button } from "react-bootstrap";
import { useAuthStore } from "../../stores/useAuthStore";

function ReviewList({reviews}) {
	const loginId = useAuthStore(state=>state.username);
	const {onRemove} = (id, productId)=>{}

  return (
		<>
		{
			reviews.map(review=>{
				return (
					<div key={review.id}>
						<div className='upper'style={{display:"flex", justifyContent: "space-between"}}>
							<div>
								<strong>{review.writer}</strong>&nbsp;&nbsp;
								{
									(review.writer===loginId) && <Button variant="outline-danger" size="sm" onClick={()=>onRemove(review.id, review.productId)}>삭제</Button>
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