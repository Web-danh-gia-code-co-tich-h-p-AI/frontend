import BlockInfoAccount from "../../components/blockprofile/BlockInfoAccount";
import AvatarAccount from "../../components/blockprofile/AvatarAccount";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const ProfilePage = () => {
  return (
    <div>
      <AvatarAccount className="" />
      <BlockInfoAccount className="" />
    </div>
  );
};

const EnhancedProfilePage = withErrorBoundary(ProfilePage, {
  FallbackComponent,
});

export default EnhancedProfilePage;
