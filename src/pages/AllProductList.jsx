import { useSearchParams } from "react-router-dom"
import useSWR from "swr";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { readProducts } from "../utils/product-api ";
import Item from "../components/product/Item";
import Paginations from "../components/product/Paginations";

function AllProductList() {
  const [params] = useSearchParams();
  let pageno = params.get('pageno')==null? 1:parseInt(params.get('pageno'));
  const {data, error, isLoading} = useSWR(['products', pageno], ()=>readProducts(pageno), {revalidateOnFocus: false});

  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

  const {contents, pagesize, totalCount} = data.data;

  return (
    <>
      <div style={{display:'flex', flexWrap:'wrap', gap:35, padding:'0 35px'}}>
        {
          contents.map(product=><Item key={product.id} product={product} />)
        }
      </div>
      <Paginations pageno={pageno} pagesize={pagesize} totalcount={totalCount} blocksize={5} url="/"/>
    </>
  )
}

export default AllProductList