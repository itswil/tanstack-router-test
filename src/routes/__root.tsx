import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import * as React from "react";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>
				<Link
					to="/about"
					activeProps={{
						className: "font-bold",
					}}
				>
					About
				</Link>
				<Link
					to="/products"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Products
				</Link>
				<Link
					to="/products/search"
					search={{
						q: "",
						order: "asc",
						sortBy: "title",
					}}
					activeProps={{
						className: "font-bold",
					}}
				>
					Product Search
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
