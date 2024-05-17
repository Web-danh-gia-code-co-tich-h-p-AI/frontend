import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../../api/codeApi";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

const Output = ({ editorRef, language, setOutput }) => {
  const toast = useToast();
  const [output, setLocalOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setLocalOutput(result.output.split("\n"));
      setOutput(result.output.split("\n")); // Set output for parent component
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description:
          error.message || "Unable to run the code. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.500" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, index) => <Text key={index}>{line}</Text>)
          : `Click "Run Code" to see the output here.`}
      </Box>
    </Box>
  );
};

Output.propTypes = {
  editorRef: PropTypes.object,
  language: PropTypes.string,
  setOutput: PropTypes.func, // Add propTypes for setOutput
};

const EnhancedOutput = withErrorBoundary(Output, {
  FallbackComponent,
});

export default EnhancedOutput;
