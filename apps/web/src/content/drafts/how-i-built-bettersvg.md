---
title: how i built BetterSVG
date: 'November 23, 2026'
description: 'how a conversation about Navii avatars turned into an SVG library'
---

i could've sworn i'd used a React library that made SVGs easy to work with. [Derrick](https://x.com/uxderrick) was building [Navii](https://navii.dev) and wanted a simpler way to render the avatars it generated in React and React Native. i went looking for the library i remembered and realised i'd been thinking of [Astro Icon](https://www.astroicon.dev/).

i liked that i could give it an icon name and get an SVG i could style. i wanted something that felt like that in React and could take the markup Navii was already generating. so i built a React component and published it as [`@mhaadi/svg`](https://www.npmjs.com/package/@mhaadi/svg).

## putting an avatar on the page

Navii has a monochrome avatar pack that uses `currentColor`. that's how an SVG shape can use the same colour as the text around it. load the avatar through an `<img>` and the SVG lives in its own document, so it can't see the page's text colour. put the same markup inline and the avatar can follow the theme. you can even change its colour on hover.

Navii already knew how to turn a seed into an SVG string. i wanted BetterSVG to take that string and handle the rest. i started with React, then added React Native, Vue, and Svelte. React Native was where i found out how much of my React setup i'd assumed would work everywhere.

i'd used Vite's `import.meta.glob` to find local SVG files. that code made its way into the entry point Expo loaded, and Metro had no idea what to do with it. i moved file discovery into the Vite entry point and gave the other adapters a way to register local SVGs explicitly. [that went out in 0.2.1](https://github.com/mhaadiabu/better-svg/releases/tag/v0.2.1).

## using it in Navii

once Navii started using BetterSVG in its SDKs, i got to see how well the handoff worked. the monochrome avatars could pick up the page's colour, and scoping SVG IDs per instance meant two copies of an avatar could each reference their own gradients and clip paths. when i added Solid, Astro, and Angular to BetterSVG, i could [build Navii SDKs for those frameworks](https://github.com/uxderrick/navii/pull/8) without changing the code that draws the avatars.

some Navii SDKs shipped a copy of the BetterSVG adapter in their own build to get around module resolution problems. it worked, but every BetterSVG fix would have to wait for Navii to rebuild and publish again. i later [moved several of the SDKs over to the installed adapter](https://github.com/uxderrick/navii/pull/10). React and Vue needed a small bridge to keep their CommonJS entry points working. i'd already seen the avatars render in my workspace. that told me very little about whether someone could load them from a fresh install.

i also thought about adding a way to target individual SVG nodes in BetterSVG. Navii's web avatars can blink and sway their antennae with CSS, and i wanted those same parts to move on native. Navii already knew which parts to animate, so i kept the Reanimated implementation there. i'd revisit a general API if i run into another case for it, like highlighting individual regions on an SVG map.

## an icon on my site stayed black

i moved some icons on this site from Astro Icon to BetterSVG and found that a few stayed black in dark mode. the shapes had black fills written directly on them. i could set the colour on the outer SVG all day and those shapes would still be black.

i wanted to pass `fill="currentColor"` to the component and have it apply to the actual drawing. SVG is written in XML, so i could parse it into a tree of elements, walk down to the shapes, and replace their fills. [that shipped in 0.3.1](https://github.com/mhaadiabu/better-svg/releases/tag/%40mhaadi/svg%400.3.1).

walking the tree was easy enough. deciding what to touch took longer. a mask can use colour to decide how much of a drawing shows through. recolour the mask along with the visible shapes and you can change which parts of the icon you see. i went in trying to fix a few dark-mode icons and came out with a much better idea of what i was asking a paint override to do.

i was learning something similar with sanitisation. BetterSVG can fetch an SVG and put its contents directly on the page. i had to decide what to keep from that file and what to strip out. review and regression cases caught places where i'd made assumptions about how attributes were read. [0.4.0](https://github.com/mhaadiabu/better-svg/releases/tag/%40mhaadi/svg%400.4.0) included that hardening and the fix for masks, alongside the first pass at icon catalogs and offline bundles.

## getting back to the icon name

for a while, using an icon pack meant installing it and then telling BetterSVG which icons to register. i had built the renderer, but i was still thinking about the one line i'd liked in Astro Icon.

```tsx
<SVG name="lucide:house" size={24} />
```

with the Vite plugin set up, BetterSVG can now find those [catalog icon names in source](https://svg.mhaadi.dev/docs#icon-catalog) and register the icons it finds. local files have their own case. an icon name can come from data the build hasn't seen, so BetterSVG can keep those files out of the initial JavaScript and load them when the app asks for them.

i also added a way to import a local SVG as a component in [0.5.0](https://x.com/mhaadiabu/status/2123691923689099741).

```tsx
import Logo from "./logo.svg?better-svg";

<Logo size={24} title="Acme" />;
```

Vite can parse and sanitise that file at build time. the component can render on the server and the SVG can be in the initial HTML. there's no reason for a browser to wait around for the library to find a logo that's been sitting in the repo the whole time.

for the release, i [recorded a short demo with Hugeicons](https://x.com/mhaadiabu/status/2123696612581257476). type an icon name, see it render, then change the name and see it swap. autocomplete still didn't work in a fresh Vite TypeScript starter, and changing a name could leave a blank icon after a dev reload. both went into [0.5.1](https://github.com/mhaadiabu/better-svg/releases/tag/%40mhaadi/svg%400.5.1). i wanted someone to be able to open a fresh app and do what i'd just shown them.

## the browser run that gave me nothing

i'd had react-svg and SVGR in mind since the beginning. by this point i had to be more specific about what i was comparing. fetching an SVG over the network, looking up a registered name, and importing a file at build time are three different jobs.

i made parsed SVG cache lookups much faster in Node and wanted to know if a page full of different icons got faster too. Chromium launched and ran the benchmark, but both versions came back with zero valid samples. i held off on merging the performance PRs. i had a number for a cache lookup and still had no idea what the change did to the page.

i'd been meaning to try Ardia and figured this was a good first job for it. i reran the suite with the [Ardia CLI](https://github.com/ardia-browser/ardia/blob/main/docs/cli.md). it turned out to be a great way to do browser work with agents. the agent can use the browser i have open to check whether a local test page actually rendered, inspect console errors when it didn't, and rerun the benchmark after a fix. i can open the same tab and see what it's looking at. [i posted about that first try](https://x.com/mhaadiabu/status/2123957787721969708).

the rerun finished all 72 browser runs and gave me 1,080 valid warm samples. the mixed-icon page still showed no clear speedup from the cache change. mounting 1,000 copies of the same URL SVG again in a warmed-up browser took 94.5 ms on the 0.5.2 candidate, down from 124.2 ms on 0.4.2. the static imports built faster than the alternatives i tested, but still shipped a few kilobytes more gzip JavaScript. i put the [raw results in the repo](https://github.com/mhaadiabu/better-svg/blob/a6b0925a79f52c907570d8c72c43f2edfcb4460c/packages/benchmarks/baselines/2026-11-21-performance-stack/README.md) because it's easy to read the best number and miss what happened on the one-icon page.

## where i'm at now

i'm holding off on publishing 0.5.2 for now. i've also been [working on the Next.js integration](https://github.com/mhaadiabu/better-svg/pull/71) so file discovery, catalog autocomplete, and static imports can work with both webpack and Turbopack. and i still want to see how much JavaScript i can take out of an app that imports one icon.

i started with an SVG Derrick already had and wanted on the screen. a few releases later i still open a fresh app and try to put one icon on the screen. it's a good way to find the next bit of setup i want to get rid of.

later nerds
