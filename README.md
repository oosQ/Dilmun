# Dilmun

Dilmun is a small JavaScript framework built without React, Vue, Angular, or
other high-level frameworks. It includes:

- Virtual DOM creation, rendering, and patching
- State management
- Event handling
- Hash-based routing
- A TodoMVC application built with the framework

## Run the project

From the project root, start any static HTTP server:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000/todoApp/](http://localhost:8000/todoApp/).

No installation or build step is required.

## Documentation

See [docs/README.md](docs/README.md) for the framework API, explanations, and
examples covering elements, attributes, events, nesting, state, DOM updates,
and routing.

## Structure

```text
framework/   Framework source code
todoApp/     TodoMVC example application
docs/        Framework documentation
```
