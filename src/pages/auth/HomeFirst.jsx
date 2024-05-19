import { useAuth } from "../../helper/AuthProvider";

const HomeFirst = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user ? user.name : "Guest"}!</h1>
      {/* Các thành phần khác */}
    </div>
  );
};

export default HomeFirst;
