import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'
interface PaggingSliderProps {
  images: string[] | undefined;
}

const PaggingSlider: React.FC<PaggingSliderProps> =({images}) =>{
  const [slideIndex, setSlideIndex] =useState(1);
  const [, setWidth] =useState(0);
  const [start, setStart] =useState(0);
  const [change, setChange] =useState(0);
  const counts: any = images?.length

  const plusSlides =(n:number) => {
    setSlideIndex(prev => prev + n);
    slideShow(slideIndex + n)
  }

  const slideRef: any = useRef();

  useEffect(() => {
    if(!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth
    const chiledrenElementCount = slideRef.current.childrenElementCount
    const width = scrollWidth /chiledrenElementCount
    setWidth(width)
  }, [])
  

  const slideShow = (n:number) => {
    if(n> counts) {setSlideIndex(1)}
    if(n< 1) {setSlideIndex(counts)}
  }

  function dragStart(e: any) {
    setStart(e.clientX)
  }
  function dragOver(e: any) {
    const touch = e.clientX;
    setChange(start - touch)
  }
  function dragEnd() {
    if(change > 0) {
      slideRef.current.scrollLeft += 50
    } else {
      slideRef.current.scrollLeft -= 50
    }
  }

  return (
    <div className="product_details">
      <div className="slider_images" draggable={true} ref={slideRef}
        onDragStart={dragStart} onDragOver={dragOver} onDragEnd={dragEnd}>
          {
            images?.map((img: string, index:number)=> (
              <div key={index} className={`slider_box ${index+1 === slideIndex && 'active'}`} 
              onClick={() => setSlideIndex(index + 1)}>
                <img src={img} alt={img}/>
    
              </div>
            ))
          }
        </div>
          
        <div className="Product_page_img">
          {
          images?.map((img: string, index:number)=> (
            <div key={index} className="slides" 
            style={{display:(index+1) ===slideIndex ?"block" : "none"}}>
              <img src={img} alt={img}/>
            </div>
          ))
          }

          <a href="#!" className="prev" onClick={()=> plusSlides(-1)}> &#10094;</a>
          <a href="#!" className="next" onClick={()=> plusSlides(1)}> &#10095;</a>
          {/* <GrLinkNext className='next' /> */}
        </div>



      {/* <div className="Product_page_detail">

      </div> */}
    </div>
  )
}

export default PaggingSlider;