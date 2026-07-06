import { ErrorMessages } from '@/types';
import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Función que buscar extraer el error de un campo de formularios reactivos para poder mostrar el error al momento en que el usuario deje de estar dentro del componente escribiendo y pase a escribir información en el siguiente componente.
 * @param control Elemento del formulario que se desea analizar para conseguir el error después de que haya salido salido del componente.
 * @param messages Record que permite listar los posibles errores que puedan estar asociados según el Validator que fue configurado junto con el mensaje que se desea mostrar al usuario.
 * @returns Mensaje personalizado para que el usuario pueda identificar el error que ha cometido, en caso contrario regresa falso para así ocultar el campo de mensaje.
 */
export function getControlError(
    control: AbstractControl | null,
    messages: ErrorMessages,
): string | false {
    if (!control || !control.touched || !control.errors) return false;

    for (const errorKey of Object.keys(messages)) {
        if (control.hasError(errorKey)) {
            const messageOrFn = messages[errorKey];

            if (typeof messageOrFn === 'function') {
                return messageOrFn(control.getError(errorKey));
            }

            return messageOrFn;
        }
    }
    return false;
}
