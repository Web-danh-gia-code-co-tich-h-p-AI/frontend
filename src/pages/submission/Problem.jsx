const cardContainerClass = "max-w-4xl mx-auto p-4";
const cardClass = "bg-white shadow-md rounded-lg p-6";
const buttonClass =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
const copyButtonClass =
  "mt-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-1 px-2 rounded text-sm";

const ReactComponent = () => {
  return (
    <div className={cardContainerClass}>
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            [Mảng 1 Chiều Cơ Bản]. Bài 18. Liên kế trái đầu
          </h1>
          <button className={buttonClass}>Submit solution</button>
        </div>
        <p className="mb-2">
          Cho mảng số nguyên A[] gồm N phần tử, hãy liệt kê theo thứ tự xuất
          hiện các số thỏa mãn có ít nhất 1 số trái đầu với nó đứng cạnh nó.
        </p>
        <div className="mb-4">
          <h2 className="font-semibold">Đầu vào</h2>
          <p>Dòng đầu tiên là số nguyên dương N</p>
          <p>Dòng thứ 2 gồm N số nguyên viết cách nhau một vài khoảng trắng</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold">Giới hạn</h2>
          <p>2 ≤ N ≤ 10^6</p>
          <p>-10^6 ≤ A[i] ≤ 10^6</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold">Đầu ra</h2>
          <p>In ra kết quả của bài toán</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Ví dụ:</h2>
          <div className="mb-2">
            <p className="font-semibold">Input 01</p>
            <div className="bg-zinc-100 p-2 rounded">
              <p>10</p>
              <p>1 2 -3 -4 5 -6 7 8 9 10</p>
            </div>
            <button className={copyButtonClass}>Copy</button>
          </div>
          <div>
            <p className="font-semibold">Output 01</p>
            <div className="bg-zinc-100 p-2 rounded">
              <p>2 -3 -4 5 -6 7</p>
            </div>
            <button className={copyButtonClass}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactComponent;
