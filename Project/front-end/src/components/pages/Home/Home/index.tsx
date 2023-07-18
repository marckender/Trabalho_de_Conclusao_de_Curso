import { useEffect } from "react";
import Categories from "../../../template/Home/Categories";
import Hero from "../../../template/Home/Hero";
import PopularProducts from "../../../template/Home/PopularProducts";
import { PageDefault } from "../PageDefault";
import { useProductContext } from "../../../../contexts/useProductContext";


export default function HomePage() {

  const {products, getProducts} = useProductContext()

  const cards = [
    {
      title: 'Card 1',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Kinky Straight Short Bob Frontal Lace Wig',
    },
    {
      title: 'Card 2',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Kinky Straight Short Bob Frontal Lace Wig',
    },
    {
      title: 'Card 3',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Kinky Straight Short Bob Frontal Lace Wig',
    },
    {
      title: 'Card 4',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Kinky Straight Short Bob Frontal Lace Wig',
    },
  ];

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
