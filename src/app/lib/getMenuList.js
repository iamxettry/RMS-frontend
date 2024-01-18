// http://127.0.0.1:8000/api/menu/menu-list/




const getVegNonVeg =async (value) => {
    try {
       const res= await fetch(`http://127.0.0.1:8000/api/menu/veg-menu-list/${value}/`,{ next: { revalidate: 10 } })
    
     
       if (!res.ok) {
          return undefined
          
       }
       return res.json()
    } catch (error) {
       return ("Fetch Error")
    }
    
    }
    
    export default getVegNonVeg