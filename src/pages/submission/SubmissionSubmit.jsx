const containerClasses = "max-w-4xl mx-auto py-10";
const cardClasses = "bg-white dark:bg-zinc-700 shadow rounded-lg p-6";
const headerClasses = "flex justify-between items-center border-b pb-4";
const titleClasses = "text-xl font-semibold text-zinc-900 dark:text-white";
const dateClasses = "text-sm text-zinc-600 dark:text-zinc-300";
const contentClasses = "py-5";
const subtitleClasses =
  "text-lg font-semibold text-zinc-900 dark:text-white mr-2";
const textClasses = "text-zinc-600 dark:text-zinc-300";
const buttonClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const SubmissionSubmit = () => {
  return (
    <div className="h-screen  bg-zinc-100">
      <div className={containerClasses}>
        <div className={cardClasses}>
          <div className={headerClasses}>
            <h1 className={titleClasses}>
              Bài nộp [Mảng 1 Chiều Cơ Bản]. Bài 16. Liệt kê của
              yunomi_xavia_451
            </h1>
            <span className={dateClasses}>7, Tháng 5, 2024, 14:56 C11</span>
          </div>
          <div className={contentClasses}>
            <h className={subtitleClasses}>Xem code</h>
            <h className={subtitleClasses}>Nộp lại</h>
            <p className={textClasses}>Bài nộp của bạn đang được xử lý...</p>
          </div>
          <div className="flex justify-end">
            <button className={buttonClasses}>Hủy bỏ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSubmit;
