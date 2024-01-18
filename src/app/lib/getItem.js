export default async function getItem(id) {

    const res = await fetch(`http://127.0.0.1:8000/api/menu/menuitems/${id}/`, { cache: 'no-store' });
    if (!res.ok) {
        return res.statusText
    }

    
    return await res.json();

}