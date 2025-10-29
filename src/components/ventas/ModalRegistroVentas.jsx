import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroVentas = ({
    mostrarModal,
    setMostrarModal,
    nuevaVenta,
    manejarCambioInput,
    agregarVenta,
    clientes = [],
    empleados = [],
}) => {
    return (
        <Modal
            backdrop="static"
            show={mostrarModal}
            onHide={() => setMostrarModal(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Registrar Nueva Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Selección de Cliente */}
                    <Form.Group className="mb-3" controlId="cliente">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select
                            name="id_cliente"
                            value={nuevaVenta.id_cliente}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                    {cliente.primer_nombre} {cliente.primer_apellido}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Selección de Empleado */}
                    <Form.Group className="mb-3" controlId="empleado">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Select
                            name="id_empleado"
                            value={nuevaVenta.id_empleado}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un empleado</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                    {empleado.primer_nombre} {empleado.primer_apellido}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Fecha de Venta */}
                    <Form.Group className="mb-3" controlId="fechaVenta">
                        <Form.Label>Fecha de Venta</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="fecha_venta"
                            value={nuevaVenta.fecha_venta}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* Total de Venta */}
                    <Form.Group className="mb-3" controlId="totalVenta">
                        <Form.Label>Total Venta</Form.Label>
                        <Form.Control
                            type="number"
                            name="total_venta"
                            value={nuevaVenta.total_venta}
                            onChange={manejarCambioInput}
                            placeholder="Ej: 150.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={agregarVenta}
                    disabled={
                        !nuevaVenta.id_cliente ||
                        !nuevaVenta.id_empleado ||
                        !nuevaVenta.fecha_venta ||
                        !nuevaVenta.total_venta
                    }
                >
                    Guardar Venta
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroVentas;
