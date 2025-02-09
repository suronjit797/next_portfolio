// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";

// export function useSearchParamsState<T extends Record<string, string | number>>(defaultParams: T) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Get current params with defaults
//   const getParams = useCallback(() => {
//     const params: Record<string, string> = {};
//     Object.keys(defaultParams).forEach((key) => {
//       params[key] = searchParams.get(key) || String(defaultParams[key]);
//     });
//     return params as T;
//   }, [searchParams, defaultParams]);

//   // Update search params in the URL
//   const updateParams = useCallback(
//     (newParams: Partial<T>) => {
//       const params = new URLSearchParams(searchParams.toString());

//       Object.entries(newParams).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           params.set(key, String(value));
//         } else {
//           params.delete(key);
//         }
//       });

//       router.push(`?${params.toString()}`, { scroll: false });
//     },
//     [router, searchParams]
//   );

//   return { params: getParams(), updateParams };
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useSearchParamsState<T extends Record<string, string | number>>(defaultParams: T) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current params with defaults, but only include those with values
  const getParams = useCallback(() => {
    const params: Record<string, string> = {};

    Object.keys(defaultParams).forEach((key) => {
      const value = searchParams.get(key) || String(defaultParams[key]);
      // console.log({value, key, data: searchParams.get(key), params})
      if (value) {
        params[key] = value;
      }
    });

    return params as T;
  }, [searchParams, defaultParams]);

  // Update search params in the URL
  const updateParams = useCallback(
    (newParams: Partial<T>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return { params: getParams(), updateParams };
}
