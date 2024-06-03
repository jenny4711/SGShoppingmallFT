// import React, { Component } from "react";
// import { Button } from "react-bootstrap";
// import "../App.css";
// import "../style/common.style.css";

// const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
// const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

// class CloudinaryUploadWidget extends Component {
//   componentDidMount() {
//     var myWidget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: CLOUDNAME,
//         uploadPreset: UPLOADPRESET,
//       },
//       (error, result) => {
//         if (!error && result && result.event === "success") {
//           console.log("Done! Here is the image info: ", result.info);
//           document
//             .getElementById("uploadedimage")
//             .setAttribute("src", result.info.secure_url);
//           this.props.uploadImage(result.info.secure_url);
//         }
//       } //https://cloudinary.com/documentation/react_image_and_video_upload
//     );
//     document.getElementById("upload_widget").addEventListener(
//       "click",
//       function () {
//         myWidget.open();
//       },
//       false
//     );
//   }

//   render() {
//     return (
//       <Button id="upload_widget" size="sm" className="ml-2">
//         Upload Image +
//       </Button>
//     );
//   }
// }

// export default CloudinaryUploadWidget;


import { createContext, useEffect, useState } from 'react';

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setFormData }) {
  const [loaded, setLoaded] = useState(false);
  const [widgetInitialized, setWidgetInitialized] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded && !widgetInitialized) {
      var myWidget = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
        if (!error && result && result.event === 'success') {
          setFormData((prevData) => ({ ...prevData, image: result.info.secure_url }));
        }
      });

      document.getElementById('upload_widget').addEventListener(
        'click',
        function () {
          myWidget.open();
        },
        false
      );

      setWidgetInitialized(true);
    }
  }, [loaded, widgetInitialized, uwConfig]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button id='upload_widget' className='cloudinary-button'>
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
