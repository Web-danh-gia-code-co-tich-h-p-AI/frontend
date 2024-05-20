import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const sharedClasses = {
  button: "text-zinc-600 hover:text-zinc-800",
  select:
    "block appearance-none w-full  border border-zinc-200 dark:border-zinc-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500 dark:focus:border-zinc-300",
  blueButton:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
};

const SubmissionUser = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-bold">All Submissions</h2>
        <div className="flex space-x-4">
          <button className={sharedClasses.button}>All</button>
          <button className={sharedClasses.button}>Mine</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow dark:bg-slate-50">
              <thead>
                <tr className="w-full bg-zinc-200 dark:bg-[#231F20] text-left text-white">
                  <th className="p-4">Submission</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Problem</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">[Lâm Quen OJ] Bài 4: Hàm Pow</td>
                  <td className="p-4">30 / 30</td>
                  <td className="p-4">AC / P3</td>
                  <td className="p-4">06/05/2024</td>
                  <td className="p-4">1.41s</td>
                  <td className="p-4">10.1 MB</td>
                </tr>
                <tr>
                  <td className="p-4">[Lâm Quen OJ] Bài 4: Hàm Pow</td>
                  <td className="p-4">30 / 30</td>
                  <td className="p-4">AC / P3</td>
                  <td className="p-4">06/05/2024</td>
                  <td className="p-4">1.41s</td>
                  <td className="p-4">10.1 MB</td>
                </tr>
                <tr>
                  <td className="p-4">[Lâm Quen OJ] Bài 4: Hàm Pow</td>
                  <td className="p-4">30 / 30</td>
                  <td className="p-4">AC / P3</td>
                  <td className="p-4">06/05/2024</td>
                  <td className="p-4">1.41s</td>
                  <td className="p-4">10.1 MB</td>
                </tr>
                <tr>
                  <td className="p-4">[Lâm Quen OJ] Bài 4: Hàm Pow</td>
                  <td className="p-4">30 / 30</td>
                  <td className="p-4">AC / P3</td>
                  <td className="p-4">06/05/2024</td>
                  <td className="p-4">1.41s</td>
                  <td className="p-4">10.1 MB</td>
                </tr>
                <tr>
                  <td className="p-4">[Lâm Quen OJ] Bài 4: Hàm Pow</td>
                  <td className="p-4">30 / 30</td>
                  <td className="p-4">AC / P3</td>
                  <td className="p-4">06/05/2024</td>
                  <td className="p-4">1.41s</td>
                  <td className="p-4">10.1 MB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between py-4">
            <span>
              <button className={sharedClasses.button}>1</button>
              <button className={sharedClasses.button}>2</button>
              <button className={sharedClasses.button}>3</button>
              <button className={sharedClasses.button}>...</button>
              <button className={sharedClasses.button}>9</button>
            </span>
            <button className={sharedClasses.blueButton}>Next</button>
          </div>
        </div>

        <div className="w-full p-4 md:w-96">
          <div className="bg-[#231F20] p-4 shadow rounded-lg mb-4">
            <h3 className="mb-4 text-lg font-bold text-white">
              Filter submissions
            </h3>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-bold text-zinc-700 dark:text-zinc-300"
              >
                Status
              </label>
              <select
                id="status"
                className={`placeholder-black text-black ${sharedClasses.select}`}
              >
                <option>Filter by status...</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block mb-2 text-sm font-bold text-zinc-700 dark:text-zinc-300"
              >
                Language
              </label>
              <select id="language" className={sharedClasses.select}>
                <option>Filter by language...</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="organization"
                className="block mb-2 text-sm font-bold text-zinc-700 dark:text-zinc-300"
              >
                Organization
              </label>
              <select id="organization" className={sharedClasses.select}>
                <option>All</option>
              </select>
            </div>
            <button className={sharedClasses.blueButton}>Go</button>
          </div>
          <div className="p-4 bg-white rounded-lg shadow dark:bg-zinc-800">
            <h3 className="mb-4 text-lg font-bold text-white">Statistics</h3>
            <img
              src="https://placehold.co/300x200.png?text=Statistics+Chart"
              alt="Statistics Chart"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const EnhancedSubmissionUser = withErrorBoundary(SubmissionUser, {
  FallbackComponent,
});

export default EnhancedSubmissionUser;
