import './imageView.css'

const ImageView = ({image}) => {
    return (
        <div className='imageModal__container'>
            <img width='500px' className='imageInModal' src={image.imgUrl} />
            <button>Delete</button>
        </div>
    )
}
export default ImageView;
