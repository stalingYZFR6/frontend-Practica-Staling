import { useState, useEffect } from "react";
import { Container,Row, Col, Button } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";
import CuadroBusquedas from "../components/busquedas/Cuadrobusquedas";
import ModalRegistroCliente from "../components/clientes/ModalRegistroClientes";

const Clientes = () => {

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("")

    const [mostrarModal, setMostrarModal] = useState(false);

    // Estado para guardar los datos del nuevo cliente
    const [nuevoCliente, setNuevoCliente] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        celular: "",
        direccion: "",
        cedula: ""
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoCliente(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const agregarCliente = async () => {
        // Validación básica
        if (!nuevoCliente.primer_nombre.trim() || !nuevoCliente.primer_apellido.trim() || !nuevoCliente.celular.trim()) return;

        try {
            const respuesta = await fetch("http://localhost:3000/api/registrarCliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoCliente)
            });

            if (!respuesta.ok) throw new Error("Error al guardar el cliente");

            // Limpiar formulario y cerrar modal
            setNuevoCliente({
                primer_nombre: "",
                segundo_nombre: "",
                primer_apellido: "",
                segundo_apellido: "",
                celular: "",
                direccion: "",
                cedula: ""
            });
            setMostrarModal(false);

            // Refrescar lista de clientes si tienes función para ello
            await obtenerClientes();
        } catch (error) {
            console.error("Error al agregar cliente:", error);
            alert("No se pudo guardar el cliente. Revisa la consola.");
        }
    };


    const obtenerClientes = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/clientes');
            if (!respuesta.ok) {
                throw new Error('Error al obtener los clientes');
            }

            const datos = await respuesta.json();
            setClientes(datos);
            setClientesFiltrados(datos);
            setCargando(false);

        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = clientes.filter(
            (cliente) =>
                cliente.primer_nombre.toLowerCase().includes(texto) ||
                cliente.segundo_nombre.toLowerCase().includes(texto) ||
                cliente.primer_apellido.toLowerCase().includes(texto) ||
                cliente.segundo_apellido.toLowerCase().includes(texto) ||
                cliente.celular.toLowerCase().includes(texto) ||
                cliente.direccion.toLowerCase().includes(texto) ||
                cliente.cedula.toLowerCase().includes(texto)
        );

        setClientesFiltrados(filtrados);
    };


    useEffect(() => {
        obtenerClientes();
    }, []);

    return (
        <>
            <Container className="mt-4">

                <h4>Clientes</h4>
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
                            + Nuevo Cliente
                        </Button>
                    </Col>
                </Row>

                <h4>Clientes</h4>
                <TablaClientes
                    clientes={clientesFiltrados}
                    cargando={cargando}
                />

                <ModalRegistroCliente
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoCliente={nuevoCliente}
                    manejarCambioInput={manejarCambioInput}
                    agregarCliente={agregarCliente}
                />

            </Container>
        </>
    );
}

export default Clientes;
