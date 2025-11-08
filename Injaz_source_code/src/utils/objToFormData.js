export default function objectToFormData(obj) {
    let formData = new FormData();
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
   
      }
    }
     
    return formData;
  }