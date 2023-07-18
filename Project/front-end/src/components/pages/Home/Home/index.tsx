import { useEffect } from "react";
import Categories from "../../../template/Home/Categories";
import Hero from "../../../template/Home/Hero";
import PopularProducts from "../../../template/Home/PopularProducts";
import { PageDefault } from "../PageDefault";
import { useProductContext } from "../../../../contexts/useProductContext";


export default function HomePage() {

  const {products, getProducts} = useProductContext()
  useEffect(() => {
    getProducts();
  }, [])
  
  return (
    <PageDefault>
      <Hero />
      <br />
      <PopularProducts cards={products} />

      <Categories />
    
    <br />
    </PageDefault>
  )
}
