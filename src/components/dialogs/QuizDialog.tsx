"use client";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ControlQuizForm from "../forms/ControlQuizForm";
import { IQuiz } from "@/interfaces/quiz.interface";
interface QuizDialogProps {
  quiz?: IQuiz;
}
const QuizDialog: React.FC<QuizDialogProps> = ({ quiz }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isEditingMode = !!quiz;

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  return (
    <>
      <Button onClick={handleOpen} className="d-flex align-items-center gap-2">
        {isEditingMode ? (
          <>
            <span>Edi Quiz</span>
          </>
        ) : (
          <>
            <span>Add Quiz</span>
          </>
        )}
      </Button>

      <Modal show={isDialogOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditingMode ? "Edit Quiz" : "New Quiz"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlQuizForm handleClose={handleClose} quiz={quiz} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default QuizDialog;
