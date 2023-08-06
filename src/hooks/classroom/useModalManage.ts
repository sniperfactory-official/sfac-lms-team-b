// hooks/useModalManager.tsx
import { ReactElement, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import MakeLectureModal from '@/app/classroom/(components)/modal/createLecture/MakeLectureModal';
import AddNoteModal from '@/app/classroom/(components)/modal/createLecture/AddNoteModal';
import AddLinkModal from '@/app/classroom/(components)/modal/createLecture/AddLinkModal';
import AddVideoFileModal from '@/app/classroom/(components)/modal/createLecture/AddVideoFileModal';
import useClassroomModal from '@/hooks/lecture/useClassroomModal';

const useModalManage = () => {
  const dispatch = useDispatch();
  const {
    lectureTypeModalOpen,
    noteModalOpen,
    linkModalOpen,
    videoFileModalOpen,
  } = useClassroomModal();
  const IS_MODAL_OPEN = [lectureTypeModalOpen, noteModalOpen, linkModalOpen, videoFileModalOpen]
  const MODAL = [MakeLectureModal, AddNoteModal, AddLinkModal, AddVideoFileModal]
  const handleModalOpen = () => {
    dispatch(
      setModalVisibility({
        modalName: "lectureTypeModalOpen",
        visible: true,
        modalRole: "create",
      }),
    );
  };

  let selectedModal = null;
  for(let i=0; i<4; i++){
    if(IS_MODAL_OPEN[i]){
      selectedModal = MODAL[i];
      break;
    } 
  }
  return { modal : selectedModal, handleModalOpen };
}

export default useModalManage