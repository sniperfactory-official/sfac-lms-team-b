import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const NoteSction: React.FC = () => {
  const editorRef = useRef<Editor>(null);

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["image", "link"],
    ["ul", "ol", "task", "table"],
  ];

  return (
    <Editor
      ref={editorRef}
      placeholder="내용을 입력해주세요."
      hideModeSwitch={true}
      usageStatistics={false}
      initialEditType="markdown"
      useCommandShortcut={true}
      toolbarItems={toolbarItems}
    />
  );
};

export default NoteSction;
