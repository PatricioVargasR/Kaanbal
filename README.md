# Kaanbal

Este es el respositorio oficial de **Kaanbal** en donde se estarán subiendo todas las
actualizaciones pertienentes a la plataforma, esperemos que este proyecto pueda ir
más hacía delante.


## Desarrolladores

* [@PatricioVargasR](https://github.com/PatricioVargasR)
* [@JorgeAlfonsoLDiaz](https://github.com/JorgeAlfonsoLDiaz)
* [@Alonso-Dominguez](https://github.com/Alonso-Dominguez)

## Requisitos

Tienes que tener las siguientes herramientas descargadas:
* Node.js, si todavía no lo tienes instalado, da click [aquí](https://nodejs.org/en/download/package-manager).
* npm, debería de venir instalado con Node.js.
* pnpm, administrador de paquetes utilizado en este proyecto, si todavía no lo tienes instalado, da click [aquí](https://pnpm.io/es/installation).


## Consideraciones

Primero, instala todas las dependencias si es necesario, con el comando:

```bash
pnpm install
```

Una vez que tienes instalado todo, debes de correr el siguiente comando si los componentes utilizando de [shadcn/ui](https://ui.shadcn.com/) marcan error:

```bash
# Inicializa la librería
pnpm dlx shadcn@latest init

# Configuraciones a tener en cuenta
echo "Which style would you like to use? › Default"
echo "Which color would you like to use as base color? › Default"
echo "Do you want to use CSS variables for colors? › yes"
```
Una vez que todo está correcto, ejecuta el siguiente comando en la raíz del proyecto:

```bash
pnpm run dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador favorito y ve el resultado en pantalla

Puedes empezar a editar la página modificando `app/page.tsx`. La página se auto actualiza cada que editas el archivo

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) que automaticamente carga y optimiza [Geist](https://vercel.com/font), una nueva fuente de la familia de Vercel.

## Uso

Algunos de los comandos que utilizarás serán los siguientes:

```bash
# Iniciar el proyecto en modo desarrollo
pnpm run dev

# Instalar alguna dependencia
pnpm install [nombre de la dependencia]

# Actualizar dependencias
pnpm up

# Instalar algún componente de shadcn/ui
pnpm dlx shadcn@latest add [nombre del componente]

# Agregar una dependencia al proyecto, si la tienes instalada, solo la reutilizas
pnpm add [nombre de la dependencia]
```

## Estructura inicial

A continuación, se retrata la estructura inicial del proyecto, se utiliza las arquitecturas de cliente-servidor, n-capas y microservicios, para más aclaración se utilizan comentarios generales que indican el por qué de cada elemento

```bash
├── app
│   ├── api                             # Llamada a los servicios externos
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── middleware                      # Autenticación principal
│   ├── (usuario)                       # Páginas privadas, autenticadas
│   └── (publico)                       # Páginas públicas
│       ├── acerca_nosotros
│       │   └── page.tsx
│       ├── layout.tsx
│       ├── page.tsx
│       └── precios
│           └── page.tsx
├── components                          # Componentes reutilizables
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       └── sheet.tsx
├── components.json
├── db                                  # Módelos de datos y conexión a la base de datos
├── lib                                 # Utilidades y fucniones helper
│   └── utils.ts
├── next.config.mjs
├── next-env.d.ts
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public                              # Archivos estáticos accesibles públicamente
├── README.md
├── services                            # Lógica del negocio
├── tailwind.config.ts
└── tsconfig.json
```

## ¿Dudas?

Si tienes alguna duda de lo utilizado aquí, checa los siguientes documentos

- [Next.js](https://nextjs.org/docs) - Documentación de Next.js.
- [Learn Next.js](https://nextjs.org/learn) - tutorial de Next.js.
- [shadcn/ui ](https://ui.shadcn.com/docs) - Documentación de shadcn/ui.
- [pnpm](https://pnpm.io/es/motivation) - Documentación de pnpm.
- [node.js](https://nodejs.org/docs/latest/api/) - Documentación de node.js.
- [Next.js despliegue](https://nextjs.org/docs/app/building-your-application/deploying) - Documentación para desplegar una aplicación de Next.js.

## Desplegar en Vercel

Todavía está por ver el hosting en caso de necesitarlo, aunque la forma más fácil de desplegar la aplicación, es utilizando la [Plataforma de Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
