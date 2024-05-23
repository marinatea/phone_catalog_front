type Props = { images: string[] | undefined };

import classNames from 'classnames';
import styles from './ImagesSelector.module.scss';
import { useState } from 'react';

export default function ImagesSelector({ images }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (images === undefined) {
    return;
  }

  return (
    <>
      <div className={styles.selectedImgContainer}>
        <img
          src={'/' + images[selectedImageIndex]}
          className={styles.selectedImg}
          alt="main image"
        />
      </div>

      <div className={styles.secondaryImgsContainer}>
        {images.map((image, i) => {
          return (
            <div
              key={image}
              className={classNames(
                styles.secondaryImgContainer,
                selectedImageIndex === i ? styles.selected : '',
              )}
              onClick={() => {
                setSelectedImageIndex(i);
              }}
            >
              <img
                src={'/' + image}
                className={styles.secondaryImg}
                alt="secondary image"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
