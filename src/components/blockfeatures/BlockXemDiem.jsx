import { useState, useEffect } from "react";
import axios from "axios";

const BlockXemDiem = () => {
  const connectionString = "https://bewbewbew-001-site1.ftempurl.com/api/demo";
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Số người dùng hiển thị trên mỗi trang
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // State để hiển thị form chi tiết
  const [selectedUser, setSelectedUser] = useState(null); // State để lưu thông tin người dùng đang được chọn để sửa

  const username = "11166969";
  const password = "60-dayfreetrial";
  const basic = `${username}:${password}`;
  const basicAuthHeader = `Basic ${btoa(basic)}`;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${connectionString}/get-users-list`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleReload = async () => {
    setIsReloading(true);
    try {
      await fetchUsers();
    } catch (error) {
      console.error("Error reloading data:", error);
    } finally {
      setIsReloading(false);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchKeyword(searchTerm);
    setCurrentPage(1);
    if (searchTerm) {
      const filteredUsers = users.filter((user) =>
        user.studentID.toString().includes(searchTerm)
      );
      const hiddenIds = users
        .filter((user) => !user.studentID.toString().includes(searchTerm))
        .map((user) => user.studentID);
      const foundHiddenIdIndex = hiddenIds.indexOf(parseInt(searchTerm));
      if (foundHiddenIdIndex !== -1) {
        hiddenIds.splice(foundHiddenIdIndex, 1);
      }
      const usersToShow = filteredUsers.concat(
        users.filter((user) => hiddenIds.includes(user.studentID))
      );
      setUsers(usersToShow);
    } else {
      fetchUsers();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${connectionString}/delete-user/${id}`, {
        headers: {
          Authorization: basicAuthHeader,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      fetchUsers();
      console.log("User deleted successfully");
      alert("Xoá thông tin thành công.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Xoá thông tin thất bại. Vui lòng thử lại.");
    }
  };

  const handleDetail = (user) => {
    setSelectedUser(user); // Lưu thông tin của người dùng được chọn vào state
    setShowDetail(true); // Hiển thị form chi tiết
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedUser(null); // Xóa thông tin người dùng được chọn khi đóng form chi tiết
  };

  const handleSaveDetail = async () => {
    try {
      await axios.put(
        `${connectionString}/update-user/${selectedUser.studentID}`,
        selectedUser,
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      fetchUsers();
      console.log("User updated successfully");
      alert("Cập nhật thông tin thành công.");
      setShowDetail(false); // Đóng form chi tiết sau khi cập nhật thành công
      setSelectedUser(null); // Xóa thông tin người dùng được chọn
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Kiểm tra nếu trường là điểm số hoặc điểm số AI
    if (name === "score" || name === "scoreAI") {
      // Chỉ cho phép giá trị nhập là số từ 0 đến 100
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setSelectedUser({ ...selectedUser, [name]: value });
      }
    } else {
      setSelectedUser({ ...selectedUser, [name]: value });
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-full pl-4 rounded-lg shadow-lg laptop:relative justify-items-center laptop:w-full">
      <div className="h-full -ml-4">
        <div className="flex justify-between">
          <h2 className="flex pl-4 mt-3 mb-4 text-3xl text-zinc-700 text-[24px] laptop:text-[36px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3 scale-150 translate-y-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            Thông tin điểm số
          </h2>
          <button
            onClick={handleReload}
            className={`mt-3 px-4 py-2 mr-3 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ${
              isReloading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isReloading}
          >
            {isReloading ? (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0010.5 1h-3A1.5 1.5 0 006 2.5V4a8 8 0 018 8h2.5a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5H14"
                  ></path>
                </svg>
                Reloading...
              </div>
            ) : (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Reload
              </div>
            )}
          </button>
        </div>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="Search by ID"
          className="w-auto px-3 py-2 mb-4 ml-3 border border-gray-300 rounded-md bg-zinc-700"
        />
        <table className="w-full">
          <thead className="">
            <tr className="bg-gray-100 text-zinc-600">
              <th className="px-4 py-2 text-center">StudentID</th>
              <th className="px-4 py-2 text-center">Score</th>
              <th className="hidden px-4 py-2 text-center laptop:table-cell">
                Đánh giá
              </th>
              <th className="hidden px-4 py-2 text-center laptop:table-cell">
                Score AI
              </th>
              <th className="hidden px-4 py-2 text-center laptop:table-cell">
                Note
              </th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.studentID}
                className="border-b border-gray-300 text-zinc-800 "
              >
                <td className="px-4 py-2 text-center ">{user.studentID}</td>
                <td className="px-4 py-2 text-center ">{user.score}</td>
                <td className="hidden px-4 py-2 text-center laptop:table-cell">
                  <pre className="truncate max-w-32">{user.evaluation}</pre>
                </td>
                <td className="hidden px-4 py-2 text-center laptop:table-cell">
                  {user.scoreAI}
                </td>
                <td className="hidden px-4 py-2 item-center laptop:table-cell">
                  <pre className="truncate max-w-32">{user.note}</pre>
                </td>
                <td className="flex justify-between px-4 py-2 -mr-6 max-w-36">
                  <button
                    onClick={() => handleDetail(user)}
                    className="w-1/2 px-4 py-2 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(user.studentID)}
                    className="w-1/2 px-4 py-2 m-1 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDetail && selectedUser && (
          <div className="inset-0 flex items-center justify-center w-full bg-gray-800 bg-opacity-50 rounded-lg laptop:absolute">
            <div className="max-h-full p-8 bg-white rounded-lg text-zinc-700">
              <h2 className="mb-4 text-xl font-semibold">Chi tiết thông tin</h2>
              <div className="max-h-full">
                <div className="flex max-h-80">
                  <div className="p-3">
                    <div className="mb-4">
                      <label className="block mb-2">Student ID:</label>
                      <input
                        type="text"
                        name="studentID"
                        value={selectedUser.studentID}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                        readOnly
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2">Score:</label>
                      <input
                        type="text"
                        name="score"
                        value={selectedUser.score}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2">Đánh giá:</label>
                      <textarea
                        name="evaluation"
                        value={selectedUser.evaluation}
                        onChange={handleInputChange}
                        className="w-full h-24 px-3 py-2 bg-white border border-gray-300 rounded-md resize-none text-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="mb-6">
                      <label className="block mb-2">Score AI:</label>
                      <input
                        type="text"
                        name="scoreAI"
                        value={selectedUser.scoreAI}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-zinc-700"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2">Note:</label>
                      <textarea
                        name="note"
                        value={selectedUser.note}
                        onChange={handleInputChange}
                        className="w-full h-24 px-3 py-2 bg-white border border-gray-300 rounded-md resize-none text-zinc-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleCloseDetail}
                    className="px-4 py-2 mr-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={handleSaveDetail}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="inset-x-0 bottom-0 flex flex-wrap justify-center w-full laptop:absolute">
        {users.length > 0 && (
          <ul className="flex">
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className="px-3 py-1 mb-5 mr-2 text-gray-700 bg-gray-200 rounded mt-9 hover:bg-gray-300 hover:-translate-y-1"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlockXemDiem;
