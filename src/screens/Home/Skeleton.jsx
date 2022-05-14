import React from "react";
import FlexSpaceBetweenCenter, {
  BaseWrapper,
  HorizontalScroll,
} from "../../components/Untils";
import Spacer from "../../components/Spacer";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import random from "lodash/random";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { scale } from "react-native-size-matters";

export function Skeleton() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map(() => {
          return (
            <View key={`${Math.random()}${random(10)}`}>
              <BaseWrapper>
                <FlexSpaceBetweenCenter>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item
                      width={wp("45%")}
                      height={10}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item
                      width={wp("10%")}
                      height={10}
                      borderRadius={4}
                      speed={0.9}
                    />
                  </SkeletonPlaceholder>
                </FlexSpaceBetweenCenter>
                <Spacer size={8} />
              </BaseWrapper>
              <HorizontalScroll>
                {[4, 5, 3, 9].map(() => (
                  <View key={`${Math.random()}${random(10)}`}>
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item
                        width={wp("44%")}
                        marginRight={scale(8)}
                      >
                        <SkeletonPlaceholder.Item
                          height={scale(70)}
                          borderRadius={4}
                          marginBottom={scale(8)}
                        />
                        <SkeletonPlaceholder.Item
                          height={scale(70)}
                          borderRadius={4}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                    <Spacer size={8} />
                  </View>
                ))}
              </HorizontalScroll>
            </View>
          );
        })}
    </>
  );
}

export default Skeleton;
