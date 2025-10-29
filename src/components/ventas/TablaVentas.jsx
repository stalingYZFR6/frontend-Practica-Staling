
import { Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaVentas = ({ ventas, cargando }) => {
    const [orden, setOrden] = useState({ campo: "id_categoria", direccion: "asc" });
    
        const manejarOrden = (campo) => {
            setOrden((prev) => ({
                campo,
                direccion:
                    prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
            }));
        };
    
        const ventasOrdenadas = [...ventas].sort((a, b) => {
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
            <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>
        );
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>

                    <tr>
                        <BotonOrden campo="id_venta" orden={orden} manejarOrden={manejarOrden}>
                            ID Venta
                        </BotonOrden>

                        <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
                            ID Cliente
                        </BotonOrden>

                        <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
                            ID Empleado
                        </BotonOrden>

                        <BotonOrden campo="fecha_venta" orden={orden} manejarOrden={manejarOrden}>
                            Fecha Venta
                        </BotonOrden>

                        <BotonOrden campo="total_venta" orden={orden} manejarOrden={manejarOrden}>
                            Total Venta
                        </BotonOrden>

                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => {
                        return (
                            <tr key={venta.id_venta}>
                                <td>{venta.id_venta}</td>
                                <td>{venta.id_cliente}</td>
                                <td>{venta.id_empleado}</td>
                                <td>{venta.fecha_venta}</td>
                                <td>{venta.total_venta}</td>
                                <td>Acción</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default TablaVentas;
