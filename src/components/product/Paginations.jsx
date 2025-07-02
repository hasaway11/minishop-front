import { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Paginations({pageno, totalcount, pagesize, blocksize, url}) {
  const [pages, setPages] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const numberOfPage = Math.floor((totalcount-1)/pagesize + 1);
    const prev = Math.floor((pageno-1)/blocksize) * blocksize;
    const start = prev + 1;
    let end = prev + blocksize;
    let next = end + 1;
    if(end>=numberOfPage) {
      end = numberOfPage;
      next = 0;
    }
    const pageItem=[];
    for(let i=start; i<=end; i++)
      pageItem.push(i);
    setPages({prev, pageItem, next});
  }, []);

  const move = (pageno) => navigate(`${url}?pageno=${pageno}`);

  if(pages===null) return; 
  const {prev, pageItem, next} = pages;

  return (
    <Pagination style={{justifyContent:'center'}} className="mt-5">
      {prev>0 && <Pagination.Item onClick={()=>move(prev)}>이전으로</Pagination.Item>}
      {
        pageItem.map(i => (<Pagination.Item key={i} active={pageno===i} onClick={()=>move(i)}>{i}</Pagination.Item>))
      }
      {next>0 && <Pagination.Item onClick={()=>move(next)}>다음으로</Pagination.Item>}
    </Pagination>
  );
}

export default Paginations