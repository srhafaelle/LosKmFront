import { SellRequest, SellResponse } from '@/types';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SalesService {
    protected http = inject(HttpClient);
    protected baseUrl = '/api/v1/ventas';

    /**
     * Registra nueva venta y genera guía del despacho.
     * @param request Se solicita toda la información referente a la venta del producto
     * @returns El objeto de la venta que permite generar el reporte que será impreso
     */
    processShipment(request: SellRequest): Observable<SellResponse> {
        return this.http.post<SellResponse>(`${this.baseUrl}/procesar`, request);
    }

    /**
     * Recupera la información sobre una venta existente por su identificador.
     * @param ventaId Identificador de la venta para poder buscarlo en base de datos
     * @returns Regresa la información de una venta, en caso de no existir no muestra ninguna información
     */
    reprintGuide(ventaId: string): Observable<SellResponse> {
        return this.http.get<SellResponse>(`${this.baseUrl}/${ventaId}`);
    }
}
