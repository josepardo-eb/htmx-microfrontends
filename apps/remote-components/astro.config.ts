import { defineConfig } from "astro/config";
import type {
  AstroIntegration,
  AstroIntegrationLogger,
  RouteData,
} from "astro";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

function createPlugin(): AstroIntegration {
  return {
    name: "@eventbrite/astro-remote-components",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        console.log("executing astro:config:setup");
      },
      "astro:build:ssr": (options: {
        manifest: any;
        entryPoints: Map<RouteData, URL>;
        logger: AstroIntegrationLogger;
      }) => {
        const routes: Record<string, any> = {};
        options.manifest.routes.forEach((entry: any) => {
          routes[entry.routeData.pathname] = {
            styles: entry.styles,
            scripts: entry.scripts,
          };
        });
        console.log(routes);
        console.log(JSON.stringify(routes));
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  build: {},
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    createPlugin(),
    react(),
    tailwind(),
  ],
});
