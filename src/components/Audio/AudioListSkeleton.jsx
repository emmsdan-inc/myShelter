import React from "react";
import FlexSpaceBetweenCenter, {
  BaseWrapper,
  HorizontalScroll,
} from "../Untils";
import Spacer from "../Spacer";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import random from "lodash/random";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { scale } from "react-native-size-matters";

export function AudioListSkeleton({ length = 10 }) {
  return Array(length)
    .fill(0)
    .map((_, index) => (
      <BaseWrapper
        key={index}
        style={{ paddingHorizontal: 0, paddingVertical: 10 }}
      >
        <FlexSpaceBetweenCenter style={{ padding: 0 }}>
          <BaseWrapper style={{ paddingHorizontal: 0 }}>
            <FlexSpaceBetweenCenter style={{ padding: 0 }}>
              <View>
                <SkeletonPlaceholder marginRight={10}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={411}
                  />
                </SkeletonPlaceholder>
              </View>
              <BaseWrapper>
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    width={180}
                    height={10}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={10}
                    borderRadius={4}
                    marginTop={10}
                  />
                </SkeletonPlaceholder>
              </BaseWrapper>
            </FlexSpaceBetweenCenter>
          </BaseWrapper>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder height={40}>
              <SkeletonPlaceholder.Item
                width={5}
                height={30}
                borderRadius={4}
                marginTop={10}
                marginRight={5}
              />
            </SkeletonPlaceholder>
          </SkeletonPlaceholder>
        </FlexSpaceBetweenCenter>
      </BaseWrapper>
    ));
}

export default AudioListSkeleton;
