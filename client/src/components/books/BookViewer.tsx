import { CourseBook } from "@/backend";
import AdvancedEditor from "../editor/AdvancedEditor";

interface BookViewProps {
  book: CourseBook;
}

export const BookView: React.FC<BookViewProps> = ({ book }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <AdvancedEditor value={book.content} />
    </div>
  );
};
