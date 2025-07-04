function OrderList() {
  const {data, error, isLoading} = useSWR('orderList', ()=>fetchOrderList(), { revalidateOnFocus: false} );
  
  if(isLoading)  return <LoadingSpinner />;
  if(error) return <Alert variant='danger'>오류 발생</Alert>;

  return (
    <div>
      
    </div>
  )
}

export default OrderList