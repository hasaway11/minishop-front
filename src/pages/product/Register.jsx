import { useState } from "react";
import ImageSelector from "../../components/product/ImageSelector"
import useInput from "../../hooks/useInput";
import TextField from "../../components/common/TextField";
import { registerProduct } from "../../utils/product-api ";
import { useNavigate } from "react-router-dom";
import { AsyncStatus } from "../../utils/constants";


function Register() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [images, setImages] = useState([null, null, null]);

  const vName = useInput();
  const vPrice = useInput();
  const vStock = useInput();
  const vCategory = useInput()

  const isSubmitting = status === AsyncStatus.SUBMITTING;

  const handleRegister=async()=>{
    if(isSubmitting) return;
    setStatus(AsyncStatus.SUBMITTING);

    if(images[0]===null) {
      alert('이미지를 1개이상 등록하세요');
      return;
    }

    const r1 = vName.onBlur();
    const r2 = vPrice.onBlur();
    const r3 = vStock.onBlur();
    const r4 = vCategory.onBlur();
    if(!(r1 && r2 && r3 && r4)) 
      return;

    const formData = new FormData();
    for(const image of images) {
      if(image!==null)
        formData.append('images', image);
    } 
    formData.append('name', vName.value);
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

  return (
    <div>
      <ImageSelector images={images} setImages={setImages}/>
      <TextField label='상품명' name='title' {...vName} />
      <TextField label='가격' name='price' {...vPrice} />
      <TextField label='재고' name='stock' {...vStock} />
      <TextField label='카테고리' name='category' {...vCategory} />
      <ReactQuill theme="snow" name="content" modules={{modules}}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label={isSubmitting? "등록 중..." : "상품 등록"} onClick={handleRegister} styleName='primary' disabled={isSubmitting}/>
    </div>
  )
}

export default Register