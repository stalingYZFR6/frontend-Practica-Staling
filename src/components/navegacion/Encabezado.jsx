import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  // Alternar visibilidad del menú
  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  // Navegar y cerrar menú
  const manejarNavegacion = (ruta) => {
    navigate(ruta);

    setMostrarMenu(false);
  };

  return (
    <Navbar expand="md" fixed="top" className="bg-primary">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/inicio")}
          className="text-white fw-bold"
          style={{ cursor: "pointer" }}
        >
          Ferretería
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="menu-offcanvas"
          onClick={manejarToggle}
          className="bg-light"
        />
        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
     
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú principal</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              
              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/")}
                >
                  {mostrarMenu ? <i className="bi-house-fill me-2"></i> : null} Inicio
                </Nav.Link>

              <Nav.Link 
               className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/categorias")}
               >
                {mostrarMenu ? <i className="bi-bookmark-plus-fill me-2"></i> : null} Categorías
                </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/productos")}
                >
                  {mostrarMenu ? <i className="bi-box-fill me-2"></i> : null} Productos
                  </Nav.Link>

              <Nav.Link
               className={mostrarMenu ? "texto-marca" : "text-white"} 
               onClick={() => manejarNavegacion("/clientes")}
               >
                {mostrarMenu ? <i className="bi-person-fill me-2"></i> : null} Clientes
                </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/empleados")}
                >
                  {mostrarMenu ? <i className="bi-person-badge-fill me-2"></i> : null} Empleados
                  </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/usuarios")}
                >
                  {mostrarMenu ? <i className="bi-person-vcard-fill me-2"></i> : null} Usuarios
                  </Nav.Link>

              <Nav.Link 
               className={mostrarMenu ? "texto-marca" : "text-white"} 
               onClick={() => manejarNavegacion("/ventas")}
               >
                {mostrarMenu ? <i className="bi-cash-stack"></i> : null} Ventas
                </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/compras")}
                >
                  {mostrarMenu ? <i className="bi-cart-fill me-2"></i> : null} Compras
                  </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/catalogo")}
                >
                 {mostrarMenu ? <i className="bi-images me-2"></i> : null} Catalogo
                  </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;