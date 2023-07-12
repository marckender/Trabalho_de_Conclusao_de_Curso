import Hero from "../../../template/Home/Hero";
import PopularProducts from "../../../template/Home/PopularProducts";
import { PageDefault } from "../PageDefault";


export default function HomePage() {
  const cards = [
    {
      title: 'Card 1',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Description for Card 1',
    },
    {
      title: 'Card 2',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Description for Card 2',
    },
    {
      title: 'Card 3',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Description for Card 3',
    },
    {
      title: 'Card 4',
      image: 'https://i.imgur.com/lYKm8Wf.png',
      description: 'Description for Card 4',
    },
  ];
  return (
    <PageDefault>
      <Hero />
      <br />
      <PopularProducts cards={cards} />
    
    <br />
    </PageDefault>
  )
}
