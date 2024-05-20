import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";
import PropTypes from "prop-types";

const containerClass = "container bg-zinc-200 text-main-black mx-auto p-8";
const sectionTitleClass = "text-2xl font-bold text-center";
const buttonBaseClass =
  "inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors";

// ServiceCard component
const ServiceCard = ({ title, description, imageUrl }) => {
  return (
    <div className="p-4 text-white bg-white rounded-lg shadow-lg dark:bg-zinc-700">
      <img
        src={imageUrl}
        alt={title}
        className="h-[200px] w-[300px] rounded-lg "
      />
      <h4 className="mt-2 font-bold">{title}</h4>
      <p>{description}</p>
    </div>
  );
};

// Main component
const Main = () => {
  return (
    <main
      className={`${containerClass} bg-[url('/src/assets/images/login-cover-image.jpg')] px-4`}
    >
      <section id="hero" className="mt-8 text-center">
        <h2 className="text-3xl font-bold">
          Tối ưu thời gian cho Học sinh - Giáo viên khi chấm code
        </h2>
        <p className="mt-2 text-lg">
          Chúng tôi cung cấp dịch vụ chấm code tự động bằng AI đem tới khả năng
          tối ưu thời gian đánh giá cho bạn.
        </p>
        <a href="#services" className={`${buttonBaseClass} mt-4`}>
          Explore Services
        </a>
      </section>

      <section id="services" className="mt-12">
        <h3 className={sectionTitleClass}>Các tiện ích chính</h3>
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            title="Tạo code trực tiếp"
            description="Bạn có thể trực tiếp viết code trên trang của chúng tôi và đánh giá chúng bằng AI."
            imageUrl="https://thumbs.dreamstime.com/b/compile-concept-random-parts-program-code-programming-abstract-technology-background-software-developer-computer-153537342.jpg"
          />
          <ServiceCard
            title="Upload File code của bạn"
            description="Bạn có thể tải lên file code của bạn để AI có thể đánh giá khách quan cho bạn."
            imageUrl="https://www.verduins.com/wp-content/uploads/2014/12/bigstock-Hand-Press-Upload-Button-On-Ke-102346865-300x200.jpg"
          />
          <ServiceCard
            title="Học sinh - Giáo viên"
            description="Web có chức năng dành cho cả học sinh và giáo viên"
            imageUrl="https://our.idtek.com.vn/content/images/2020/03/guide-to-wordpress-user-roles.png"
          />
        </div>
      </section>

      <section id="about" className="mt-12 text-center text-white">
        <h3 className={sectionTitleClass}>About Us</h3>
        <p className="mt-4">
          Chúng tôi là một đội ngũ sinh viên năm 2 trường đại học CMC - Đây là
          bài dự án kết thúc môn
        </p>
      </section>

      <section id="contact" className="mt-12 text-center text-white">
        <h3 className={sectionTitleClass}>Get in Touch</h3>
        <p className="mt-4">
          Bạn có bất cứ câu hỏi nào hay cần trợ giúp hãy liên hệ với chúng tôi
          bằng Email.
        </p>
        <a
          href="mailto: toquangduc2004@gmail.com"
          className={`${buttonBaseClass} mt-4`}
        >
          Email Us
        </a>
      </section>
    </main>
  );
};

// App component
const LandingHome = () => {
  return (
    <div className="antialiased bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white">
      <Main />
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

const EnhancedLandingHome = withErrorBoundary(LandingHome, {
  FallbackComponent,
});

export default EnhancedLandingHome;
