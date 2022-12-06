import React from 'react'
import CategoryRow from "components/Dashboard/CategoryRow"
import { Table } from "reactstrap"
import withCatList from 'components/hoc/withCatList'
import Loader from 'components/UI/Loader'
import ErrorMsg from 'components/UI/ErrorMsg'
import InfoMsg from 'components/UI/InfoMsg'
const CatList = ({ data, isLoading, isError ,opened,deleted}) => {
  let content = null
  if (isLoading) {
    content= <Loader />
  }
  if (isError) {
    content= <ErrorMsg msg={'Network Error or Something went wrong!'} />
  }
  if (data && !data.length) {
    content= <InfoMsg msg='No Catagories found!' />
  }
  if(data && data.length){
    content =(
      <Table striped responsive >
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat, i) => (
            <CategoryRow id={cat._id} deleted={()=>deleted(cat._id)}  clicked={()=>opened(cat._id)} key={cat._id} i={i + 1} label={cat.name} />
          ))}
  
        </tbody>
      </Table>
    )
  }
  return  content
}

export default withCatList(CatList)