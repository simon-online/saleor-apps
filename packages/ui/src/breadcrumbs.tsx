import { Box, PropsWithBox, Text } from "@saleor/macaw-ui";
import Link from "next/link";
import React from "react";

import styles from "./breadcrumbs.module.css";

export type BreadcrumbsItemProps = PropsWithBox<{
  href?: string;
  isLast?: boolean;
}>;

const BreadcrumbsItem = ({ children, href, isLast = false, ...p }: BreadcrumbsItemProps) => {
  return (
    <Box as="li" {...p}>
      <Text size={7} color={isLast ? "default1" : "default2"}>
        {href && !isLast ? (
          <Link className={styles.link} href={href}>
            {children}
          </Link>
        ) : (
          children
        )}
      </Text>
    </Box>
  );
};

export type BreadcrumbsProps = PropsWithBox<{}>;

export const Breadcrumbs = ({ children, ...p }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb">
      <Box
        className={styles.breadcrumbs}
        alignItems={"center"}
        display={"flex"}
        padding={0}
        margin={0}
        style={{ listStyle: "none" }}
        as="ol"
        {...p}
      >
        {React.Children.map(children, (child, index) => {
          const isLast = index === React.Children.count(children) - 1;

          return React.cloneElement(child as React.ReactElement<BreadcrumbsItemProps>, {
            isLast,
          });
        })}
      </Box>
    </nav>
  );
};

Breadcrumbs.Item = BreadcrumbsItem;
