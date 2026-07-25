import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

import { BrandCard } from "@/features/brand/components/brand-card";
import { useBrandsQuery } from "@/features/brand/hooks/use-brands-query";
import type { Brand } from "@/features/brand/types";

export default function BrandScreen() {
  const {
    data,
    isPending,
    isError,
    error,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBrandsQuery();

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-2 bg-white px-6">
        <Text className="text-center text-base text-red-500">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList<Brand>
        data={data.brands}
        keyExtractor={(brand) => brand.id}
        renderItem={({ item }) => <BrandCard brand={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Text className="text-gray-500">No brands found</Text>
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </View>
  );
}
