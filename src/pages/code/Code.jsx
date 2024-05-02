import { Box } from "@chakra-ui/react";
import CodeEditor from "../../components/code/CodeEditor";

function Code() {
  return (
    <Box minH="100vh" bg="#ffffff" color="green" px={6} py={8}>
      <CodeEditor />
    </Box>
  );
}

export default Code;
