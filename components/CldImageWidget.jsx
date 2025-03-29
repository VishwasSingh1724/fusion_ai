'use client'
import { CldImage } from 'next-cloudinary';

const CldImageWidget = (props) => {
  return (
    <div>
        <CldImage
       width={props.image.width}
       height={props.image.height}
       src={props.image.public_id}
       underlay={props.image.public_id}
        alt="Description of my image"
/>
    </div>
  )
}

export default CldImageWidget

