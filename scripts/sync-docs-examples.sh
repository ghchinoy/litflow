#!/bin/bash

# Ensure we are in the project root
mkdir -p docs/_site/examples

# Copy examples to the docs site
cp -r examples/* docs/_site/examples/

# Fix imports in all index.html files in examples to point to the bundled library
# This matches the logic in .github/workflows/deploy-docs.yml
find docs/_site/examples -name "index.html" -exec sed -i "s|import '../../src/index.ts';|import '/public/litflow.js';|g" {} +
find docs/_site/examples -name "index.html" -exec sed -i "s|import '../src/index.ts';|import '/public/litflow.js';|g" {} +
find docs/_site/examples -name "index.html" -exec sed -i "s|import '../../../src/index.ts';|import '/public/litflow.js';|g" {} +

# Add import map to examples to handle dependencies (lit, xyflow, etc.)
# This ensures the standalone examples work when served from the docs site
find docs/_site/examples -name "index.html" -exec sed -i '/<head>/a \    <script type="importmap">{ "imports": { "lit": "https://esm.sh/lit?bundle", "lit/": "https://esm.sh/lit/", "@lit-labs/signals": "https://esm.sh/@lit-labs/signals", "@xyflow/system": "https://esm.sh/@xyflow/system", "d3-drag": "https://esm.sh/d3-drag", "d3-interpolate": "https://esm.sh/d3-interpolate", "d3-selection": "https://esm.sh/d3-selection", "d3-zoom": "https://esm.sh/d3-zoom" } }</script>' {} +

echo "✅ Examples synced and patched for docs site."
