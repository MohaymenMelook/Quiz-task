"use client";
import { IQuiz, IQuizFormInputs } from "@/interfaces/quiz.interface";
import { addQuiz, updateQuiz } from "@/reduxjs/features/quizzez/quizSlice";
import { useAppDispatch } from "@/reduxjs/hooks";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

interface ControlQuizFormProps {
  handleClose: () => void;
  quiz?: IQuiz;
}

const ControlQuizForm: React.FC<ControlQuizFormProps> = ({
  handleClose,
  quiz,
}) => {
  const dispatch = useAppDispatch();
  const isEditingMode = !!quiz;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IQuizFormInputs>({
    defaultValues: {
      title: quiz?.title ?? "",
      description: quiz?.description ?? "",
      score: quiz?.score ?? 0,
      url: quiz?.url ?? "",
    },
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<IQuizFormInputs> = (data) => {
    if (isEditingMode) {
      dispatch(
        updateQuiz({
          updatedQuiz: data,
          quizId: quiz?.id as number,
        })
      );
    } else {
      dispatch(addQuiz(data));
    }
    reset();
    handleClose();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Quiz Title"
          {...register("title", { required: "Title is required" })}
          isInvalid={!!errors.title}
        />
        {errors.title && (
          <Form.Control.Feedback type="invalid">
            {errors.title.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          isInvalid={!!errors.description}
        />
        {errors.description && (
          <Form.Control.Feedback type="invalid">
            {errors.description.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Final Score</Form.Label>
        <Form.Control
          type="number"
          placeholder="Final Score"
          {...register("score", {
            min: {
              value: 1,
              message: "Score must be greater than 0",
            },
          })}
          isInvalid={!!errors.score}
        />
        {errors.score && (
          <Form.Control.Feedback type="invalid">
            {errors.score.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="youtubeLink">
        <Form.Label>YouTube Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="YouTube Link"
          {...register("url", {
            required: "YouTube link is required",
            pattern: {
              value:
                /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
              message: "Invalid YouTube link",
            },
          })}
          isInvalid={!!errors.url}
        />
        {errors.url && (
          <Form.Control.Feedback type="invalid">
            {errors.url.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default ControlQuizForm;
