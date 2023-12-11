import React from 'react'
import default_images from '../../../../assets/sellerUpload.png'
import "./styles.scss"

interface ImageUploadProps {
    label?: string,
    id?: string,
    preview?: any
    onChange: any
}
const InputImageUpload: React.FC<ImageUploadProps> =({label, id, onChange, preview})=>{
    return (
        <div className="seller__image_upload">
            <label htmlFor={label}>
                {preview ? (
                <img src={preview} alt="dummy" width="100%" height="100%" />
                ) : (
                    <img src={default_images} alt="sellerUpload"/>
                )}
            </label>
            <input
                name="upload_file"
                accept="image/*"
                type="file"
                id={id}
                style={{ display: "none" }}
                onChange={onChange}
            />
            <br />
            {/* <button onClick={handleUpload}>Upload</button> */}
        </div>
    )
}

export default InputImageUpload;