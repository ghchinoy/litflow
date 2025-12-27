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

## Live Example

<lit-flow style="height: 300px; display: block; border: 1px solid #ccc;" pan-on-drag="false">
  <lit-node id="1" type="default" label="Hello" position-x="50" position-y="50"></lit-node>
  <lit-node id="2" type="default" label="LitFlow" position-x="200" position-y="150"></lit-node>
</lit-flow>

*(Note: Live examples require the litflow library to be bundled and available in /public/litflow.js)*
