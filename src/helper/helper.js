import { toast } from "react-toastify";
import { Buffer } from "buffer";


const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAWB3UZU7UHGVRI5HB',
  secretAccessKey: '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',
  region: 'us-east-2'
});
const S3 = new AWS.S3();

export const GreenNotify = (text) => {
  toast.success(text, {
    position: toast.POSITION.TOP_CENTER,
  });

  // toast.error("Error Notification !", {
  //   position: toast.POSITION.TOP_LEFT,
  // });

  // toast.warn("Warning Notification !", {
  //   position: toast.POSITION.BOTTOM_LEFT,
  // });

  // toast.info("Info Notification !", {
  //   position: toast.POSITION.BOTTOM_CENTER,
  // });

  // toast("Custom Style Notification with css class!", {
  //   position: toast.POSITION.BOTTOM_RIGHT,
  //   className: "foo-bar",
  // });
};

export const RedNotify = (text) => {
  toast.error(text, {
    position: toast.POSITION.TOP_CENTER,
  });
};

// export const upload = (cb, setIsLoading) => (evt) => {
//   const files = evt.target.files;
//   const file = files[0];

//   var myHeaders = new Headers();
//   myHeaders.append(
//     "Authorization",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmU1YWQ5Y2ZjN2JlZjE3ZjFkOTkxNCIsImlhdCI6MTY4MTEyMDU0NCwiZXhwIjoxNjg4ODk2NTQ0fQ.MwVbniYhtKpSyleEJwCJ_z6GKP9wlg4JEszWOIbOTsU"
//   );

//   var formdata = new FormData();
//   formdata.append("file", file);

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: formdata,
//     redirect: "follow",
//   };
//   setIsLoading(true);
//   fetch(
//     "https://rxje2xzpme.us-east-1.awsapprunner.com/api/v1/user/upload",
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const url = data.url;
//       setIsLoading(false);
//       cb(url);
//     })
//     .catch((error) => {
//       setIsLoading(false);
//       console.log("error", error);
//     });
// };

const uploadImageOnS3 = async (src, cb) => {
  return new Promise((resolve, reject) => {
      try {
          console.log("Hi!")
          const reader = new FileReader();
          reader.onload = async () => {
              console.log("Hiello!")
              cb(reader.result)
              const params = {
                  Bucket: 'drivebuddyz',
                  Key: `${10000 + Math.round(Math.random() * 10000)}.png`,
                  Body: new Buffer(reader.result.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
              };
              let res = await S3.upload(params).promise();
              console.log(res);
              return resolve(res.Location)
          }
          reader.onerror = (e) => console.log("OOPS!", e)
          reader.readAsDataURL(src)
      } catch (error) {
          console.error('Error uploading to S3:', error);
          reject(error)
      }
  })
}

export const upload = cb => files => {
  const file = files[0]
  uploadImageOnS3(file, cb).then(url => {
      cb(url)
  })
      .catch(error => console.log('error', error));
}
