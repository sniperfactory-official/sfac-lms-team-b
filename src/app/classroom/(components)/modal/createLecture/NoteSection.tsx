import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@toast-ui/react-editor";
import { RootState } from "@/redux/store";
import { setLectureContent } from "@/redux/slice/lectureInfoSlice";
import useUploadNoteImage from "@/hooks/lecture/useUploadNoteImage";
import "@toast-ui/editor/dist/toastui-editor.css";

type HookCallback = (url: string, text?: string) => void;

const NoteSction: React.FC = () => {
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();
  const lectureContent = useSelector(
    (state: RootState) => state.lectureInfo.lectureContent,
  );
  const [content, setContent] = useState<string | undefined>(lectureContent);
  const { onUploadImage } = useUploadNoteImage();

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

  const handleUploadImage = async (
    imageFile: File | Blob,
    callback: HookCallback,
  ) => {
    if (imageFile instanceof File) {
      const imageURL: string | undefined = await onUploadImage(imageFile);
      imageURL && callback(imageURL);
    }
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
      hooks={{
        addImageBlobHook: handleUploadImage,
      }}
    />
  );
};

export default NoteSction;
