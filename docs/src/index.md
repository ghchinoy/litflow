---
layout: base.njk
title: LitFlow - xyflow + Lit
---

# LitFlow

**xyflow core integrated with Lit WebComponents.**

LitFlow is a project dedicated to creating Lit WebComponent examples and a library wrapper for `xyflow`. It leverages the core logic from the `xyflow` project while embracing the benefits of WebComponents and fine-grained reactivity.

## Key Features

- **Lit WebComponents**: Built from the ground up with Lit.
- **Light DOM**: Uses Light DOM for nodes and handles to ensure compatibility with `@xyflow/system`.
- **Fine-grained Reactivity**: Powered by `@lit-labs/signals`.
- **Material 3 Design**: Integrated with Material Design principles.

## Getting Started

Check out our [Tutorials](/tutorials/) to start building your first flow.

## Live Designer

Experience LitFlow as a complete authoring tool. Drag nodes from the palette, connect them, and see the live JSON configuration update in real-time.

<div class="designer-preview" style="border: 1px solid var(--primary-color); border-radius: 8px; overflow: hidden; margin: 2rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <iframe 
    src="/examples/designer/index.html" 
    style="width: 100%; height: 600px; border: none; display: block;"
    title="LitFlow Designer"
  ></iframe>
</div>

[Open Designer in new window](/examples/designer/index.html)

---

## Acknowledgements

LitFlow is built upon the incredible work of the **[xyflow](https://xyflow.com/)** team. We would like to thank them for their excellent xyflow core system and their continued, inspiring support of the open-source community.
