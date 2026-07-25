import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { Brand } from "../types";

type BrandCardProps = {
  brand: Brand;
};

export const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <View className="w-1/2 p-2">
      <View className="items-center rounded-lg border border-gray-200 bg-white p-3">
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          {brand.imgURL ? (
            <Image
              source={{ uri: brand.imgURL }}
              style={{ width: 96, height: 96 }}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <Text className="text-lg font-semibold text-gray-400">{brand.name.charAt(0)}</Text>
          )}
        </View>
        <Text numberOfLines={1} className="mt-2 text-center text-sm font-medium text-gray-900">
          {brand.name}
        </Text>
      </View>
    </View>
  );
};
