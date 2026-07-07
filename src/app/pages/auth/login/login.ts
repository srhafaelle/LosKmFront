import { Authentication } from '@/core/auth/authentication';
import { ButtonComponent } from '@/shared/ui/button-component/button-component';
import { CardComponent } from '@/shared/ui/card-component/card-component';
import { InputComponent } from '@/shared/ui/input-component/input-component';
import { getControlError } from '@/shared/utils';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    imports: [
        InputComponent,
        CardComponent,
        ButtonComponent,
        NgOptimizedImage,
        ReactiveFormsModule,
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    // Inyección de dependencias: Formularios y Servicio de autenticación
    #formBuilder = inject(NonNullableFormBuilder);
    #authService = inject(Authentication);
    #router = inject(Router);

    // Formulario para el caso de uso de inicio de sesión.
    loginForm = this.#formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Analizar el comportamiento de los inputs sobre el formulario y regresar mensajes de error en caso de que existan.
    emailError(): string | false {
        return getControlError(this.loginForm.get('email'), {
            required: 'Campo obligatorio!',
            email: 'Ingresar correo válido!',
        });
    }

    passwordError(): string | false {
        return getControlError(this.loginForm.get('password'), {
            required: 'Campo obligatorio!',
            minlength: (err) => `Debe tener al menos ${err.requiredLength} caracteres!`,
        });
    }

    // Estados globales de la página
    globalError = signal<string | null>(null);
    isLoading = signal<boolean>(false);

    // Eventos que se pueden realizar sobre los componentes de la página, para este caso se prioriza en el inicio de sesión sobre el formulario.
    logIn() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.globalError.set(null);

        this.#authService
            .login(this.loginForm.getRawValue())
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                }),
            )
            .subscribe({
                next: () => {
                    this.#router.navigate(['/dashboard/index']);
                },
                error: (error) => {
                    console.error(`Error al iniciar sesión: ${error}`);
                    this.globalError.set(`Credenciales inválidas. Por favor, intente nuevamente.`);
                },
            });
    }
}
