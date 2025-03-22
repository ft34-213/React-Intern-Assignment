import React, { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import VariableExtension from "./VariableExtension.js";
import VariablePopover from "./VariablePopover.jsx";
import "../styles/editor.css";

const Editor = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [StarterKit, VariableExtension],
    content: "<p>Type {{ to insert a variable...</p>",
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      if (text.includes("{{")) {
        setShowPopover(true);
        const pos = editor.view.coordsAtPos(editor.state.selection.from);
        setPosition({ top: pos.top + 30, left: pos.left });
      } else {
        setShowPopover(false);
      }
    },
  });

  const insertVariable = useCallback(
    (variable) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .insertContent(`<span data-variable id="${variable.id}" label="${variable.label}">{{${variable.label}}}</span>`)
        .run();
      setShowPopover(false);
    },
    [editor]
  );

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
      {showPopover && (
        <div className="popover-container" style={{ top: position.top, left: position.left }}>
          <VariablePopover onSelect={insertVariable} />
        </div>
      )}
    </div>
  );
};

export default Editor;
