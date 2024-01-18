const getNotCompletedOrder = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/order/not-completed-orders/${id}/`,
        { next: { revalidate: 0 } },
        {
          method: "GET",
        }
      );
  
      if (!res.ok) {
        return { error: "order Not found" };
      }
      return res.json();
    } catch (error) {
      return "Fetch Error";
    }
  };
  
  export default getNotCompletedOrder;
  