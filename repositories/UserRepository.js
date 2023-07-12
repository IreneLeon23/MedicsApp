import axios from "axios";
import { DB_HOST } from "@env";
const serverIP = DB_HOST;
class UserRepository {
  async getUserById(id) {
    try {
      const response = await axios.get(`http://${serverIP}:8080/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  }
}

export default UserRepository;
