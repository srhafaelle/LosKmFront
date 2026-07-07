// Para manipulación de turnos
export type OpenTurnRequest = {
    puntoDistribucionId: string;
    nombreCentro: string;
};

export type SupplyOrder = {
    productoId: string;
    nombreProducto: string;
    totalLitrosEntregados: number;
};

export type TurnStatus = 'ABIERTO' | 'CERRADO';
export type TypeSell = 'BRIGADA' | 'MINERO_APOYO' | 'SUBSIDIO';

export type TurnResponse = {
    id: string;
    usuarioCajeroId: string;
    nombreCentro: string;
    estado: TurnStatus;
    fechaApertura: string;
    fechaCierre?: string;
    totalOroRecaudado: number;
    cantidadOperaciones: number;
    resumenInsumos: SupplyOrder[];
};

// Ventas
export type SellRequest = {
    tipoVenta: TypeSell;
    productoId: string;
    puntoDistribucionId: string;
    cantidad: number;
    beneficiarioId: string;
    beneficiarioNombre: string;
    observaciones?: string; // Opcional, pero obligatorio en caso de subsidio
};

export type SellResponse = {
    id: string;
    turnoId: string;
    numeroGuia: string;
    tipoVenta: TypeSell;
    productoId: string;
    nombreProducto: string;
    puntoDistribucionId: string;
    nombreCentro: string;
    usuarioCajeroId: string;
    cantidadEntregada: number;
    totalOroRecaudado: number;
    beneficiarioId: string;
    beneficiarioNombre: string;
    observaciones: string;
    fechaVenta: string;
};
