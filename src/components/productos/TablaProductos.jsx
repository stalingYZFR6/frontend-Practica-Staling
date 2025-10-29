import { Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";

// Importar las imágenes
import martillo from "../../assets/martillo.png";
import tornillos from "../../assets/tornillos.jpg";
import pintura from "../../assets/pintura.jpg";

const TablaProductos = ({ productos, cargando }) => {
    const [orden, setOrden] = useState({ campo: "id_categoria", direccion: "asc" });

    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    // Asignar la imagen según el nombre del producto primero
    const productosConImagen = productos.map((p) => {
        let imagen = null;
        const nombre = p.nombre_producto.toLowerCase();

        if (nombre === "martillo") imagen = martillo;
        if (nombre === "tornillos") imagen = tornillos;
        if (nombre === "pintura") imagen = pintura;

        return { ...p, imagenSrc: imagen };
    });

    // Ordenar después de asignar la imagen
    const productosOrdenados = [...productosConImagen].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];

        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }

        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });

    if (cargando) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        );
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <BotonOrden campo="id_producto" orden={orden} manejarOrden={manejarOrden}>
                        ID Producto
                    </BotonOrden>

                    <BotonOrden campo="nombre_producto" orden={orden} manejarOrden={manejarOrden}>
                        Nombre Producto
                    </BotonOrden>

                    <BotonOrden campo="descripcion_producto" orden={orden} manejarOrden={manejarOrden}>
                        Descripción
                    </BotonOrden>

                    <BotonOrden campo="id_categoria" orden={orden} manejarOrden={manejarOrden}>
                        ID Categoría
                    </BotonOrden>

                    <BotonOrden campo="precio_unitario" orden={orden} manejarOrden={manejarOrden}>
                        Precio Unitario
                    </BotonOrden>

                    <BotonOrden campo="stock" orden={orden} manejarOrden={manejarOrden}>
                        Stock
                    </BotonOrden>

                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productosOrdenados.map((producto) => (
                    <tr key={producto.id_producto}>
                        <td>{producto.id_producto}</td>
                        <td>{producto.nombre_producto}</td>
                        <td>{producto.descripcion_producto}</td>
                        <td>{producto.id_categoria}</td>
                        <td>{producto.precio_unitario}</td>
                        <td>{producto.stock}</td>
                        <td>
                            {producto.imagenSrc ? (
                                <img
                                    src={producto.imagenSrc}
                                    alt={producto.nombre_producto}
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                            ) : (
                                "Sin imagen"
                            )}
                        </td>
                        <td>Acción</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaProductos;
