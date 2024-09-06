"use client";
import QuizDialog from "@/components/dialogs/QuizDialog";
import { deleteQuiz } from "@/reduxjs/features/quizzez/quizSlice";
import { useAppDispatch, useAppSelector } from "@/reduxjs/hooks";
import { RootState } from "@/reduxjs/store";
import Link from "next/link";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

export default function Home() {
  const quizzes = useAppSelector((state: RootState) => state.quizzes.quizzes);
  const dispatch = useAppDispatch();

  return (
    <Container className="py-5">
      <Row className="mb-4 justify-content-between align-items-center">
        <Col>
          <h1 className="display-4">Quizzes</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <QuizDialog />
        </Col>
      </Row>
      <Row className="g-4">
        {quizzes.map((quiz) => (
          <Col key={quiz.id} md={6}>
            <Card>
              <Card.Header as="h5">
                <Row className="align-items-center">
                  <Col>
                    <Card.Title>{quiz.title}</Card.Title>
                  </Col>
                  <Col className="d-flex justify-content-end gap-2">
                    <QuizDialog quiz={quiz} />
                    <Button
                      variant="outline-danger"
                      onClick={() => dispatch(deleteQuiz(quiz.id))}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text>{quiz.description}</Card.Text>
                <div className="d-flex justify-content-end">
                  <Link href={`/quiz/${quiz.id}`}>
                    <Button variant="primary">Show Questions</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
