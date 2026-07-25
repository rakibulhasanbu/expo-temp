import { BrandCard } from "@/features/brand/components/brand-card";
import { useBrandsQuery } from "@/features/brand/hooks/use-brand-queries";
import type { Brand } from "@/features/brand/types";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";

export default function BrandScreen() {
  const { data, isPending, isError, error, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBrandsQuery();

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
    <View className="bg-background flex-1 py-10">
      <View className="mb-4 flex flex-row gap-4 px-6">
        <Link href="/profile" asChild>
          <Pressable className="w-1/2 rounded-lg bg-blue-600 px-6 py-3">
            <Text className="text-base font-medium text-white">Go to Profile</Text>
          </Pressable>
        </Link>

        <Link href="/(auth)/sign-in" asChild>
          <Pressable className="w-1/2 rounded-lg bg-blue-600 px-6 py-3">
            <Text className="text-base font-medium text-white">Go to Sign In</Text>
          </Pressable>
        </Link>
      </View>
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
