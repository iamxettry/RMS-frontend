// http://127.0.0.1:8000/api/menu/menu-list/


const getAllItem =async () => {
    try {
       let url = `http://127.0.0.1:8000/api/menu/menu-list`;
      
       const res = await fetch(url);
    
       if (!res.ok) {
          return undefined
          
       }
       return res.json()
    } catch (error) {
       return ("Fetch Error")
    }
    
    }
    
    export default getAllItem