import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({}),
		react(),
		viteTsConfigPaths({
			// https://tanstack.com/router/latest/docs/framework/react/start/path-aliases
			projects: ["./tsconfig.json"],
		}),
	],
});
