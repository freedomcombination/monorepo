import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export const SOURCE_MOCK: MDXRemoteSerializeResult = {
  compiledSource:
    '/*@jsxRuntime automatic @jsxImportSource react*/\nconst {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];\nconst {useMDXComponents: _provideComponents} = arguments[0];\nfunction MDXContent(props = {}) {\n  const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);\n  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {\n    children: _jsx(_createMdxContent, {})\n  })) : _createMdxContent();\n  function _createMdxContent() {\n    const _components = Object.assign({\n      h1: "h1",\n      p: "p",\n      em: "em"\n    }, _provideComponents(), props.components);\n    return _jsxs(_Fragment, {\n      children: [_jsx(_components.h1, {\n        children: "Hello"\n      }), "\\n", _jsxs(_components.p, {\n        children: [_jsx(_components.em, {\n          children: "Content"\n        }), " example"]\n      })]\n    });\n  }\n}\nreturn {\n  default: MDXContent\n};\n',
  frontmatter: {},
  scope: {},
}
