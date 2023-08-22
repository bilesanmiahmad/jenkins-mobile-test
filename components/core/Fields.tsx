import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import React, { ReactElement, useMemo, useRef } from "react";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import {
  Dimensions,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CFIcons } from "@/components/core/icons";
import { Box, Text } from "@/theme";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  rules?: any;
  name: string;
  defaultValue?: string;
  icon?: ReactElement;
}

const { width } = Dimensions.get("window");

export function TextInput(props: TextInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const { label, name, rules, defaultValue, ...inputProps } = props;

  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  const { field } = useController({ name, rules, defaultValue });

  return (
    <Box gap="sm">
      <Text variant="label" fontWeight="bold">
        {props.label}
      </Text>
      <Box
        height={56}
        backgroundColor="grayLight"
        borderRadius="md"
        padding="md"
        flexDirection={props.icon ? "row" : "column"}
        justifyContent={props.icon ? "space-between" : "center"}
        className="border border-gray-300 focus:border focus:border-[#2AAB26] focus:bg-white"
        width={width - 30}
      >
        <RNTextInput
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
          className={`${props.icon ? "w-[90%]" : "w-full"}`}
          placeholderTextColor="#4F4F4F"
          secureTextEntry={props.secureTextEntry && !showPassword}
        />
        {props.icon ? props.icon : null}
      </Box>
    </Box>
  );
}

export interface SelectFieldProps
  extends Omit<
      RNTextInputProps,
      "ref" | "onValueChange" | "onChange" | "value"
    >,
    UseControllerProps {
  value?: string[];
  renderValue?: (value: string[]) => string;
  onSelect?: (newValue: string[]) => void;
  multiple?: boolean;
  options: { label: string; value: string }[];
  rules?: any;
  name: string;
  label: string;
  defaultValue?: string;
}
export interface SelectFieldRef {
  presentOptions: () => void;
  dismissOptions: () => void;
}

export const SelectField = React.forwardRef<SelectFieldRef, SelectFieldProps>(
  (props) => {
    const {
      name,
      renderValue,
      onSelect,
      options = [],
      multiple = true,
      rules,
      defaultValue,
      ...TextFieldProps
    } = props;

    const initialSnapPoints = useMemo(() => ["30%", "CONTENT_HEIGHT"], []);

    const formContext = useFormContext();

    if (!formContext || !name) {
      const msg = !formContext
        ? "TextInput must be wrapped by the FormProvider"
        : "Name must be defined";
      console.error(msg);
      return null;
    }

    const { field } = useController({ name, rules, defaultValue });

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const sheet = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();

    const disabled = TextFieldProps.editable === false;

    function presentOptions() {
      if (disabled) return;
      sheet.current?.present();
    }

    function dismissOptions() {
      sheet.current?.dismiss();
    }

    function captilizeFirstLetter(string: string) {
      return string?.charAt(0).toUpperCase() + string?.slice(1);
    }

    const error = Array.isArray(formContext.formState.errors[name])
      ? // @ts-ignore
        errors[name].join(", ")
      : formContext.formState.errors[name]?.message ||
        formContext.formState.errors[name];

    return (
      <Box gap="sm">
        <Text variant="label" fontWeight="bold">
          {props.label}
        </Text>

        <>
          <Box>
            <TouchableOpacity activeOpacity={1} onPress={presentOptions}>
              <Box
                pointerEvents="none"
                height={56}
                backgroundColor="grayLight"
                borderRadius="md"
                padding="md"
                flexDirection="row"
                justifyContent="space-between"
                className="border border-gray-300 focus:border focus:border-[#2AAB26] focus:bg-white"
                width={width - 30}
              >
                <RNTextInput
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  {...TextFieldProps}
                  placeholderTextColor="#4F4F4F"
                  // value={captilizeFirstLetter(value)}
                />
                <CFIcons
                  name="chevronDown"
                  width={30}
                  height={30}
                  fill="#4F4F4F"
                />
              </Box>
            </TouchableOpacity>
            {error ? (
              <Text className="text-sm text-red-600">{error}</Text>
            ) : null}
          </Box>

          <BottomSheetModal
            ref={sheet}
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            stackBehavior="replace"
            enableDismissOnClose
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
              />
            )}
          >
            <Text
              variant="subheader"
              textAlign="center"
              fontWeight="bold"
              paddingEnd="md"
            >
              {props.label}
            </Text>
            <BottomSheetFlatList
              style={{ marginBottom: bottom + (multiple ? 56 : 0) }}
              data={options}
              onLayout={handleContentLayout}
              keyExtractor={(o) => o.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    field.onChange(item.value);
                    dismissOptions();
                  }}
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  }}
                >
                  <Box>
                    <Text
                      variant="subheader"
                      color={
                        field.value === item.value
                          ? "greenPrimary"
                          : "grayPrimary"
                      }
                    >
                      {item.label}
                    </Text>
                  </Box>
                </TouchableOpacity>
              )}
            />
          </BottomSheetModal>
        </>
      </Box>
    );
  },
);

export const PhoneField = ({
  label,
  name,
  defaultValue,
  rules,
}: TextInputProps) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  const { field } = useController({ name, rules, defaultValue });

  const error = Array.isArray(formContext.formState.errors[name])
    ? // @ts-ignore
      formContext.formState.errors[name].join(", ")
    : formContext.formState.errors[name]?.message ||
      formContext.formState.errors[name];

  return (
    <Box gap="sm">
      <Text variant="label" fontWeight="bold">
        {label}
      </Text>

      <Box>
        <Box
          pointerEvents="none"
          height={56}
          backgroundColor="grayLight"
          borderRadius="md"
          padding="md"
          flexDirection="row"
          justifyContent="space-between"
          className="border border-gray-300 focus:border focus:border-[#2AAB26] focus:bg-white"
          width={width - 30}
        >
          <PhoneInput
            textProps={{
              placeholder: "Phone Number",
              placeholderTextColor: "#4F4F4F",
              value: field.value,
              onChangeText: field.onChange,
            }}
            initialCountry="GH"
          />
        </Box>
        {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      </Box>
    </Box>
  );
};
