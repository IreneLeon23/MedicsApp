import { Linking } from "react-native";
import ClientModal from "./ClientModal";

export const handlePhoneCall = (telefono) => {
  const phoneUrl = `tel:${telefono}`;
  Linking.canOpenURL(phoneUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(phoneUrl);
      } else {
        console.log("La función de llamada no es compatible.");
      }
    })
    .catch((error) => {
      console.error("Error al abrir la marcación al teléfono:", error);
    });
};

export const handleWhatsAppMessage = (whatsapp) => {
  const whatsAppUrl = `whatsapp://send?phone=${whatsapp}`;
  Linking.canOpenURL(whatsAppUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(whatsAppUrl);
      } else {
        console.log("La función de WhatsApp no es compatible.");
      }
    })
    .catch((error) => {
      console.error("Error al abrir WhatsApp:", error);
    });
};

export const loadTrabajoInfo = (clave_cliente, setTrabajoInfo) => {
  // Cargar información de trabajos al montar el componente
  axios
    .get(`http://192.168.1.10:8080/admin/adminclien`)
    .then((response) => {
      setTrabajoInfo(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener la información del trabajo:", error);
    });
};
