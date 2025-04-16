export const getAllProducts = async(AxiosPrivate)=>{
  try {
    const res = await AxiosPrivate.get("/product/getProducts");
    const productsDetails  = await res.data;
    if (productsDetails) {
      return productsDetails
    }
  } catch (err) {
    return "Something went wrong";
  } 
}