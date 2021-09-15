
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadImage } from "../../store/image";
import './uploadImageForm.css'

const UploadImageForm = ({restaurant}) => {

    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        // const res = await fetch(`/api/restaurants/${restaurant.id}/uploadimage`, {
        //     method: "POST",
        //     body: formData,
        // });
        const res = await dispatch(uploadImage(formData,restaurant.id))
        if (res) {
            setImageLoading(false);
            history.push(`/restaurants/${restaurant.id}`);
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (

            <form className='upload-image__form' onSubmit={handleSubmit}>
            <input
                className='upload-image__input'
              type="file"
            //   multiple
              accept="image/*"
              onChange={updateImage}
            />
            <button className='upload-image__button' type="submit">Upload</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>

    )
}


export default UploadImageForm;
