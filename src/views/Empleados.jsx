import { useState, useEffect } from "react";
import { Container, Row, Col, Button  } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmpleados";
import CuadroBusquedas from "../components/busquedas/Cuadrobusquedas";
import ModalRegistroEmpleado from "../components/empleados/ModalRegistroEmpleado";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      celular: "",
      cargo: "",
      fecha_contratacion: ""
});
// Manejar cambios en inputs

const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
        ...prev,
        [name]: value
    }));
};

// Enviar nuevo empleado al backend
const agregarEmpleado = async () => {
    if (!nuevoEmpleado.primer_nombre.trim() || !nuevoEmpleado.primer_apellido.trim() || !nuevoEmpleado.celular.trim() || !nuevoEmpleado.cargo.trim()) return;

    try {
        const respuesta = await fetch("http://localhost:3000/api/registrarempleado", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoEmpleado)
        });

        if (!respuesta.ok) throw new Error("Error al guardar el empleado");

        // Limpiar formulario y cerrar modal
        setNuevoEmpleado({
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            celular: "",
            cargo: "",
            fecha_contratacion: ""
        });
        setMostrarModal(false);

        // Refrescar lista de empleados si tienes función para ello
        await obtenerEmpleados();
    } catch (error) {
        console.error("Error al agregar empleado:", error);
        alert("No se pudo guardar el empleado. Revisa la consola.");
    }
};


  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los empleados");
      }

      const datos = await respuesta.json();
      setEmpleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = empleados.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        empleado.segundo_nombre.toLowerCase().includes(texto) ||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        empleado.segundo_apellido.toLowerCase().includes(texto) ||
        empleado.celular.toLowerCase().includes(texto) ||
        empleado.cargo.toLowerCase().includes(texto)
    );

    setEmpleadosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Empleados</h4>

        <Row>
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
              + Nuevo Empleado
            </Button>
          </Col>
        </Row>

        <TablaEmpleados empleados={empleadosFiltrados} cargando={cargando} />

        <ModalRegistroEmpleado
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
        />

      </Container>
    </>
  );
};

export default Empleados;
