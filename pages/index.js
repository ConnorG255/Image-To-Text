import React, { useState, useEffect } from 'react';





export default function Home() {
  
  const ExtractText = ({ image }) => {

    
    const [text, setText] = useState('');
  
    useEffect(() => {
      const extract = async () => {
        const { data } = await Tesseract.recognize(image, 'eng');
        setText(data.text);
      };
  
      extract();
    }, [image]);
  
    return <div>{text}</div>;
  };

  
  const [image, setImage] = useState(null);


  const handlePaste = e => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const url = URL.createObjectURL(blob);
        imageRef.current.src = url;
        break;
      }
    }
  };

  const pasteImg = async ()=> {
    try {
        const clipItems = await navigator.clipboard.read();
       const bOut = await clipItems[0].getType('image/png');
        const data = URL.createObjectURL(bOut);
        setImage(data);
    } catch(e) {
        console.log(e);
    }
}
    
    const handleChange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        setImage(reader.result);
      };
  
      reader.readAsDataURL(file); 
      
    };   



  return (
    <div onPaste={pasteImg} className='bg-slate-900'>
      <input type="file" accept="image/*" onChange={handleChange} />

      {image && <img src={image} alt="Uploaded Image" />}

      {image && <ExtractText image={image} />}

    </div>
  );
}