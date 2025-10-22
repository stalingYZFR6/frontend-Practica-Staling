import { Table, Spinner } from "react-bootstrap";

// Importar las imágenes
import martillo from "../../assets/martillo.png";
import tornillos from "../../assets/tornillos.jpg";
import pintura from "../../assets/pintura.jpg";

const TablaProductos = ({ productos, cargando }) => {

    if (cargando) {
        return (
            <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>
        );
    }

    // Asignar la imagen según el nombre del producto
    const productosConImagen = productos.map(p => {
        let imagen = null;


        const nombre = p.nombre_producto.toLowerCase(); // ignorar mayúsculas

        if (nombre === "martillo") imagen = martillo;
        if (nombre === "tornillos") imagen = tornillos;
        if (nombre === "pintura") imagen = pintura;

        return { ...p, imagenSrc: imagen };
    });

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID Producto</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>ID Categoría</th>
                        <th>Precio Unitario</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosConImagen.map((producto) => (
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
        </>
    )
}

export default TablaProductos;

