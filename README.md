#Tema: furodtema? JIRA copycat amugy
##Create read van 
##ezt az accot nezzetek
###email:    test@test.test
###password: testest
##amit meg lehet nezni:
- login,
- signup,
- home,
- projektek,
- azokon belul issuek,
- profil,
- create gomb fent,
- create projekt kartya a homeba,
- sidebar dolgok,
- logout

ponozashoz help:
| Feladat                                                                 | Pont | Max Pont |
|------------------------------------------------------------------------|------|----------|
| **Fordítási hiba nincs**                                                 | 0,5  | 0,5      |
| **Futtatási hiba nincs**                                                 | 0    | 0,5      |
| **Adatmodellek a /src/app/types**                                        | 2    | 2        |
| **Reszponzivitás a /src/app/shared/navbar @media**                       | 6    | 6        |
| **Attribútum direktívák: ngClass és ngModelt használtam**               | 1    | 2        |
| **Vezérlési direktívák: rengeteg @for és @if van**                       | 2    | 2        |
| **Szülő-gyermek adatátadás: asszem 2 páros van**                        | 1,5  | 3        |
| **Materialok: nagyon sok van, de főleg a navbarban, create-issue-ban és a home-ban** | 5    | 5        |
| **2 Pipe a src/app/shared/pipes-ba**                                     | 2    | 2        |
| **Angular form-ok: signin, signup, create-issue, create-project**       | 4    | 4        |
| **Elég sok ngOnInit van, de van ngOnDestroy is**                         | 2    | 2        |
| **Csak create/read műveletek**                                           | 2    | 4        |
| **Injectálva vannak**                                                   | 1    | 1        |
| **Van 4 db where lekérdezés a project.service és issue.service-ben**    | 8    | 8        |
| **Van néhány route a /src/app/app.routes-ban**                           | 4    | 4        |
| **AppGuard pipa**                                                       | 1    | 1        |
| **Védi az útvonalakat**                                                 | 1    | 1        |
| **Szubjektívan meg elég jó lett**   (na legyszi legyszi)                                     | 7    | 7        |
| **Összesen**                                                            | 50   | 57       |
| **Bízok Bennetek!**                                                     | -    | -        |

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

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

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

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
