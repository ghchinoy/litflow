# Phase 3: GenAI & Gemini Integration Analysis

**Date:** 2025-12-29
**Subject:** Breadboard GenAI Rendering & Behaviors

## 1. Executive Summary
Breadboard treats Generative AI not as a "plugin" but as a core behavior of the graph. Nodes declare their AI nature via **Schema Behaviors** (`llm-content`), which triggers specialized rendering ("Chiclets") and visual styling. LitFlow must adopt this Schema-First approach to support multimodal AI flows effectively.

## 2. Schema Behaviors (`behaviors.ts`)
Breadboard defines specific behaviors that LitFlow should implement:
*   `llm-content`: Indicates the port carries multimodal content (Text, Image, Audio).
*   `generative`: Indicates the node generates new content (e.g., Gemini model).
*   `hint-preview`: Indicates the value should be shown on the node surface.

## 3. Rendering Architecture: "Chiclets"
Data on the node surface isn't just text. It is rendered as **Chiclets** (`createChiclets.ts`):
*   **Definition**: Small, pill-shaped UI elements that represent data parts.
*   **Function**: They parse the content (e.g., `{{placeholder}}`) and render icons based on MIME type (Image, Audio, JSON).
*   **Styling**: They use semantic colors (`.generative` uses `var(--ui-generate-secondary)`).

## 4. Implementation Strategy for LitFlow

### 1. `lit-schema-node`
We need a new node type that accepts a `Breadboard NodeDescriptor` and:
*   Iterates over `inputSchema` and `outputSchema`.
*   Checks `schema.behavior` for `llm-content`.
*   Renders a `<lit-chiclet>` component for previewable data.

### 2. `lit-chiclet`
A new Lit component that:
*   Takes `LLMContent` (or a subset) as input.
*   Determines the type (Text, Image, Audio).
*   Renders an Icon + Label (truncated).
*   (Advanced) Supports "Expand to Preview" (lightbox).

### 3. Visual Language
Adopt Breadboard's color system for semantic clarity:
*   **Generative**: Purple/Violet.
*   **Input**: Blue/Cyan.
*   **Output**: Orange/Amber.
*   **Asset**: Green/Teal.

## 5. Conclusion
To support "Gemini Future Features", LitFlow cannot rely on hardcoded `<input>` fields. It must build a rendering pipeline that transforms **Data Schemas** into **Visual Chiclets**. This is the key difference between a "Form Builder" and an "AI Flow Editor".
