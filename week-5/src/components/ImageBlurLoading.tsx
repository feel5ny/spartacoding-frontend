import { useState } from 'react';
import './ImageBlur.css';

export const ImageBlurLoading = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="ImageBlurLoading">
      <div className={`image-container ${isLoaded ? 'loaded' : ''}`}>
        <img
          src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e"
          alt="example"
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};
