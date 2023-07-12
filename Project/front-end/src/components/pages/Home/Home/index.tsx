import Categories from "../../../template/Home/Categories";
import Hero from "../../../template/Home/Hero";
import PopularProducts from "../../../template/Home/PopularProducts";
import { PageDefault } from "../PageDefault";


export default function HomePage() {
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
  return (
    <PageDefault>
      <Hero />
      <br />
      <PopularProducts cards={cards} />

      <Categories />
    
    <br />
    </PageDefault>
  )
}
