// http://127.0.0.1:8000/api/menu/menu-list/


const getMenu =async (num=null,category=null) => {
    try {
       let url = `http://127.0.0.1:8000/api/menu/`;
      
       if (num!==null && category !== null) {
          url += `menuitems?num_items=${num}&category=${category}`;
       }else{
         url+=`menu-list/`
       }
       const res = await fetch(url);
    
       if (!res.ok) {
          return undefined
          
       }
       return res.json()
    } catch (error) {
       return ("Fetch Error")
    }
    
    }
    
    export default getMenu