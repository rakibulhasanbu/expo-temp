import * as React from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { useController, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
import { Platform, Pressable, TextInput, View } from "react-native";

import { FormError } from "@/components/form-error";
import { Text } from "@/components/text";

const formInputVariants = cva(
  cn(
    "border-input bg-background text-foreground placeholder:text-muted-foreground rounded-md border px-4 py-3 text-base",
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 outline-none transition-colors focus-visible:ring-[3px]",
    })
  ),
  {
    variants: {
      invalid: {
        true: "border-destructive",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  }
);

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof TextInput>, "value" | "onChangeText" | "onBlur" | "ref" | "children"> &
  VariantProps<typeof formInputVariants> & {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    label?: string;
    containerClassName?: string;
    labelClassName?: string;
  };

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  containerClassName,
  labelClassName,
  className,
  ...props
}: FormInputProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ control, name, rules });
  const inputRef = React.useRef<TextInput>(null);
  const labelId = `${name}-label`;

  return (
    <View className={cn("gap-1.5", containerClassName)}>
      {label ? (
        <Pressable
          onPress={Platform.select({
            native: () => inputRef.current?.focus(),
          })}
        >
          <Text nativeID={labelId} variant="small" className={labelClassName}>
            {label}
          </Text>
        </Pressable>
      ) : null}

      <TextInput
        ref={(instance) => {
          field.ref(instance);
          inputRef.current = instance;
        }}
        aria-labelledby={label ? labelId : undefined}
        accessibilityLabel={label}
        value={field.value ?? ""}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        aria-invalid={fieldState.invalid}
        className={cn(formInputVariants({ invalid: fieldState.invalid }), className)}
        {...props}
      />
      <FormError message={fieldState.error?.message} />
    </View>
  );
}

export { FormInput, formInputVariants };
export type { FormInputProps };
