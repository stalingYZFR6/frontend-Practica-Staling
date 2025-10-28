import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
    mostrarModal,
    setMostrarModal,
    nuevoCliente,
    manejarCambioInput,
    agregarCliente,
}) => {
    return (
        <Modal backdrop='static' show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="primerNombre">
                        <Form.Label>Primer Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_nombre"
                            value={nuevoCliente.primer_nombre}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Juan"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="segundoNombre">
                        <Form.Label>Segundo Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_nombre"
                            value={nuevoCliente.segundo_nombre}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Carlos"
                            maxLength={20}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="primerApellido">
                        <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_apellido"
                            value={nuevoCliente.primer_apellido}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Pérez"
                            maxLength={20}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="segundoApellido">
                        <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_apellido"
                            value={nuevoCliente.segundo_apellido}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Gómez"
                            maxLength={20}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control
                            type="text"
                            name="celular"
                            value={nuevoCliente.celular}
                            onChange={manejarCambioInput}
                            placeholder="Ej: 87654321"
                            maxLength={8}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="direccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={nuevoCliente.direccion}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Calle principal #123"
                            maxLength={150}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cedula">
                        <Form.Label>Cédula</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={nuevoCliente.cedula}
                            onChange={manejarCambioInput}
                            placeholder="Ej: 001-010101-0001A"
                            maxLength={14}
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
                    onClick={agregarCliente}
                    disabled={!nuevoCliente.primer_nombre.trim() || !nuevoCliente.primer_apellido.trim() || !nuevoCliente.celular.trim()}
                >
                    Guardar Cliente
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroCliente;