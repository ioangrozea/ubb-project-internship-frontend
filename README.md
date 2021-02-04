# Internship finder

Small demo of the application:
![WhatsApp Image 2021-02-04 at 18 03 16](https://user-images.githubusercontent.com/21227623/106935271-ce719a80-6723-11eb-8367-084940487548.jpeg)
![WhatsApp Image 2021-02-04 at 18 13 44](https://user-images.githubusercontent.com/21227623/106935323-e21d0100-6723-11eb-8186-f0323f089da6.jpeg)
![WhatsApp Image 2021-02-04 at 18 18 09](https://user-images.githubusercontent.com/21227623/106935299-d9c4c600-6723-11eb-8e1f-607aa56317fe.jpeg)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Getting Started

For the frontend to work you need to have the back end up and running. You can find that here [backend](https://github.com/ioangrozea/ubb_project).

## Architecture

The concept of architecture is mostly used in the backend word, but that does not mean that the term has no meaning for the frontend.
A good architecture helps you reuse the components easier and so create even more pieces that you can use later. Also, a good quality of code
is to be readable and for that you need a clean structure on which you can build.

![image](https://user-images.githubusercontent.com/21227623/106934788-3bd0fb80-6723-11eb-9d30-a4e50d36658f.png)

In the image above we can see architecture of the application. Each big component has its own package and based on the business logic we have there
one container, component, http, model, service. The container has all the components that have an Url that can be seen by the user in which the other
components will be injected. The components are simple angular elements that can be reused by the container ts. Http is the module that contains all 
the requests to the backend and will be used by the containers. The services have the logic, and the model have the Dto's.

![image](https://user-images.githubusercontent.com/21227623/106934616-fe6c6e00-6722-11eb-910d-5742ffd9e402.png)

Here we can see a most complex representation of the login module, and we can see how the structure works together. 
