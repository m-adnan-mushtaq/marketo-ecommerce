import ErrorMsg from "components/UI/ErrorMsg"
import Loader from "components/UI/Loader"

const withQuery=(WrappedComponent,queryHook)=>props=>{
    const {data,isError,isLoading,isSuccess} = queryHook()
    if(isLoading){
        return <Loader/>
    }
    if(isError){
        return <ErrorMsg msg={'Network Error, Failed to make request'} />
    }
    if(isSuccess && data){
        return <WrappedComponent 
                {...props}
                data={data}
                />
    }
    return null
}


export default withQuery