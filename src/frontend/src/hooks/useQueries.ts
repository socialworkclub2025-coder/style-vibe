import { useMutation, useQuery } from "@tanstack/react-query";
import { Category } from "../backend";
import { useActor } from "./useActor";

export { Category };

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      customerName: string;
      mobileNumber: string;
      district: string;
      thana: string;
      fullAddress: string;
      productId: bigint;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(
        params.customerName,
        params.mobileNumber,
        params.district,
        params.thana,
        params.fullAddress,
        params.productId,
        params.quantity,
      );
    },
  });
}

export function useSendSupportMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      mobile: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendSupportMessage(
        params.name,
        params.mobile,
        params.message,
      );
    },
  });
}
