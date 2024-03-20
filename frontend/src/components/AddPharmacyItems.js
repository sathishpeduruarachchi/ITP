import React, { useState } from "react";
import axios from "axios";
//import PharmacyDashboard from "./PharmacyDashboard";
//import DashboardHeader from "./DashboardHeader";

function AddPharmacyItems() {
  const [ProductName, setBName] = useState("");
  const [GenericName, setGName] = useState("");
  const [Dosage, setDos] = useState("");
  const [ReferenceNo, setRefNo] = useState("");
  const [MfgDate, setMfgDate] = useState("");
  const [ExpDate, setExpDate] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState("");

  const [isReferenceNoUnique, setIsReferenceNoUnique] = useState(true);
  const [ReferenceNoError, setReferenceNoError] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [genericNameError, setGenericNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  
  const validateReferenceNo = async (value) => {
    if (!value) {
      setReferenceNoError("Reference Number is required");
      setIsReferenceNoUnique(true);
      return false;
    }
  
    try {
      // Make an API call to check if the reference number is unique
      const response = await axios.get(`http://localhost:8070/stock/add/check-reference-no/${value}`)

  
      if (response.data.isUnique) {
        // Reference number is unique
        setIsReferenceNoUnique(true);
        setReferenceNoError("");
        return true;
      } else {
        // Reference number is not unique
        setIsReferenceNoUnique(false);
        setReferenceNoError("Reference Number already exists!");
        return false;
      }
    } catch (error) {
      // Handle API request error
      console.error(error);
      return false;
    }
  };
  
  
  const validateProductName = (value) => {
    if (!value) {
      setProductNameError("Product Name is required");
      return false;
    } else {
      setProductNameError("");
      return true;
    }
  };

  const validateGenericName = (value) => {
    if (!value) {
      setGenericNameError("Generic Name is required");
      return false;
    } else {
      setGenericNameError("");
      return true;
    }
  };

  const validatePrice = (value) => {
    if (!value) {
      setPriceError("Price is required");
      return false;
    } else if (isNaN(value)) {
      setPriceError("Price must be a valid number");
      return false;
    } else {
      setPriceError("");
      return true;
    }
  };

  const validateQuantity = (value) => {
    if (!value) {
      setQuantityError("Quantity is required");
      return false;
    } else if (isNaN(value)) {
      setQuantityError("Quantity must be a valid number");
      return false;
    } else {
      setQuantityError("");
      return true;
    }
  };


  const sendData = async(event) => {
    event.preventDefault();

    const isProductNameValid = validateProductName(ProductName);
    const isGenericNameValid = validateGenericName(GenericName);
    const isPriceValid = validatePrice(Price);
    const isQuantityValid = validateQuantity(Quantity);

    if(isProductNameValid && isGenericNameValid && isPriceValid && isQuantityValid){
      await checkReferenceNoUniqueness();

         if (isReferenceNoUnique) {
            const newItem = {
              ProductName,
              GenericName,
              Dosage,
              ReferenceNo,
              Category,
              Type,
              MfgDate,
              ExpDate,
              Description,
              Quantity,
              Price,
              Image,
      };

      axios
        .post("http://localhost:8070/stock/add", newItem)
        .then(() => {
          alert("Item added");
        })
        .catch((error) => {
          console.error(error);
          alert("Error adding item. Please try again.");
        });
    } else {
      alert("Reference Number is not unique. Please enter a unique reference number.");
    }
  } else {
    alert("Please fix the validation errors before submitting the form.");
  }
  };

  //  check reference number unique
  const checkReferenceNoUniqueness = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/check-reference-no/${ReferenceNo}`
        
      );
      console.log(response.data);
      // If the response indicates that the reference number is unique
      if (!response.data.isUnique) {
        setIsReferenceNoUnique(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    
     
   <div className="container">
      
    <form onSubmit={sendData}>
      <h2>Enter Item Details</h2>
<div className="mb-3">
<label for="Bname" className="form-label">Brand Name</label>
<input type="text" className="form-control" id="name" placeholder="Enter Brand Name" 
onChange={(event)=>{
setBName(event.target.value);
validateProductName(event.target.value);
}}/>
{productNameError && <div className="text-danger">{productNameError}</div>}
</div>

<div className="mb-3">
<label for="Gname" className="form-label">Generic Name</label>
<input type="text" className="form-control" id="name" placeholder="Enter Generic Name" 
onChange={(event)=>{
setGName(event.target.value);

}}/>

</div>

<div className="mb-3">
<label for="Bname" className="form-label">Dosage Strength</label>
<input type="text" className="form-control" id="dosage"
onChange={(event)=>{
setDos(event.target.value);
}}/>

</div>
<div className="mb-3">
<label for="refNumber" className="form-label">Reference Number</label>
<input type="Number" className="form-control" id="RefNumber" placeholder="Enter Reference Number" min="1" required
onChange={(event)=>{
  const value = event.target.value;
  setRefNo(value);
  validateReferenceNo(value);
}}/>
  {!isReferenceNoUnique && <div className="text-danger">{ReferenceNoError}</div>}
</div>

<div className="mb-3">
<label for="mfgdate" className="form-label">Manufacture Date</label>
<input type="Date" className="form-control" id="Date" 
onChange={(event)=>{
setMfgDate(event.target.value);
}}/>
</div>

<div className="mb-3">
<label for="expdate" className="form-label">Expire Date</label>
<input type="Date" className="form-control" id="Date"
onChange={(event)=>{
setExpDate(event.target.value);
}} />
</div>

<div className="mb-3">
<label for="quantity" className="form-label">Quantity</label>
<input type="Number" className="form-control" id="Qnt" pattern="[0-9]+" min="0" required
onChange={(event)=>{
setQuantity(event.target.value);
validateQuantity(event.target.value);
}}/>{quantityError && <div className="text-danger">{quantityError}</div>}
</div>

<div className="mb-3">
<label for="refNumber" className="form-label">Unit Price(Rs)</label>
<input type="text" className="form-control" id="price"  min="0" pattern="[0-9]+(\.[0-9]{0,2})?" required
onChange={(event)=>{
setPrice(event.target.value);
validatePrice(event.target.value);
}}/>{priceError && <div className="text-danger">{priceError}</div>}
</div>

<div className="mb-3">
<label for="category" className="form-label">Category</label>
<input type="text" className="form-control" id="category" 
onChange={(event)=>{
setCategory(event.target.value);
}}/>
</div>

<div>
<label for="type" className="form-label">Type</label>
<select className="form-select" aria-label="Default select example" required
onChange={(event)=>{
setType(event.target.value);
}}>
<option selected>Select the type here</option>
<option value="1">Tablet</option>
<option value="2">Capsule</option>
<option value="3">Syrup</option>
<option value="4">Inhalers</option>
<option value="5">Drops</option>
<option value="6">Tubes</option>
<option value="7">Other</option>
<option value="8"></option>
</select>
</div>

<div className="mb-3">
<label for="FormControlTextarea1" className="form-label">Add a description</label>
<textarea className="form-control" id="FormControlTextarea1" rows="3"
onChange={(event)=>{
setDescription(event.target.value);
}}></textarea>
</div>

{/* <div className="mb-3">
<label for="image" className="form-label">Add a Image</label>
<input className="form-control" type="file" id="image" accept=".jpg, .jpeg, .png"
onChange={(event) => {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onloadend = () => {
setImage(reader.result);
};
reader.readAsDataURL(file);
} else {
setImage(""); // Clear the image if no file is selected
}
}}/>
</div> */}


<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
</div>
  );
}

export default AddPharmacyItems;