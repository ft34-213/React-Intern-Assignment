import { Node } from "@tiptap/core";

const VariableExtension = Node.create({
  name: "variable",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      value: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-variable]" }];
  },

  renderHTML({ node }) {
    return [
      "span",
      {
        "data-variable": node.attrs.value,
        class: "bg-blue-100 text-blue-700 px-2 py-1 rounded",
      },
      node.attrs.value,
    ];
  },

  addCommands() {
    return {
      insertVariable:
        (variable) =>
        ({ chain }) => {
          return chain()
            .insertContent(`<span data-variable="${variable}">${variable}</span>`)
            .run();
        },
    };
  },
});

export default VariableExtension;
