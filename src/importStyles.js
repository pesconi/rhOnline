// Automatically import all SCSS files in the pages directory
const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);
requireAll(require.context('./pages', true, /\.scss$/));
requireAll(require.context('./components', true, /\.scss$/));

