import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function PharmacyStock(){

    
    const [sortedItems, setSortedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState([]);
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8070/stock/fields")
          .then((response) => {
            const sorted = [...response.data.items];
            sorted.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
            setSortedItems(sorted);
          })
          .catch((err) => console.log(err));
      }, []);

      const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
          if (timer) {
            clearTimeout(timer);
          }
      
          timer = setTimeout(() => {
            fn(...args);
          }, delay);
        };
      };

    const handleSearch = async (event) => {
        event.preventDefault();
        const debouncedSearch = debounce(async () => {
        try {
           
            console.log("Search Query:", searchQuery);
            const response = await axios.get(`http://localhost:8070/stock/search?q=${searchQuery}`);
            const items = [...response.data.items]; // Create a temporary variable
            items.sort((a, b) => a.ProductName.localeCompare(b.ProductName)); // Sort by product name
            setSortedItems(items);


        } catch (error) {
            console.error("Search Error:", error);
        }
    },500);
    debouncedSearch();
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    if(value  === ''){
        setSuggestions([]);
    }else{
        // Generate and set suggestions based on the current input value
        const suggestedItems = sortedItems
          .filter((item) =>
            item.ProductName.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => item.ProductName);
        setSuggestions(suggestedItems);
    }
    };
    
    const handleAddToCart = (item) => {

  };

    return(
        <div className="container">
            <h1>Stock</h1>

            <form onSubmit={handleSearch}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by product name, category, or reference number"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-secondary" type="submit">
                        Search
                    </button>
                </div>
            </form>
      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      )}
            <table className="table">
                <thead>
                    <tr className="tr-tests">
                        <th>Reference No</th>
                        <th>Product Name</th>
                        <th>Available Stock</th>
                        <th>Price(Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedItems.map(item =>(
                            <tr key={item.ReferenceNo}>
                                <td>{item.ReferenceNo}</td>
                                <td>{item.ProductName}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.Price}</td>
                                
                                <td>
                                    <Link to={`/item/${item.ReferenceNo}`}>View Details</Link>
                                </td>
                            
                            </tr>
                        )) 
                        
                    }
                    
                </tbody>
            </table>
            
        </div>
    )


}

export default PharmacyStock;