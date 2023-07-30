import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const NoteSction: React.FC = () => {
  return (
    <Editor
      placeholder="내용을 입력해주세요."
      hideModeSwitch={true}
      usageStatistics={false}
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
};

export default NoteSction;
