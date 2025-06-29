import React from "react";

function ImageField({previewImage, alt, name, label, onChange}) {
  return (
     <>
      {previewImage && <img src={previewImage} style={{height:'200px', objectFit:'cover'}} alt={alt} />}
      <div className='mb-3 mt-3'>
        <label htmlFor={name} className='form-label'>{label}:</label>
        <input type='file' className='form-control' name={name} onChange={onChange} />
      </div>
    </>
  )
}

export default React.memo(ImageField);