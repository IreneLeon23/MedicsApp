import axios from "axios";
import { DB_HOST } from "@env";
const serverIP = DB_HOST;
class ProductRepository {
  async getProductById(id) {
    try {
      const response = await axios.get(
        `http://${serverIP}:8080/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return null;
    }
  }
}

export default ProductRepository;
