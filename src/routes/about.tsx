import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: AboutComponent,
});

function AboutComponent() {
	return (
		<div className="p-2">
			<h1 className="text-3xl">About</h1>
		</div>
	);
}
