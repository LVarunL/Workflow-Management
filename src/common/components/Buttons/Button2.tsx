import { Button, ButtonProps } from "@mui/material";
import React from "react";

type Prop = ButtonProps;

enum ButtonTypes {
  FILLED = "filled",
  TEXT = "text",
  BORDERED = "bordered",
}
type MyProps = {
  color?: ButtonProps["color"];
  type?: ButtonTypes;
  disaled?: boolean;
  onClick?: ButtonProps["onClick"];
  size?: "small" | "medium" | "large";
  textSize?: "small" | "medium" | "large";
  textColor?: string;
};

const buttonPropsToLibraryButtonPropsAdapeter = (buttonProps: MyProps) => {
  let props = {} as Partial<ButtonProps>;

  props.color = buttonProps.color;
  props.variant = (() => {
    if (buttonProps.type === ButtonTypes.FILLED) {
      return "contained";
    } else if (buttonProps.type === ButtonTypes.BORDERED) {
      return "outlined";
    } else if (buttonProps.type === ButtonTypes.TEXT) {
      return "text";
    }
  })();

  props.disabled = buttonProps.disaled;
  props.size = buttonProps.size;
  props.sx = {
    textColor: buttonProps.textSize,
    color: buttonProps.textColor,
    textSize: buttonProps.textSize,
  };
  props.onClick = buttonProps.onClick;

  return props;
};

export default function Button2(props: React.PropsWithChildren<MyProps>) {
  const adaptedProps = buttonPropsToLibraryButtonPropsAdapeter(props);

  return <Button {...adaptedProps}>{props.children}</Button>;
}
