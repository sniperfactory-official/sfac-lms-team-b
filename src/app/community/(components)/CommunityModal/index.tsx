"use client";

import CommunityModal from "./CommunityModal";
import ModalWrapper from "@/components/ModalWrapper";
import { useState } from "react";

export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const onCloseModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      {isModalOpen && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={onCloseModal}>
          <CommunityModal />
        </ModalWrapper>
      )}
    </div>
  );
}
