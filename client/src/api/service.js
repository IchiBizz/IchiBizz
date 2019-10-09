// api/service.js
import axios from 'axios';

// TODO: Setup prod env
const service = axios.create({
  baseURL: 'http://localhost:5555/api',
  // => only logged in users can upload images
  // withCredentials: true
});

const errorHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service,
  handleUpload (newImage) {
    console.log('Image in service: ', newImage);
    return service.post('/cloudinary/new/upload', newImage)
      .then(res => {
        console.log(res)
        return res.data
      })
      .catch(errorHandler);
  },

  // Upload image on `AddProduct` page
  saveNewImage (newImage) {
    console.log('New Image saved: ', newImage)
    return service.post('/new', newImage)
      .then(res => res.data)
      .catch(errorHandler);
  }
}