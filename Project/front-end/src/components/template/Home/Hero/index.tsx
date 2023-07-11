
import BaseButton from "../../../UI/atoms/BaseButton"
import "./styles.scss"
export default function Hero() {
  return (
    <div className="hero_container">

      <div className="__content">
        <p>
          Discover your heroic transformation at Hero Hair Emporium.
        </p>

        <BaseButton label="Shop Now"  background='#EC4256'/>
      </div>
    </div>
  )
}
