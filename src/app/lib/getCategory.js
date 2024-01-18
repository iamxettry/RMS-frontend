

const getCategoryList= async (category=null)=>{
    try {
        let url = `http://127.0.0.1:8000/api/menu/category/`;
      
       if (category !== null) {
          url += `${category}`;
       }
        const res= await fetch(url,{next:{revalidate:60}})

        if (res.ok) {
            
            return await res.json() ;
        }else{
            return await res.json()
        }
    } catch (error) {
        return 'Network Error'
        
    }
}

export default getCategoryList