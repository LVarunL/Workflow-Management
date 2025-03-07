import { SvgIconComponent } from "@mui/icons-material";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export interface Breadcrumbs2PropsItem {
  id: string;
  label: React.ReactNode;
  link: string;
}

enum Variants {
  LINK = "LINK",
  BUTTON = "BUTTON",
}

export interface Breadcrumbs2Props {
  breadcrumbItems: Breadcrumbs2PropsItem[];
  mode?: Variants;
}

export default function Breadcrumbs2({
  breadcrumbItems,
  mode = Variants.LINK,
}: Breadcrumbs2Props) {
  const navigate = useNavigate();

  const renderCrumb = (breadcrumbItem: Breadcrumbs2PropsItem) => {
    switch (mode) {
      case Variants.BUTTON:
        return (
          <Button variant="contained" href={breadcrumbItem.link}>
            {breadcrumbItem.label}
          </Button>
        );

      case Variants.LINK:
      default:
        return (
          <Link underline="hover" href={breadcrumbItem.link}>
            {breadcrumbItem.label}
          </Link>
        );
    }
  };

  return (
    <Breadcrumbs>
      {breadcrumbItems.map((breadcrumbItem, index) =>
        index !== breadcrumbItems.length - 1 ? (
          renderCrumb(breadcrumbItem)
        ) : (
          <Typography>{breadcrumbItem.label}</Typography>
        )
      )}
    </Breadcrumbs>
  );
}
