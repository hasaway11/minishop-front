import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import useSWR from "swr";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { readProductsBySeller } from "../../utils/product-api ";
import Paginations from "../../components/product/Paginations";
import Item from "../../components/product/Item";

function SellerProductList() {
  const {username} = useAuthStore();
  const [params] = useSearchParams();

  const pageno = params.get('pageno')==null? 1:parseInt(params.get('pageno'));
  const seller = params.get('seller');
  const {data, error, isLoading} = useSWR(['products', [pageno,seller]], ()=>readProductsBySeller(pageno, seller), {revalidateOnFocus: false});

  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  const {contents, pagesize, totalCount} = data.data;

  return (
    <>
      <div style={{display:'flex', flexWrap:'wrap', gap:35, padding:'0 35px'}}>
        {
          contents.map(product=><Item key={product.id} product={product} isOrderable={false} />)
        }
      </div>
      <Paginations pageno={pageno} pagesize={pagesize} totalcount={totalCount} blocksize={5} url="/seller/product/list" />
    </>
  )
}

export default SellerProductList