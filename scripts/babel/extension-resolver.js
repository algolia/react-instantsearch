// original source: https://github.com/shimataro/babel-plugin-module-extension-resolver
// To create proper ES Modules, the paths imported need to be fully-specified,
// and can't be resolved like is possible with CommonJS. To have large compatibility
// without much hassle, we don't use extensions *inside* the source code, but add
// them with this plugin.

const fs = require('fs');
const path = require('path');

const PLUGIN_NAME = 'babel-plugin-extension-resolver';

// InstantSearch.js/es is an ES Module, so needs complete paths,
// React-DOM also fails if the paths are incomplete
// For verification, see test/module/packages-are-es-modules.mjs
const importStartsWith = ['instantsearch.js/', 'react-dom/'];
const srcExtensions = ['.js', '.ts', '.tsx'];
const dstExtension = '.js';

module.exports = function extensionResolver(babel) {
  const { types } = babel;
  return {
    name: PLUGIN_NAME,
    visitor: {
      Program: {
        enter: (programPath, state) => {
          const { filename } = state;
          programPath.traverse(
            {
              ImportDeclaration(declaration) {
                handleImportDeclaration(types, declaration, filename);
              },
              ExportDeclaration(declaration) {
                handleExportDeclaration(types, declaration, filename);
              },
            },
            state
          );
        },
      },
    },
  };
};

function handleImportDeclaration(types, declaration, fileName) {
  const source = declaration.get('source');
  replaceSource(types, source, fileName);
}

function handleExportDeclaration(types, declaration, fileName) {
  const source = declaration.get('source');
  if (Array.isArray(source)) {
    return;
  }
  replaceSource(types, source, fileName);
}

function replaceSource(types, source, fileName) {
  if (!source.isStringLiteral()) {
    return;
  }
  const sourcePath = source.node.value;
  if (
    importStartsWith.every((prefix) => !sourcePath.startsWith(prefix)) &&
    !isRelativeDependency(sourcePath)
  ) {
    return;
  }
  const baseDir = path.dirname(fileName);

  let normalizedPath;
  if (isRelativeDependency(sourcePath)) {
    const resolvedPath = resolveRelativePath(baseDir, sourcePath);
    normalizedPath = normalizeRelativePath(resolvedPath);
  } else {
    const resolvedPath = resolveAbsolutePath(sourcePath);
    normalizedPath = normalizeAbsolutePath(resolvedPath);
  }

  source.replaceWith(types.stringLiteral(normalizedPath));
}

function resolveRelativePath(baseDir, sourcePath) {
  let resolvedPath = resolveRelativeExtension(baseDir, sourcePath);

  if (resolvedPath === null) {
    resolvedPath = resolveRelativeExtension(
      baseDir,
      path.join(sourcePath, 'index')
    );
  }

  if (resolvedPath === null) {
    throw new Error(`import for "${sourcePath}" could not be resolved`);
  }

  return resolvedPath;
}

function resolveAbsolutePath(sourcePath) {
  return require.resolve(sourcePath).split(['node_modules/'])[1];
}

function resolveRelativeExtension(baseDir, sourcePath) {
  const absolutePath = path.join(baseDir, sourcePath);
  if (isFile(absolutePath)) {
    return sourcePath;
  }
  for (const extension of srcExtensions) {
    if (isFile(`${absolutePath}${extension}`)) {
      return path.relative(baseDir, `${absolutePath}${dstExtension}`);
    }
  }
  return null;
}

function normalizeRelativePath(originalPath) {
  let normalizedPath = originalPath;
  if (path.sep === '\\') {
    normalizedPath = normalizedPath.split(path.sep).join('/');
  }
  if (normalizedPath[0] !== '.') {
    normalizedPath = `./${normalizedPath}`;
  }
  return normalizedPath;
}

function normalizeAbsolutePath(originalPath) {
  let normalizedPath = originalPath;
  if (path.sep === '\\') {
    normalizedPath = normalizedPath.split(path.sep).join('/');
  }
  return normalizedPath;
}

function isFile(pathName) {
  try {
    return fs.statSync(pathName).isFile();
  } catch (err) {
    return false;
  }
}

function isRelativeDependency(sourcePath) {
  return sourcePath[0] === '.';
}
