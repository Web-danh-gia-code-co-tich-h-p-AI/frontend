const containerClasses =
  "min-h-screen flex flex-col items-center justify-center bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white";
const titleClasses = "text-6xl font-bold mb-4";
const subTitleClasses = "text-4xl mb-2";
const textClasses = "text-lg";

const AboutUs = () => {
  return (
    <div className={containerClasses}>
      <h1 className={titleClasses}>Đây là trang thông tin về chúng tôi</h1>
      <p className={subTitleClasses}>Nhóm 6 lớp 22IT1 Trường Đại học CMC</p>
      <p className={textClasses}>
        Các thành viên trong nhóm đã tích cực học tập và thực hành để hoàn thành
        bài dự án
      </p>
    </div>
  );
};

export default AboutUs;
