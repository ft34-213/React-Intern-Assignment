import { Node } from "@tiptap/core";

const VariableExtension = Node.create({
  name: "variable",

  inline: true,
  group: "inline",
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      label: { default: null },
      value: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-variable]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      { 
        "data-variable": "", 
        class: "variable-token" 
      },
      `{{${HTMLAttributes.label}}}`
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const span = document.createElement("span");
      span.classList.add("variable-token");
      span.innerText = `{{${node.attrs.label}}}`;
      return { dom: span };
    };
  },
});

export default VariableExtension;
