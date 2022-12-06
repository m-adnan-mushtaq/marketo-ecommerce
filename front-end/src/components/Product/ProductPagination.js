import { Pagination } from 'reactstrap'

export const ProductPagination = ({total_pages,page,btn:Btn,setPage}) => {
  return (
    <Pagination>
      {(new Array(parseInt(total_pages)).fill('x')).map((_, i) => (
        <Btn
          key={i}
          label={i + 1}
          active={i + 1 === page}
          clicked={() => setPage(i + 1)}
        />
      ))}
    </Pagination>
  )
}
