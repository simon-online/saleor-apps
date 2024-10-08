import { Box, Text } from "@saleor/macaw-ui";
import { PropsWithChildren } from "react";

import styles from "./form-section.module.css";

export const FormSection = ({
  title,
  subtitle,
  children,
  disabled = false,
}: PropsWithChildren<{ title: string; subtitle?: string; disabled?: boolean }>) => {
  return (
    <Box
      as={"fieldset"}
      className={styles.formSection}
      disabled={disabled}
      __borderWidth={0}
      padding={0}
      margin={0}
    >
      <Text
        marginBottom={4}
        as="h3"
        size={5}
        fontWeight="bold"
        {...(disabled && { color: "defaultDisabled" })}
      >
        {title}
      </Text>
      {subtitle && (
        <Text as="p" marginBottom={4} {...(disabled && { color: "defaultDisabled" })}>
          {subtitle}
        </Text>
      )}
      <Box display="grid" gridTemplateColumns={2} gap={12}>
        {children}
      </Box>
    </Box>
  );
};
