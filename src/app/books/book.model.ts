// UI Book Object
export interface Book {
    bookId?: string;
    bookName: string;
    bookAuthor: string;
    bookContent: string;
}

// Firebase Books Object
export interface BookData {
    [bookId: string]: Book;
}

export const mapBooksDataToBooks = (booksResponse: BookData): Book[] => {
    return Object.entries(booksResponse)
        .map((booksEntries: [string, Book]) => {
                return {
                    bookId: booksEntries['0'],
                    bookAuthor: booksEntries['1'].bookAuthor,
                    bookContent: booksEntries['1'].bookContent,
                    bookName: booksEntries['1'].bookName
                } as Book;
            }
        );
};

export const mapBooksToBooksData = (books: Book[]): BookData => {
    const bookData: BookData = {};
    for (const book of books) {
        Object.defineProperty(bookData, book.bookId, {
            enumerable: true,
            value: {
                bookAuthor: book.bookAuthor,
                bookContent: book.bookContent,
                bookName: book.bookName
            }
        });
    }
    return bookData;
};
