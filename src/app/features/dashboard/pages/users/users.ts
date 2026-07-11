import { Component, inject, OnInit, signal } from '@angular/core';
import {
    FormArray,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '@/features/dashboard/services/users/user-service';
import { InputComponent, ModalComponent, ButtonComponent } from '@/shared/ui';
import { User } from '@/types';
import { getControlError } from '@/shared/utils';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPlus, bootstrapTrash } from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'app-users',
    imports: [
        ModalComponent,
        InputComponent,
        ReactiveFormsModule,
        ButtonComponent,
        FormsModule,
        NgIcon,
    ],
    templateUrl: './users.html',
    styleUrl: './users.css',
    viewProviders: [provideIcons({ bootstrapTrash, bootstrapPlus })],
})
export class Users implements OnInit {
    // Inject services
    readonly #fb = inject(NonNullableFormBuilder);
    readonly #userService = inject(UserService);

    // Internal state
    isLoading = signal<boolean>(false);
    isModalOpen = signal<boolean>(false);
    errors = signal<string[]>([]);
    listOfUsers = signal<User[]>([]);

    openModal() {
        this.isModalOpen.set(true);
    }

    closeModal() {
        this.createUserForm.reset();
        this.isModalOpen.set(false);
    }

    createUserForm = this.#fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        roles: this.#fb.array<string>([], [Validators.required]),
    });
    newRoleInput = signal<string>('');

    get roles(): FormArray {
        return this.createUserForm.get('roles') as FormArray;
    }

    addRole() {
        const name = this.newRoleInput().trim();
        console.log('Prueba', name);

        if (name) {
            this.roles.push(this.#fb.control(name, Validators.required));
            console.table(this.roles.controls);
            this.newRoleInput.set('');
        }
    }

    removeRole(index: number) {
        this.roles.removeAt(index);
    }

    // Errors for every field of the form
    emailError(): string | false {
        return getControlError(this.createUserForm.get('email'), {
            required: 'Campo obligatorio!',
            email: 'Ingresar correo válido!',
        });
    }

    firstNameError(): string | false {
        return getControlError(this.createUserForm.get('firstName'), {
            required: 'Campo obligatorio!',
        });
    }

    lastNameError(): string | false {
        return getControlError(this.createUserForm.get('lastName'), {
            required: 'Campo obligatorio!',
        });
    }

    rolesError(): string | false {
        return getControlError(this.createUserForm.get('roles'), {
            required: 'Campo obligatorio!',
        });
    }

    passwordError(): string | false {
        return getControlError(this.createUserForm.get('password'), {
            required: 'Campo obligatorio!',
            minlength: (err) => `Debe tener al menos ${err.requiredLength} caracteres!`,
        });
    }

    ngOnInit() {
        this.isLoading.set(true);
        this.getAllUsers();
    }

    createUser() {
        if (this.createUserForm.invalid) {
            const { confirmPassword, ...payload } = this.createUserForm.getRawValue();
            console.table(payload);
            return;
        }

        this.isLoading.set(true);
        this.errors.set([]);

        const { confirmPassword, ...payload } = this.createUserForm.getRawValue();

        if (confirmPassword !== payload.password) {
            this.errors.set(['Contraseñas no coinciden']);
        }

        console.table(payload);

        // this.#userService.createUser({ active: true, ...payload }).subscribe({
        //     next: () => {
        //         this.isLoading.set(false);
        //         this.isModalOpen.set(false);
        //     },
        // });
    }

    getAllUsers() {
        this.#userService.getAllUsers().subscribe({
            next: (users) => {
                this.listOfUsers.set(users);
                this.isLoading.set(false);
            },
        });
    }
}
