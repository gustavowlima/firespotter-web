import { TextField as RootTextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import React, { forwardRef } from "react";

type TextFieldInputProps = React.ComponentProps<typeof RootTextField.Input>;

export const TextField = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (props, ref) => {
    return (
      <RootTextField.Root>
        <RootTextField.Slot>
          <Search height="16" width="16" />
        </RootTextField.Slot>
        <RootTextField.Input {...props} ref={ref} />
      </RootTextField.Root>
    );
  }
);
