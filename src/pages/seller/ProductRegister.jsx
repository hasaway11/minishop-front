import 'react-quill-new/dist/quill.snow.css';
import './ProductRegister.css';

import { useState } from "react";
import ImageSelector from "../../components/product/ImageSelector"
import useInput from "../../hooks/useInput";
import TextField from "../../components/common/TextField";
import { readMinorCategory, registerProduct } from "../../utils/product-api ";
import { useNavigate } from "react-router-dom";
import { AsyncStatus, modules } from "../../utils/constants";
import ReactQuill from "react-quill-new";
import BlockButton from "../../components/common/BlockButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useSWR from 'swr';
import { Alert } from 'react-bootstrap';


function ProductRegister() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [images, setImages] = useState([null, null, null]);
  const [content, setContent] = useState('');
  const {data, error, isLoading } = useSWR('category', ()=>readMinorCategory(), { revalidateOnFocus: false} );

  const vName = useInput();
  const vPrice = useInput();
  const vStock = useInput();
  const vCategory = useInput()

  const handleRegister=async()=>{
    if(status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    if(images[0]===null) {
      alert('이미지를 1개이상 등록하세요');
      setStatus(AsyncStatus.IDLE);
      return;
    }

    const r1 = vName.onBlur();
    const r2 = vPrice.onBlur();
    const r3 = vStock.onBlur();
    const r4 = vCategory.onBlur();
    if(!(r1 && r2 && r3 && r4)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    const formData = new FormData();
    for(const image of images) {
      if(image!==null)
        formData.append('images', image);
    } 
    formData.append('name', vName.value);
    formData.append('info', content);
    formData.append('price', vPrice.value);
    formData.append('stock', vStock.value);
    formData.append('category', vCategory.value);
    try {
      await registerProduct(formData);
      setStatus(AsyncStatus.SUCCESS);
      navigate("/")
    } catch(err) {
      setStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  return (
    <div>
      <ImageSelector images={images} setImages={setImages}/>
      <TextField label='상품명' name='title' {...vName} />
      <TextField label='가격' name='price' {...vPrice} />
      <TextField label='재고' name='stock' {...vStock} />
      <div className="mt-3 mb-3">
        <label htmlFor='category' className='form-label'>카테고리:</label>
        <select className="form-control" onChange={vCategory.onChange} onBlur={vCategory.onBlur} defaultValue="">
          <option value="" disabled>카테고리를 선택하세요</option>
          {
            data.data.map(c=><option key={c.id} value={c.id}>{c.name}</option>)
          }
        </select>
        {vCategory.message!=='' && <span style={{color:'red'}}>{vCategory.message}</span>}
      </div>
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label="상품 등록" onClick={handleRegister} styleName='primary' />
    </div>
  )
}

export default ProductRegister