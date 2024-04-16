import { Course, CourseBook } from "@/backend";
import AdvancedEditor from "../editor/AdvancedEditor";
import { Button, Card } from "@radix-ui/themes";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import { WithTeacherRole } from "@/contexts/CourseRoleContext";
import { CreateBookForm } from "./CreateBookForm";

interface BookViewProps {
  book: CourseBook;
}

export const BookView: React.FC<BookViewProps> = ({ book }) => {
  return (
    <AdvancedEditor
      className="min-h-60 border border-muted rounded-md px-4 py-2"
      value={book.content}
    />
  );
};

export const BookList: React.FC<{
  books: CourseBook[];
  current?: CourseBook;
  parent?: CourseBook;
  onClickBook: (book: CourseBook | null) => void;
  course: Course;
}> = ({ books, current, parent, onClickBook, course }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {parent ? (
            <Button
              variant="soft"
              onClick={() => {
                onClickBook(parent);
              }}
            >
              <IoArrowBackSharp />
              <div className="hidden md:block">{parent.title}</div>
            </Button>
          ) : current ? (
            <Button
              variant="soft"
              onClick={() => {
                onClickBook(null);
              }}
            >
              <IoArrowBackSharp />
              <div className="hidden md:block">All Course Books</div>
            </Button>
          ) : (
            <></>
          )}
        </div>

        <div>
          <WithTeacherRole>
            <div>
              <CreateBookForm
                course={course}
                parent={current}
                onCreated={onClickBook}
              >
                <Button variant="surface">Create a new page</Button>
              </CreateBookForm>
            </div>
          </WithTeacherRole>
        </div>
      </div>

      <div className="font-bold text-xl">
        {current?.title ?? "Course Books"}
      </div>

      {books.length > 0 && (
        <Card>
          <div className="flex flex-col space-y-2">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  onClickBook(book);
                }}
                className="px-2 py-1 flex space-x-2 items-center select-none hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <BiBook />
                <div>{book.title}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
