# Portfolio repository guidelines

## Component architecture

- Always have the file 4 line indent
- Reuse components from `components/shared` for common controls and layout patterns before creating page-local equivalents.
- Keep shadcn primitives in `components/ui`. If a required primitive is missing, install it with the shadcn CLI together with its required dependencies.
- Put product- or page-specific compositions in `components/custom`. Custom components may compose shared components and shadcn primitives, but shared components must not import feature-specific services or domain types.
- The Playground sidebar lives in `components/custom/PlaygroundSidebar.tsx` and must compose `components/shared/AppSidebar.tsx`.

## Styling

- Use semantic Tailwind tokens such as `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-input`, and `bg-accent`.
- Do not introduce hard-coded colors when a semantic token exists. The portfolio palette is defined through CSS variables in `app/globals.css`.
- Preserve responsive behavior, keyboard navigation, visible focus states, and accessible labels when changing UI.
- Prefer `cn` from `lib/utils` for conditional class names.

## Playground

- Wrap Playground routes in `SidebarProvider` and use `SidebarInset` for page content.
- Use shared components such as `AppButton`, `AppTextarea`, `AppAvatar`, and `AppSidebar` for consistent controls and presentation.
- Keep API and chat state in the feature component; keep navigation and other reusable presentation in custom/shared components.

## HTTP requests

- All outbound requests from services and API route handlers must use the generic request utilities in `lib/http`.
- Do not call `fetch` directly from a service or API route. Extend the generic utility when a new response type or request option is needed.
- Keep JSON, text/HTML, multipart, and binary response handling centralized in the request utilities.

## Validation

- Run `npx tsc --noEmit`, scoped ESLint for changed files, and `npm run build` after UI changes.
- Do not modify unrelated user changes or resolve unrelated lint failures unless explicitly requested.
