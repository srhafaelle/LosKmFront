import { ApiResponse, OpenTurnRequest, TurnResponse } from '@/types';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TurnsService {
    protected http = inject(HttpClient);
    protected baseUrl = '/api/v1/turnos';

    /**
     * Destinado a obtener el turno que esté abierto para poder mostrar el resumen que tenga en ese momento el usuario.
     *
     * @returns Un observable que será procesado dentro del componente que llame a la función
     */
    getOpenTurn(): Observable<ApiResponse<TurnResponse>> {
        return this.http.get<ApiResponse<TurnResponse>>(`${this.baseUrl}/activo`);
    }

    /**
     * Destinado para abrir un nuevo turno en el momento en que se escoja el lugar de despacho para el punto de venta, una vez que este lugar exista no se vuelve a preguntar por el punto de distribución hasta que se haya cerrado el turno.
     *
     * @param request Se solicita el identificador del punto de distribución desde donde se abre el turno
     * @returns Un observable que será procesado dentro del componente que llame a la función
     */
    openTurn(request: OpenTurnRequest): Observable<ApiResponse<TurnResponse>> {
        return this.http.post<ApiResponse<TurnResponse>>(`${this.baseUrl}/abrir`, request);
    }

    /**
     * Destinado para cerrar un turno existente, una vez que este turno esté cerrado no se puede volver a abrir.
     *
     * @param request Se solicita el identificador del punto de distribución desde donde se abre el turno
     * @returns Un observable que será procesado dentro del componente que llame a la función
     */
    closeTurn(): Observable<ApiResponse<TurnResponse>> {
        return this.http.post<ApiResponse<TurnResponse>>(`${this.baseUrl}/cerrar`, {});
    }
}
