import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';




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
    <div onPaste={pasteImg} className=' w-screen h-screen bg-slate-900'>
      <div className='flex flex-col justify-center h-1/6 w-full bg-gradient-to-r from-teal-500 to-blue-500 gap-5'>
          <div>       <div className='font-semibold text-3xl w-screen h-1/24 flex justify-center'> Image Text Extractor</div>
                   <div className=' text-l w-screen h-1/24 flex justify-center'> Paste an image or choose a file to extract the text out of </div></div> 
       <div className='h-1/2 w-screen flex justify-center ml-10'> <input type="file" accept="image/*" onChange={handleChange} className='rounded-l opacity-100' /></div>
      </div>



      <div className='w-screen h-fit flex justify-center mt-3'><div className='h-fit w-fit'>{image && <img src={image} alt="Uploaded Image" />}</div></div>
      


      <div className=' mt-3 w-full flex justify-center'>
    <div className='w-11/12 h-fit bg-white bg-opacity-20 rounded-md text-center '>{image && <ExtractText image={image} />}</div>
    </div>
      

    </div>
  );
}