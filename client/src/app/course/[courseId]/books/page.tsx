"use client";

import { useCourse } from "@/contexts/CourseContext";
import { useCallback, useEffect, useState } from "react";
import { CenteredLoading } from "@/components/loading";
import { useBackend } from "@/hooks/useBackend";
import { StatefulForum } from "@/components/forum/Forum";
import { useRouter, useSearchParams } from "next/navigation";
import { CourseBook } from "@/backend";
import { BookList, BookView } from "@/components/books/BookViewer";
import { WithTeacherRole } from "@/contexts/CourseRoleContext";
import { CreateBookForm } from "@/components/books/CreateBookForm";
import { Button } from "@radix-ui/themes";
import deepEqual from "deep-equal";

const BookPage: React.FC = () => {
  const course = useCourse();

  const backend = useBackend();
  const params = useSearchParams();

  const [currentBook, setCurrentBook] = useState<CourseBook | null>(null);
  const [children, setChildren] = useState<CourseBook[]>([]);

  const activeBookId = params.get("page");

  const fetchAllBooksFromCourse = useCallback(async () => {
    const { books } = await backend.getBooksByCourse({
      courseID: course.id,
    });

    setChildren(books);
  }, [backend, course.id]);

  useEffect(() => {
    if (course === null) return;

    void fetchAllBooksFromCourse();
  }, [backend, course, fetchAllBooksFromCourse]);

  useEffect(() => {
    const inner = async () => {
      if (activeBookId === null) {
        setCurrentBook(null);
        await fetchAllBooksFromCourse();
        return;
      }

      const { books } = await backend.getCourseBook({
        bookIDs: [activeBookId],
      });

      if (books.length === 0) {
        setCurrentBook(null);
        return;
      }

      setCurrentBook(books[0]!);
      setChildren(books[0]!.children ?? []);
    };

    void inner();
  }, [activeBookId, backend, fetchAllBooksFromCourse]);

  const router = useRouter();

  const onChangeActiveThreadId = useCallback(
    (book: CourseBook | null) => {
      router.push(
        `/course/${course.id}/books${book ? "?page=" + book.id : ""}`,
      );
    },
    [course.id, router],
  );

  if (children === null) return <CenteredLoading />;

  return (
    <div className="flex flex-col space-y-4 h-full py-4 px-2">
      <BookList
        books={children}
        current={currentBook ?? undefined}
        parent={currentBook?.parent}
        onClickBook={onChangeActiveThreadId}
        course={course}
      />

      {currentBook?.content && !deepEqual(currentBook.content, {}) && (
        <BookView book={currentBook}></BookView>
      )}
    </div>
  );
};

export default BookPage;
