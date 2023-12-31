import SimpleImageSlider from "react-simple-image-slider";
import Image1 from "../Assets/Slider-Image-1.png";
import Image2 from "../Assets/Slider-Image-2.png";
import Image3 from "../Assets/Slider-Image-3.png";
import Image4 from "../Assets/Slider-Image-4.png";
import Image5 from "../Assets/Slider-Image-5.png";
import Image6 from "../Assets/Slider-Image-6.png";

const images = [
  { url: Image1 },
  { url: Image2 },
  { url: Image3 },
  { url: Image4 },
  { url: Image5 },
  { url: Image6 },
];

const ImageSlider = () => {
  return (
    <div className="flex items-center justify-center">
      <SimpleImageSlider
        width={1200}
        height={450}
        images={images}
        navStyle={1}
        showBullets={false}
        showNavs={true}
        autoPlay={true}
      />
    </div>
  );
}

export default ImageSlider