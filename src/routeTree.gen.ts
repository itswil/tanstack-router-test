/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as ProductsSearchImport } from './routes/products/search'
import { Route as ProductsIdImport } from './routes/products/$id'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsSearchRoute = ProductsSearchImport.update({
  path: '/products/search',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIdRoute = ProductsIdImport.update({
  path: '/products/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/products/$id': {
      id: '/products/$id'
      path: '/products/$id'
      fullPath: '/products/$id'
      preLoaderRoute: typeof ProductsIdImport
      parentRoute: typeof rootRoute
    }
    '/products/search': {
      id: '/products/search'
      path: '/products/search'
      fullPath: '/products/search'
      preLoaderRoute: typeof ProductsSearchImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/products/$id': typeof ProductsIdRoute
  '/products/search': typeof ProductsSearchRoute
  '/products': typeof ProductsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/products/$id': typeof ProductsIdRoute
  '/products/search': typeof ProductsSearchRoute
  '/products': typeof ProductsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/products/$id': typeof ProductsIdRoute
  '/products/search': typeof ProductsSearchRoute
  '/products/': typeof ProductsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/products/$id' | '/products/search' | '/products'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/products/$id' | '/products/search' | '/products'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/products/$id'
    | '/products/search'
    | '/products/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  ProductsIdRoute: typeof ProductsIdRoute
  ProductsSearchRoute: typeof ProductsSearchRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  ProductsIdRoute: ProductsIdRoute,
  ProductsSearchRoute: ProductsSearchRoute,
  ProductsIndexRoute: ProductsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/products/$id",
        "/products/search",
        "/products/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/products/$id": {
      "filePath": "products/$id.tsx"
    },
    "/products/search": {
      "filePath": "products/search.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */