import { memo, useMemo, useState } from "react";

type Category = "전체" | "문구" | "전자";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "전체">;
};

const products: Product[] = [
  { id: 1, name: "노트", category: "문구" },
  { id: 2, name: "볼펜", category: "문구" },
  { id: 3, name: "키보드", category: "전자" },
  { id: 4, name: "마우스", category: "전자" },
];

const MemoizedProductList = memo(function MemoizedProductList({
  products,
}: {
  products: Product[];
}) {
  console.log("MemoizedProductList 함수 실행");

  return (
    <ul className="result-list">
      {products.map((product) => (
        <li key={product.id}>
          {product.name} · {product.category}
        </li>
      ))}
    </ul>
  );
});

function UseMemoExample() {
  const [parentCount, setParentCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>("문구");

  console.log("UseMemoExample 함수 실행");

  const filteredProducts = useMemo(() => {
    console.log("상품 필터 계산 실행");

    if (selectedCategory === "전체") {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">12. React useMemo</p>
        <h2>의존성과 계산 결과 재사용</h2>
        <p>
          부모 count와 카테고리를 각각 변경하며 필터 계산 실행 여부를
          비교합니다.
        </p>
      </div>

      <p className="result">부모 count: {parentCount}</p>

      <div className="button-group">
        <button
          type="button"
          onClick={() => setParentCount((count) => count + 1)}
        >
          부모 count 증가
        </button>
      </div>

      <div className="focus-example">
        <label htmlFor="product-category">상품 카테고리</label>
        <select
          id="product-category"
          value={selectedCategory}
          onChange={(event) =>
            setSelectedCategory(event.target.value as Category)
          }
        >
          <option value="전체">전체</option>
          <option value="문구">문구</option>
          <option value="전자">전자</option>
        </select>
      </div>

      <MemoizedProductList products={filteredProducts} />

      <p>
        현재 데이터는 작아서 실제 성능 최적화가 필요하지 않으며, useMemo의
        동작을 확인하기 위한 예제입니다.
      </p>
    </div>
  );
}

export default UseMemoExample;
