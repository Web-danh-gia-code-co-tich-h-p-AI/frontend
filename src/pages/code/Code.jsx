import { Box } from "@chakra-ui/react";
import CodeEditor from "../../components/code/CodeEditor";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

function Code() {
  return (
    <Box minH="100vh" bg="#ffffff" color="green" px={6} py={8}>
      <CodeEditor />
    </Box>
  );
}

const EnhancedCode = withErrorBoundary(Code, {
  FallbackComponent,
});

export default EnhancedCode;
