import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "@toast-ui/react-editor";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import useUploadImage from "@/hooks/lecture/useUploadImage";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { setNoteImages, setTextContent } from "@/redux/slice/lectureInfoSlice";
import "@toast-ui/editor/dist/toastui-editor.css";

type HookCallback = (url: string, text?: string) => void;

const NoteSction: React.FC = () => {
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();
  const { lectureInfo, modalRole } = useClassroomModal();
  const { onUploadImage } = useUploadImage();
  const { textContent } = useLectureInfo();
  const currentValue =
    modalRole === "edit"
      ? lectureInfo?.lectureContent.textContent
      : textContent;
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["image", "link"],
    ["ul", "ol", "task", "table"],
  ];

  const handleChangeContent = () => {
    const newContent: string | undefined = editorRef.current
      ?.getInstance()
      .getMarkdown();
    dispatch(setTextContent(newContent));
  };

  const handleUploadImage = async (
    imageFile: File | Blob,
    callback: HookCallback,
  ) => {
    if (imageFile instanceof File) {
      const imageURL: string | undefined = await onUploadImage(imageFile);
      dispatch(setNoteImages(imageURL));
      imageURL && callback(imageURL);
    }
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={currentValue}
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
