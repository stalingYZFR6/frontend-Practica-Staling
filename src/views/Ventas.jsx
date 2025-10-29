import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaVentas from "../components/ventas/TablaVentas";
import CuadroBusquedas from "../components/busquedas/Cuadrobusquedas";
import ModalRegistroVentas from "../components/ventas/ModalRegistroVentas";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: "",
    id_empleado: "",
    fecha_venta: "",
    total_venta: ""
  });

  // Manejar cambios en inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaVenta((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar venta al backend
  const agregarVenta = async () => {
    if (!nuevaVenta.id_cliente || !nuevaVenta.id_empleado || !nuevaVenta.fecha_venta || !nuevaVenta.total_venta) return;

    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarventa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVenta)
      });

      if (!respuesta.ok) throw new Error("Error al guardar la venta");

      setNuevaVenta({
        id_cliente: "",
        id_empleado: "",
        fecha_venta: "",
        total_venta: ""
      });
      setMostrarModal(false);

      await obtenerVentas();
    } catch (error) {
      console.error("Error al agregar venta:", error);
      alert("No se pudo guardar la venta. Revisa la consola.");
    }
  };

  // Obtener ventas del backend
  const obtenerVentas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/ventas");
      if (!respuesta.ok) throw new Error("Error al obtener las ventas");

      const datos = await respuesta.json();
      setVentas(datos);
      setVentasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  // Obtener clientes y empleados para los select del modal
  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/clientes");
      if (!respuesta.ok) throw new Error("Error al obtener los clientes");
      const datos = await respuesta.json();
      setClientes(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) throw new Error("Error al obtener los empleados");
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = ventas.filter(
      (venta) =>
        String(venta.id_venta).includes(texto) ||
        String(venta.id_cliente).includes(texto) ||
        String(venta.id_empleado).includes(texto)
    );

    setVentasFiltradas(filtradas);
  };

  useEffect(() => {
    obtenerVentas();
    obtenerClientes();
    obtenerEmpleados();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Ventas</h4>

      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>

        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModal(true)}
          >
            + Nueva Venta
          </Button>
        </Col>
      </Row>

      <TablaVentas ventas={ventasFiltradas} cargando={cargando} />

      <ModalRegistroVentas
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaVenta={nuevaVenta}
        manejarCambioInput={manejarCambioInput}
        agregarVenta={agregarVenta}
        clientes={clientes}
        empleados={empleados}
      />
    </Container>
  );
};

export default Ventas;
