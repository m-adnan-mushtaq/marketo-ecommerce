import { useGetAdminCatsQuery } from 'store/api/adminApi'
import { useSelector } from 'react-redux'
import {  selectUserId } from 'store/reducer/authReducer'
import Loader from 'components/UI/Loader'
import ErrorMsg from 'components/UI/ErrorMsg'
import InfoMsg from 'components/UI/InfoMsg'

const withCatList=(WrappedComponent)=>props=>{
    const id = useSelector(selectUserId)
    const {data,isError,isLoading} = useGetAdminCatsQuery(id)
    if(isLoading){
        return <Loader/>
    }
    if(isError){
        return <ErrorMsg msg={'Network Error or Something went wrong!'} />
    }
    if(data && !data.length){
        return <InfoMsg msg='No Catagories found!' />
    }
    if(data && data.length){
        return <WrappedComponent 
                {...props}
                cats={data}
                />
    }
    return null
}


export default withCatList