import {
  Menu,
  Button,
  Box,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../../helper/constants";
import FallbackComponent from "../../utils/FallbackComponent";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">
        Language:
      </Text>
      <Menu isLazy>
        <MenuButton as={Button} colorScheme="green">
          {language}
        </MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
            >
              {/* Tạo ra một khoảng trắng không thể bẻ dòng*/}
              {lang}&nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

LanguageSelector.propTypes = {
  language: PropTypes.string,
  onSelect: PropTypes.func,
};

const EnhancedLanguageSelector = withErrorBoundary(LanguageSelector, {
  FallbackComponent,
});

export default EnhancedLanguageSelector;
