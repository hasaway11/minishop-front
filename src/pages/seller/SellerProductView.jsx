import { Navigate, useNavigate, useSearchParams,  } from "react-router-dom";
import { AsyncStatus, convertToInt, modules } from "../../utils/constants";
import useSWR from "swr";
import { readMyProduct, updateProduct } from "../../utils/product-api ";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import BlockButton from "../../components/common/BlockButton";

function SellerProductView() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [content, setContent] = useState('');
  const [newStock, setNewStock] = useState('');
  let productId = convertToInt(params.get('id'), null);


  const {data, error, isLoading } = useSWR(['product', productId], ()=>readMyProduct(productId), { revalidateOnFocus: false} );
  
  useEffect(()=>{
    if(!data)
      return;
    setContent(info);
    setNewStock(stock);
  }, [data]);

  const handleUpdate =async()=>{
    if (status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if(newStock==='') {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    
    try {
      const requestForm = {id:productId, stock:newStock, info:content};
      await updateProduct(requestForm);
      setStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setStatus(AsyncStatus.FAIL)
    } 
  }

  if (!productId) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>상품 정보를 읽을 수 없습니다</Alert>;

  const {images, name, info, rating, reviewCount, salesAmount, salesCount, stock} = data;

  return (
    <div style={{padding:30}}>
      <table className="table table-border">
        <tbody>
          <tr>
            <td>{images[0] && <img src={images[0].name} style={{width:120}} alt='상품이미지1' />}</td>
            <td>{images[1] && <img src={images[1].name} style={{width:120}} alt='상품이미지2' />}</td>
            <td>{images[2] && <img src={images[2].name} style={{width:120}} alt='상품이미지3'/>}</td>
          </tr>
          <tr>
            <td>{name}</td>
            <td>평가 : {rating}점</td>
            <td>리뷰 : {reviewCount}개</td>
          </tr>
          <tr>
            <td>판매량 : {salesCount}원</td>
            <td>판매금액 : {salesAmount}원</td>
            <td>재고 : <input value={newStock} onChange={(e)=>setNewStock(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label="상품 등록" onClick={handleUpdate} styleName='primary' />
    </div>
  )
}

export default SellerProductView