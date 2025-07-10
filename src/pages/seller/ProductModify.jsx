import { useState } from "react";
import useInput from "../../hooks/useInput";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import useSWR from "swr";
import { convertToInt } from "../../utils/constants";
import { Alert } from "react-bootstrap";
import TextField from "../../components/common/TextField";
import ReactQuill from "react-quill-new";
import BlockButton from "../../components/common/BlockButton";


function ProductModify() {
 // 필요한 기능 가져오기(작성 상태, 제목 커스텀 훅, 내용 상태, 라우팅, 로그인 이름)
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const vPrice = useInput();
  const vStock = useInput();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const username = useAuthStore(state=>state.username);
 
  // pno 파라미터를 읽어와 post를 fetch
  const [params] = useSearchParams();
  let productId = convertToInt(params.get('product_id'), null);
  const {data, error, isLoading } = useSWR(['productId', productId], ()=>read(productId));

  // 변경할 수 있는 제목과 내용 상태를 변경
  useEffect(() => {
    if (data) {
      vPrice.setValue(data.price);
      vStock.setValue(data.stock);
      setInfo(data.info);
    }
  }, [data]);

  // 글 변경
  const handleUpdate =async()=>{
    if (status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = vPrice.onBlur();
    const r2 = vStock.onBlur();
    if(!(r1 && r2)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    
    try {
      const requestForm = {productId, price:vPrice, stock:vStock.value, info:content};
      await update(requestForm);
      setStatus(AsyncStatus.SUCCESS);
      navigate(`/seller/product/view?product_id=${pnoductId}`);
    } catch(err) {
      setStatus(AsyncStatus.FAIL)
    } 
  }

  // 6.  조건 렌더링(conditional rendering)
  if (!productId) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>
  
  return (
    <>
      <TextField label='가격' name='price' {...vPrice} />
      <TextField label='재고' name='stock' {...vStock} />
      <ReactQuill theme="snow" name="content" modules={{modules}}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label="변경하기" onClick={handleUpdate} styleName='primary'/>
    </>
  )
}

export default ProductModify
