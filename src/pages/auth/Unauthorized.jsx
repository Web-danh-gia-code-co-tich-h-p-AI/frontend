const containerClasses =
  "min-h-screen flex flex-col items-center justify-center bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white";
const titleClasses = "text-6xl font-bold mb-4";
const subTitleClasses = "text-4xl mb-2";
const textClasses = "text-lg";

const Unauthorized = () => {
  return (
    <div className={containerClasses}>
      <h1 className={titleClasses}>Oops!</h1>
      <p className={subTitleClasses}>403 Permission Denied</p>
      <p className={textClasses}>
        Sorry, you do not have access to this page, please contact your
        administrator.
      </p>
    </div>
  );
};

export default Unauthorized;
