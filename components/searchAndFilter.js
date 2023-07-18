import { useState, useEffect } from "react";

export const useSearchAndFilter = (initialData, getData) => {
  const [data, setData] = useState(initialData);
  const [filtro, setFiltro] = useState("");
  const [orderBy, setOrderBy] = useState(null);
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (debouncedFilter) {
      filterData(debouncedFilter);
    }
  }, [debouncedFilter]);

  const handleFilterChange = (text) => {
    setFiltro(text);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setDebouncedFilter(text);
    }, 300);
    setDebounceTimeout(timeout);
  };

  const handleFilterPress = () => {
    applyOrderBy();
  };

  const filterData = (text) => {
    if (text === "") {
      setData(initialData);
    } else {
      const filteredItems = initialData.filter((item) => {
        const searchTerm = text.toLowerCase();
        const productName = item.nombre_producto.toLowerCase();
        const clientName = item.nombre_cliente.toLowerCase();

        return productName.includes(searchTerm) || clientName.includes(searchTerm);
      });

      setData(filteredItems);
    }
  };

  const applyOrderBy = () => {
    if (orderBy) {
      let sortedData = [...data];

      switch (orderBy) {
        case "nombre_producto":
          sortedData = sortedData.sort((a, b) =>
            a.nombre_producto.localeCompare(b.nombre_producto)
          );
          break;
        case "fecha_captura":
          sortedData = sortedData.sort(
            (a, b) => new Date(a.fecha_captura) - new Date(b.fecha_captura)
          );
          break;
        case "nombre_cliente":
          sortedData = sortedData.sort((a, b) =>
            a.nombre_cliente.localeCompare(b.nombre_cliente)
          );
          break;
        default:
          break;
      }

      setData(sortedData);
    }
  };

  useEffect(() => {
    getData()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return {
    data,
    filtro,
    handleFilterChange,
    handleFilterPress,
  };
};
