import type { QueryClient } from "@tanstack/react-query";
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-6 text-lg">
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

			<div className="p-4">
				<Outlet />
			</div>

			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
