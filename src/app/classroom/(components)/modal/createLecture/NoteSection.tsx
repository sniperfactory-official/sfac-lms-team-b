import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@toast-ui/react-editor";
import { RootState } from "@/redux/store";
import { setNoteImages, setTextContent } from "@/redux/slice/lectureInfoSlice";
import useUploadNoteImage from "@/hooks/lecture/useUploadFile";
import "@toast-ui/editor/dist/toastui-editor.css";

type HookCallback = (url: string, text?: string) => void;

const NoteSction: React.FC = () => {
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();
  const textContent = useSelector(
    (state: RootState) => state.lectureInfo.textContent,
  );
  const [content, setContent] = useState<string | undefined>(textContent);
  const { onUploadFile } = useUploadNoteImage();

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
    dispatch(setTextContent(newContent));
  };

  const handleUploadImage = async (
    imageFile: File | Blob,
    callback: HookCallback,
  ) => {
    if (imageFile instanceof File) {
      const imageURL: string | undefined = await onUploadFile(imageFile);
      dispatch(setNoteImages(imageURL));
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
