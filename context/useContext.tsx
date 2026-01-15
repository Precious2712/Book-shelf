import { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type Question = {
    id: number
    question: string
    options: Record<string, string>
    correctAnswer: string
}

type Exam = {
    title: string
    totalTime: number
    perQuestionTime: number
    questions: Question[]
}

type ProductContextType = {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product) => void;

    rightAnswers: Question[];
    wrongAnswers: Question[];

    setRightAnswers: (answers: Question[]) => void;
    setWrongAnswers: (answers: Question[]) => void;

    userId: string | null;
    setUserId: (uid: string | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [rightAnswers, setRightAnswers] = useState<Question[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);

    const [userId, setUserId] = useState<string | null>(null);

    return (
        <ProductContext.Provider
            value={{
                selectedProduct,
                setSelectedProduct,
                rightAnswers,
                wrongAnswers,
                setRightAnswers,
                setWrongAnswers,
                userId,
                setUserId
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('useProduct must be used inside ProductProvider');
    }

    return context;
}
