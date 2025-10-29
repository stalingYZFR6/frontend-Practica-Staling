import { Modal, Form, Button } from "react-bootstrap";


const ModalRegistroUsuario = ({
    mostrarModal,
    setMostrarModal,
    nuevoUsuario,
    manejarCambioInput,
    agregarUsuario,
}) => {
    return (
        <Modal backdrop='static' show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nombreUsuario">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="usuario"
                            value={nuevoUsuario.usuario}
                            onChange={manejarCambioInput}
                            placeholder="Ej: admin123"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contraseñaUsuario">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="contraseña"
                            value={nuevoUsuario.contraseña}
                            onChange={manejarCambioInput}
                            placeholder="Ingrese una contraseña"
                            maxLength={20}
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
                    onClick={agregarUsuario}
                    disabled={
                        !nuevoUsuario.usuario.trim() ||
                        !nuevoUsuario.contraseña.trim()
                    }
                >
                    Guardar Usuario
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroUsuario;
