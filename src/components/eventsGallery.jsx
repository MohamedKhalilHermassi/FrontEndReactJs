import React, { useState } from 'react';
import img1 from './gallery/img1.jpg';
import img2 from './gallery/img2.jpg';
import img3 from './gallery/img3.jpg';
import img4 from './gallery/img4.jpg';
import img5 from './gallery/img5.jpg';

const IMAGES = [
  {
    src: img1,
    alt: 'image1',
  },
  {
    src: img2,
    alt: 'image2',
  },
  {
    src: img3,
    alt: 'image3',
  },
  {
    src: img4,
    alt: 'image4',
  },
  {
    src: img5,
    alt: 'image5',
  },
];

const styles = {
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridGap: '10px',
  },
  galleryItem: {
    overflow: 'hidden',
    height: 0,
    paddingBottom: '100%',
    position: 'relative',
  },
  galleryImage: {
    opacity: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    transition: 'opacity 0.5s',
  },
  galleryImageHover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    transform: 'scale(1.1)',
    transition: 'transform 0.5s',
  },
  lightboxImage: {
    maxHeight: '80%',
    maxWidth: '80%',
    border: '10px solid white',
    borderRadius: '10px',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryImageLoaded: {
    opacity: 1,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    transition: 'opacity 0.5s',
  },
};

function EventsGallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadedImages, setLoadedImages] = useState([]);
  
    const handleImageLoad = (index) => {
      setLoadedImages((prev) => [...prev, index]);
    };
  
    return (
      <div style={styles.gallery}>
        {IMAGES.map((image, index) => (
          <div 
            key={index} 
            style={styles.galleryItem} 
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              style={loadedImages.includes(index) ? styles.galleryImageLoaded : styles.galleryImage} 
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
        {selectedImage && (
          <div style={styles.lightbox} onClick={() => setSelectedImage(null)}>
            <img src={selectedImage.src} alt={selectedImage.alt} style={styles.lightboxImage} />
          </div>
        )}
      </div>
  );
}

export default EventsGallery;