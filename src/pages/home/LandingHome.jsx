import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";
import PropTypes from "prop-types";

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];

const stats = [
  { name: "Offices worldwide", value: "12" },
  { name: "Full-time colleagues", value: "300+" },
  { name: "Hours per week", value: "40" },
  { name: "Paid time off", value: "Unlimited" },
];

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
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true"
        >
          <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
          />
        </div>
        <div
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
        >
          <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Tối ưu thời gian cho Học sinh - Giáo viên khi điểm code
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Chúng tôi cung cấp dịch vụ chấm code tự động bằng AI đem tới khả năng
              tối ưu thời gian đánh giá cho bạn.
            </p>
            <a href="#services" className={`${buttonBaseClass} mt-4`}>
              Explore Services <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                  <a key={link.name} href={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </a>
              ))}
            </div>

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
                bằng Email!
              </p>
              <a
                  href="mailto:toquangduc2004@gmail.com"
                  className={`${buttonBaseClass} mt-4`}
              >
                Email Us <span aria-hidden="true">&rarr;</span>
              </a>
            </section>

            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                  </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
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
