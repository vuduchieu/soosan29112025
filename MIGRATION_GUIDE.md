# Astro Migration Guide

## Project Setup Complete!

Your Astro project is now initialized with:
- ✅ Astro v5.16
- ✅ React Integration (@astrojs/react)
- ✅ Tailwind CSS v4
- ✅ All existing dependencies (Shadcn UI, Lucide React, etc.)

## Directory Structure

```
src/
├── layouts/
│   └── BaseLayout.astro       # Main layout template
├── pages/                      # File-based routing
│   ├── index.astro            # Homepage (/)
│   ├── gioi-thieu.astro       # About page (/gioi-thieu)
│   ├── lien-he.astro          # Contact (/lien-he)
│   ├── so-sanh.astro          # Compare (/so-sanh)
│   ├── san-pham/
│   │   ├── index.astro        # Catalog (/san-pham)
│   │   └── [id].astro         # Product detail (/san-pham/[id])
│   └── tin-tuc/
│       ├── index.astro        # Blog list (/tin-tuc)
│       └── [slug].astro       # Blog post (/tin-tuc/[slug])
├── components/                 # Your existing React components
├── data/                       # Your existing data files
└── lib/                        # Utilities
```

## Migration Steps

### 1. Page Routing Mapping

| React Router (Old) | Astro Pages (New) |
|-------------------|-------------------|
| `/` → Index.tsx | `/` → index.astro |
| `/about` → AboutPage.tsx | `/gioi-thieu` → gioi-thieu.astro |
| `/contact` → ContactPage.tsx | `/lien-he` → lien-he.astro |
| `/catalog` → TruckCatalog.tsx | `/san-pham` → san-pham/index.astro |
| `/truck/:id` → TruckDetail.tsx | `/san-pham/[id]` → san-pham/[id].astro |
| `/blog` → BlogPage.tsx | `/tin-tuc` → tin-tuc/index.astro |
| `/blog/:slug` → BlogPostPage.tsx | `/tin-tuc/[slug]` → tin-tuc/[slug].astro |
| `/compare` → ComparePage.tsx | `/so-sanh` → so-sanh.astro |

### 2. Component Strategy

**Server-Rendered (Static):**
- Header (mostly static)
- Footer
- Hero sections
- SEO-critical content

**Client-Side (Interactive):**
```astro
---
import MobileMenu from '../components/MobileMenu.tsx';
import ContactForm from '../components/ContactForm.tsx';
---

<!-- Use client:load for immediate interactivity -->
<MobileMenu client:load />

<!-- Use client:visible for lazy loading -->
<ContactForm client:visible />

<!-- Use client:idle for non-critical features -->
<Newsletter client:idle />
```

### 3. Converting React Router Links

**Before (React Router):**
```tsx
import { Link } from 'react-router-dom';
<Link to="/san-pham">Products</Link>
```

**After (Astro):**
```tsx
// In React components used within Astro
<a href="/san-pham">Products</a>
```

### 4. Dynamic Routes with getStaticPaths

**Example: Product Detail Page**

```astro
---
// src/pages/san-pham/[id].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { allTrucks } from '../../data/products';

export async function getStaticPaths() {
  return allTrucks.map((truck) => ({
    params: { id: truck.id },
    props: { truck },
  }));
}

const { truck } = Astro.props;
---

<BaseLayout title={truck.name}>
  <h1>{truck.name}</h1>
  <p>{truck.description}</p>
</BaseLayout>
```

### 5. Data Imports

Your existing data files in `src/data/` can be imported directly:

```astro
---
import { allTrucks } from '../data/products';
import { blogPosts } from '../data/blogData';
---
```

## Next Steps

1. **Paste Your Components**: Copy React components from your existing project
2. **Create Astro Pages**: I'll help convert your page components to .astro format
3. **Update Links**: Replace all `<Link to="">` with `<a href="">`
4. **Add Client Directives**: Mark interactive components with appropriate client:* directives
5. **Test**: Run `npm run dev` to test the migration

## Commands

- `npm run dev` - Start Astro dev server (port 4321)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run dev:old` - Start old Vite dev server (if needed)

## Ready for Migration!

You can now start pasting your components and data files. I'll help you:
1. Convert page components to Astro format
2. Update routing and links
3. Add proper client directives
4. Optimize for SEO and performance
