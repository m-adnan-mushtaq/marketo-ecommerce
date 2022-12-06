import withQuery from "components/hoc/withQuery"
import Category from "components/Layout/Category"
import Hero from "components/Layout/Hero"
import HotSale from "components/Layout/HotSale"
import { useGetHomePageDateQuery } from "store/api/storeApiSlice"

const Home = ({data}) => {
  // fetch data
  
  return (
    <>
        <Hero  cats={data.randomCats} />
        <Category products={data.topProducts} />
        <HotSale products={data.hotProducts} />
        
    </>
  )
}

export default  withQuery(Home,useGetHomePageDateQuery)