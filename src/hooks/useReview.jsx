import { writeReview } from "../utils/product-api ";
import { removeReview} from "../utils/product-api ";

function useReview() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e=>setValue(e.target.value);

  const onBlur=()=>{
    setMessage('');
    if(value!=='')
      return true;
    setMessage('필수입력입니다');
    return false;
  }

  const update=(productId, newComments)=>{
    mutate(['productId', productId], (prevData) => {
      if (!prevData) 
        return prevData;
      return {...prevData, comments: newComments };
    }, false);
  }

  const onWrite=async(productId)=>{
    const result = onBlur();
    if(!result) 
      return;
    const requestForm =  {productId: productId, content:value};
    try {
      const response = await writeReview(requestForm);
      update(productId, response.data);
      setValue('');
    } catch(err) {
      console.log(err);
    }
  }

  const onRemove=async(commentId, productId)=>{
    try {
      const response = await removeReview(commentId, productId);
      update(productId, response.data);
    } catch(err) {
      console.log(err);
    }
  }

  return {value, setValue, message, onBlur, onChange, onRemove, onWrite};
}

export default useReview