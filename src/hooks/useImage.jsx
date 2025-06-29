import  { useCallback, useState } from 'react'

function use() {
  const [value, setValue] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const onChange = useCallback((e)=>{
    const file = e.target.files[0];
    setValue(file);

    if(file) {
      const reader = new FileReader();
      reader.onload = ()=>setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, []);

  return {value, previewImage, onChange, setPreviewImage};
}


export default useImage