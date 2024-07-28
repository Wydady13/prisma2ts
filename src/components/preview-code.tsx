import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef } from "react";

function CodeEditor({
  value,
  defaultValue,
}: {
  value: string;
  defaultValue: string;
}) {
  const editorRef = useRef(null);

  // function handleEditorDidMount(editor: any, monaco: Monaco) {
  //   //@ts-ignore
  //   monaco.editor.defineTheme("github-dark", githubTheme);
  //   monaco.editor.setTheme("github-dark");

  //   editorRef.current = editor;
  // }
  const MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontFamily:
      'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 14,
    lineHeight: 21,
    theme: "vs-dark",
    minimap: { enabled: false },
    wordWrap: "on",
    wordWrapColumn: 40,
    wrappingIndent: "indent",
    glyphMargin: true,
    lineNumbersMinChars: 2,
    folding: false,
    fixedOverflowWidgets: true,
    scrollbar: {
      horizontalScrollbarSize: 21,
    },
    quickSuggestions: {
      strings: true,
    },
  };
  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      options={MONACO_OPTIONS}
      language="typescript"
      // onMount={handleEditorDidMount}
      value={value}
      defaultValue={defaultValue}
    />
  );
}

export default CodeEditor;
