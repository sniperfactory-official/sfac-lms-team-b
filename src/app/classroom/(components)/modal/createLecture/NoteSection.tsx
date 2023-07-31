import { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLectureContent } from "@/redux/slice/lectureInfoSlice";
import "@toast-ui/editor/dist/toastui-editor.css";

const NoteSction: React.FC = () => {
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();
  const lectureContent = useSelector(
    (state: RootState) => state.lectureInfo.lectureContent,
  );
  const [content, setContent] = useState<string | undefined>(lectureContent);

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["image", "link"],
    ["ul", "ol", "task", "table"],
  ];

  const handleChangeContent = () => {
    const newContent: string | undefined = editorRef.current
      ?.getInstance()
      .getMarkdown();
    setContent(newContent);
    dispatch(setLectureContent(newContent));
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={content}
      placeholder="내용을 입력해주세요."
      hideModeSwitch={true}
      usageStatistics={false}
      initialEditType="markdown"
      useCommandShortcut={true}
      toolbarItems={toolbarItems}
      onChange={handleChangeContent}
    />
  );
};

export default NoteSction;
