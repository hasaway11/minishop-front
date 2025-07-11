import { Navigate, useSearchParams,  } from "react-router-dom";
import { convertToInt, modules } from "../../utils/constants";
import useSWR from "swr";
import { readMyProduct } from "../../utils/product-api ";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import ImageSelector from "../../components/product/ImageSelector";
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';

function SellerProductView() {
  // const navigate = useNavigate();
  const [params] = useSearchParams();
  let productId = convertToInt(params.get('id'), null);
  const [images, setImages] = useState([null, null, null]);
  const {data, error, isLoading } = useSWR(['product', productId], ()=>readMyProduct(productId), { revalidateOnFocus: false} );

  useEffect(()=>{
    if(!data)
      return;
    const ar = [null, null, null];
    let idx=0;
    for(const image of data.images) {
      ar[idx] = image.name;
    }
    setImages(ar);
  }, [data]);

  if (!productId) return <Navigate to="/" replace />;
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>상품 정보를 읽을 수 없습니다</Alert>;

  return (
    <div>
      <ImageSelector images={images} setImages={setImages} readonly={true} />
      <div className="mt-3 mb-3">
        <hr/>
      </div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.info) }}></div>
    </div>
  )
}

export default SellerProductView