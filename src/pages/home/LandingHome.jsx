import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";
import PropTypes from "prop-types";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Trang chủ", href: "/" },
  { name: "Code", href: "/code" },
  { name: "Chấm điểm", href: "/mark-score" },
];

const sectionTitleClass = "text-2xl font-bold text-center";
const buttonBaseClass =
  "inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors";

const ServiceCard = ({ title, description, imageUrl }) => {
  return (
    <div className="p-4 text-white bg-[#112d36] rounded-lg shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="h-[200px] w-[300px] rounded-lg"
      />
      <h4 className="mt-2 font-bold">{title}</h4>
      <p>{description}</p>
    </div>
  );
};

const Main = () => {
  return (
    <div className="relative py-24 overflow-hidden bg-gray-900 isolate sm:py-32">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 object-cover object-right w-full h-full -z-10 md:object-center"
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
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Tối ưu thời gian cho Học sinh - Giáo viên khi chấm code
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Chúng tôi cung cấp dịch vụ chấm code tự động bằng AI đem tới khả
            năng tối ưu thời gian đánh giá cho bạn.
          </p>
          <a href="#services" className={`${buttonBaseClass} mt-4`}>
            Explore Services <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="max-w-2xl mx-auto mt-10 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 text-base font-semibold leading-7 text-white gap-x-8 gap-y-6 sm:grid-cols-2 md:flex lg:gap-x-10">
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
                imageUrl="https://img.freepik.com/free-vector/programmer-s-workplace-writing-code-laptop_80328-238.jpg?t=st=1716229150~exp=1716232750~hmac=7ae3967c98e1ebc8f7ef45facf7005eb38e5ad961beb0422c396ca95a2e3caa8&w=900"
              />
              <ServiceCard
                title="Upload File code của bạn"
                description="Bạn có thể tải lên file code của bạn để AI có thể đánh giá khách quan cho bạn."
                imageUrl="https://img.freepik.com/free-vector/online-image-upload-landing-page_23-2148282428.jpg?t=st=1716229181~exp=1716232781~hmac=df9cb646647e302fa8c41eb99eefa47a881e7937a55d1d0414c37dc849e03543&w=900"
              />
              <ServiceCard
                title="Học sinh - Giáo viên"
                description="Web có chức năng dành cho cả học sinh và giáo viên"
                imageUrl="https://img.freepik.com/free-vector/human-resources-managers-doing-professional-staff-research-with-magnifier-human-resources-hr-team-work-headhunter-service-concept-illustration_335657-2061.jpg?w=900&t=st=1716228976~exp=1716229576~hmac=eba6a46adda54ae01b67a180d4ecc80473d2ad9147e01f502f18c7064b43cd00"
              />
            </div>
          </section>

          <section id="support" className="mt-12 text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Support center</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white rounded-lg bg-opacity-10">
                <h3 className="text-xl font-bold text-white">Sales</h3>
                <p className="mt-2 text-gray-300">
                  Chỉ với 0đ bạn có thể chấm chữa cho học sinh và học sinh cũng
                  có thể được chấm bài một cách nhanh chóng và chính xác nhất
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg bg-opacity-10">
                <h3 className="text-xl font-bold text-white">
                  Technical Support
                </h3>
                <p className="mt-2 text-gray-300">
                  Hãy liên hệ chúng tôi khi gặp phải trường hợp lỗi hệ thống hay
                  sever
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg bg-opacity-10">
                <h3 className="text-xl font-bold text-white">24/7</h3>
                <p className="mt-2 text-gray-300">
                  Chúng tôi cam kết hỗ trợ 24/24 trong tất cả trường hợp. Hãy
                  liên hệ ngay nếu bạn gặp vấn đề.
                </p>
              </div>
            </div>
          </section>

          <section id="about" className="mt-12 text-center text-white">
            <h3 className={sectionTitleClass}>About Us</h3>
            <p className="mt-4">
              Chúng tôi là một đội ngũ sinh viên năm 2 trường đại học CMC - Đây
              là bài dự án kết thúc môn
            </p>
          </section>

          <section id="contact" className="mt-12 text-center text-white">
            <h3 className={sectionTitleClass}>Get in Touch</h3>
            <p className="mt-4">
              Bạn có bất cứ câu hỏi nào hay cần trợ giúp hãy liên hệ với chúng
              tôi bằng Email.
            </p>
            <a
              href="mailto:toquangduc2004@gmail.com"
              className={`${buttonBaseClass} mt-4`}
            >
              Email with Us <span aria-hidden="true">&rarr;</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

// Newsletter component
const Newsletter = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-gray-900 isolate sm:py-24 lg:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Subscribe to our newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Đăng ký ngay để nhận những thông tin được cập nhật liên tục về
              chúng tôi!
            </p>
            <div className="flex max-w-md mt-6 gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
                <CalendarDaysIcon
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Sẽ có những update mới nhất hàng tuần mà chúng tôi đang dần dần
                xây dựng
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
                <HandRaisedIcon
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Không spam thông báo làm ảnh hưởng quý khách.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute top-0 -translate-x-1/2 left-1/2 -z-10 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

// App component
const LandingHome = () => {
  return (
    <div className="antialiased bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white">
      <Main />
      <Newsletter />
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
