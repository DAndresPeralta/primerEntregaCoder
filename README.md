# **Back-End Módulo 1 CoderHouse**

# Primer Entrega E-Commerce

Se desarrollará un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra en el e-commerce

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Autores y Reconocimientos](#autores-y-reconocimientos)
6. [Contactos y Soporte](#contactos-y-soporte)

## Instalación

### Requisitos previos

- Node.js v20.15.1
- Express v4.19.2

### Instrucciones de instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/DAndresPeralta/primerEntregaCoder.git
   ```

## Configuración

### Variables de entorno

`PORT`: El puerto en el que la aplicación se ejecutará (por defecto: 8080).\

## Uso

## Endpoints de la API

### API/PRODUCTS

**GET** `/api/products`: Obtiene la lista de productos.\
**GET** `/api/products/:id`: Obtiene el producto correspondiente al id enviado por url params.\
**POST** `/api/products`: Crea un nuevo producto.\
**PUT** `/api/products/:id`: Modifica atributos en un producto existente.\
**DELETE** `/api/products/:id`: Elimina el producto correspondiente al id enviado por url params.\

### API/CARTS

**GET** `/api/carts/:id`: Obtiene la información del carrito correspondiente al id enviado por url params.\
**POST** `/api/carts`: Crea un nuevo carrito.\
**POST** `/api/carts/:cid/product/:pid`: Agrega un producto a el carrito seleccionado.\
**DELETE** `/api//carts/:cid`: Elimina el carrito correspondiente al id enviado por url params.

## Estructura del proyecto

```
proyecto/
├── src/
│   ├── routes/
│   │       └── carts.router.js
│   │       └── products.router.js
│   ├── utils/
│   │       └── carts.utils.js
│   │       └── products.utils.js
│   └── app.js
└── README.md
```

## Autores y reconocimientos

- Dante Andrés Peralta - Estudiante Back-End

## Contacto y soporte

Para preguntas o soporte, contacta a d.andresperalta@outlook.com.
