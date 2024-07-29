import { useCatImage } from '../hooks/useCatImage.js'

export function Otro ({fact}) {
  const { imageUrl } = useCatImage({ fact })
  console.log(imageUrl)

  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}