import { useState } from 'react';

function ImageSelector({images, setImages}) {
  const [previews, setPreviews] = useState([null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...previews];
      newPreviews[index] = reader.result;
      setPreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 미리보고 */}
      <div style={{ display: 'flex', gap: '1rem', height: '200px' }}>
        {previews.map((src, i) => (
          <div key={i} style={{ flex: 1, border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {src ? <img src={src} alt={`preview-${i}`} style={{ maxHeight: '100%', maxWidth: '100%' }} /> : <span style={{ color: '#999' }}>미리보기 {i + 1}</span>}
          </div>
        ))}
      </div>

      {/* 이미지 선택 */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {[0, 1, 2].map((i) => <input key={i} type="file" accept="image/*" disabled={i > 0 && !images[i - 1]} onChange={(e) => handleImageChange(e, i)} />)}
      </div>
    </div>
  );
}

export default ImageSelector