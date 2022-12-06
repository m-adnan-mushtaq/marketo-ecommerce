import {PaginationItem,PaginationLink} from "reactstrap"
const PageBtn = ({active,label,clicked}) => {
  return (
    <PaginationItem  onClick={clicked} active={active} className={`${active && 'bg-primary text-light'} shadow mx-1 `}>
    <PaginationLink tag={'button'} className={active ? 'text-light':''}  >
      {label}
    </PaginationLink>
  </PaginationItem>
  )
}

export default PageBtn