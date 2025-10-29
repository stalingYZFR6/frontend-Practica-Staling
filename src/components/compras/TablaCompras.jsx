import { Table, Spinner } from "react-bootstrap";
import { useState } from "react";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaCompras = ({ compras, cargando }) => {
    const [orden, setOrden] = useState({ campo: "id_categoria", direccion: "asc" });

    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion:
                prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    const comprasOrdenadas = [...compras].sort((a, b) => {
        const valorA = a[orden.campo];
                const valorB = b[orden.campo];
        
                if (typeof valorA === "number" && typeof valorB === "number") {
                    return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
                }
        
                const comparacion = String(valorA).localeCompare(String(valorB));
                return orden.direccion === "asc" ? comparacion : -comparacion;
            });

    if (cargando){
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
                        <BotonOrden campo="id_compra" orden={orden} manejarOrden={manejarOrden}>
                            ID Compra
                        </BotonOrden>

                        <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
                            ID Empleado
                        </BotonOrden>

                        <BotonOrden campo="fecha_compra" orden={orden} manejarOrden={manejarOrden}>
                            Fecha Compra
                        </BotonOrden>

                        <BotonOrden campo="total_compra" orden={orden} manejarOrden={manejarOrden}>
                            Total Compra
                        </BotonOrden>

                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasOrdenadas.map((compra) => {
                        return (
                            <tr key={compra.id_compra}>
                                <td>{compra.id_compra}</td>
                                <td>{compra.id_empleado}</td>
                                <td>{compra.fecha_compra}</td>
                                <td>{compra.total_compra}</td>
                                <td>Acción</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default TablaCompras;
