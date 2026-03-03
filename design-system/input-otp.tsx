"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Icon } from "./icon";

import { cn } from "@/lib/utils";

export interface InputOTPProps {
  length?: number;
  separatorPosition?: number;
  showSeparator?: boolean;
  maxLength?: number;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      length = 6,
      separatorPosition,
      showSeparator = false,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const actualLength = length;
    const separatorPos = separatorPosition ?? Math.floor(actualLength / 2);
    const shouldShowSeparator =
      showSeparator && separatorPos > 0 && separatorPos < actualLength;

    return (
      <OTPInput
        data-slot="input-otp"
        containerClassName={cn(
          "loupe-system",
          "flex items-center gap-2 has-disabled:opacity-50",
        )}
        className="disabled:cursor-not-allowed"
        maxLength={maxLength ?? actualLength}
        {...props}
      >
        <div className="flex items-center">
          {Array.from({ length: actualLength }, (_, index) => {
            const elements = [<InputOTPSlot key={index} index={index} />];

            // Add separator after the separator position
            if (shouldShowSeparator && index === separatorPos) {
              elements.push(<InputOTPSeparator key={`separator-${index}`} />);
            }

            return elements;
          }).flat()}
        </div>
      </OTPInput>
    );
  },
);

InputOTP.displayName = "InputOTP";

function InputOTPSlot({
  index,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className="data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-input transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-1 data-[active=true]:ring-offset-1"
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Icon name="remove" size={16} />
    </div>
  );
}

export { InputOTP };
