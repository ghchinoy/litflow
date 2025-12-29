# Phase 1: Visual Surface Architecture Analysis

**Date:** 2025-12-29
**Subject:** Breadboard Visual Editor vs. LitFlow

## 1. Executive Summary
This analysis compares **LitFlow** (a lightweight `xyflow` wrapper) with **Breadboard** (a mature visual programming environment). The goal is to determine how LitFlow can evolve into a robust "Graph OS" interface by learning from Breadboard's architecture.

**Key Finding:** Breadboard does **not** use a third-party graph library. It implements a custom rendering engine (`bb-renderer`) using Lit, HTML (for nodes), and SVG (for edges). This allows for deep integration of data schemas into the node UI ("Chiclets", dynamic ports), but comes with the cost of maintaining a physics/layout engine.

## 2. Component Architecture Comparison

### The Renderer
*   **Breadboard (`bb-renderer`)**: A custom engine that manages its own camera, zoom, culling, and drag physics. It renders a collection of `Graph` objects.
*   **LitFlow (`lit-flow`)**: A wrapper around `xyflow/system`. It delegates physics and rendering to D3/SVG.
*   **Strategic Implication**: LitFlow should **retain xyflow**. Rebuilding a renderer is a distraction. The goal is to emulate Breadboard's *data capabilities* within `xyflow` nodes.

### The Node (`GraphNode`)
*   **Breadboard**: Schema-First. The `GraphNode` component takes a `NodeDescriptor` and generates ports dynamically based on the I/O schema (e.g., rendering an Image uploader for an `image` type input). It supports "Chiclets" for rich data visualization.
*   **LitFlow**: Template-First. Nodes are defined as static HTML templates with manually placed handles.
*   **Action Item**: Develop a `<lit-schema-node>` that generates handles and inputs from a JSON Schema.

### The Palette (`ComponentSelector`)
*   **Breadboard**: Store-Driven. The palette queries a `MutableGraphStore` to find available components (which can be standard nodes, subgraphs, or modules).
*   **LitFlow**: Static List.
*   **Action Item**: Implement a `GraphStore` or `Registry` to feed the palette dynamically.

## 3. Maturity Model

| Feature | Breadboard (Reference) | LitFlow (Current) | Maturity Gap |
| :--- | :--- | :--- | :--- |
| **Node UI** | **Schema-Driven**: Ports generated from JSON Schema. | **Static**: Hardcoded handles. | **CRITICAL** |
| **Data Model** | **GraphStore**: Central database for graph state, history, and subgraphs. | **JSON Array**: Simple list of objects. | **HIGH** |
| **Components** | **Modules/Kits**: Dynamic loading of components. | **Static List**: Hardcoded types. | **HIGH** |
| **Rich Data** | **Chiclets**: In-node visualization of JSON, Images, Audio. | **Text**: Simple label support. | **MEDIUM** |
| **Execution** | **Real-time**: Visualizes active/error states and data flow. | **None**: Purely a drawing tool. | **HIGH** |

## 4. GenAI Implications
Breadboard treats Generative AI nodes as first-class citizens:
*   **`isLLMContentBehavior`**: Nodes allow native rendering of Markdown and LLM responses.
*   **Streaming**: Visual states for "working", "waiting", and "streaming".
*   **Styling**: Distinct visual language for `.generative` nodes.

## 5. Strategic Recommendation
**"Lightweight Compliment" Strategy**:
1.  **Keep xyflow**: Use it for the "physics" and basic interaction.
2.  **Adopt Schema-Nodes**: Build a LitFlow node that renders Breadboard schemas.
3.  **Adopt GraphStore**: Use Breadboard's data structures (`GraphDescriptor`) as the source of truth.
