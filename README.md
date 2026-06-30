# KilometroOperativo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Environment variables

Para que la aplicación funcione sin problemas es necesario agregar el apartado de variables de entorno. Para el mismo es necesario usar el siguiente comando:

```bash
ng g environments
```

Posteriormente debe realizar los siguientes cambios en el archivo *environment.development.ts* y *environment.ts* con el uso del siguiente esquema:

```typescript
export const environment = {
    production: false || true, // En caso del archivo environment.development.ts se usa en valor false,
    apiUrl: `https://url-de-api`, // Importante para que las peticiones puedan llegar al destino deseado
}
```
