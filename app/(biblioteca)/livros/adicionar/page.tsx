

import { BookForm } from "@/components/BookForm";

export default function AddBookPage() {
  return (
    <div className="container mx-auto py-10">
      <BookForm isEditMode={false} />
    </div>
  );
}
