import React from 'react';
import { scale } from 'react-native-size-matters';
import { Text, View } from './Themed';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from './Icon';
import FlexSpaceBetweenCenter, { FlexSpaceBetween } from './Untils';
import Colors from '../constants/Colors';
import styles from './style';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
export function ItemSkeleton() {
  return (
    <SkeletonPlaceholder marginRight={10}>
      <SkeletonPlaceholder.Item height={40} borderRadius={4} />
    </SkeletonPlaceholder>
  );
}

export function Item({
  item,
  isLoading,
  onDelete,
  onEdit,
  onSend,
  onShare,
  onPress,
}) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {}, []);
  const getTimestamp = () => {
    const date = moment(item.created_at).fromNow();
    if (['days', 'month', 'year'].includes(date.split(' ')[1])) {
      return moment(item.created_at).format('lll');
    }
    return date;
  };
  return isLoading ? (
    <ItemSkeleton />
  ) : (
    <View
      style={[
        {
          padding: 15,
          marginBottom: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors().blackShadow,
          borderRadius: 8,
        },
        styles.shadowBottom,
      ]}
    >
      <View>
        <FlexSpaceBetweenCenter style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={onPress}>
            <Text
              style={{
                backgroundColor: Colors().white,
                fontFamily: 'Nunito_600SemiBold',
                fontSize: scale(14),
                width: scale(wp('60%')),
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(!open)}>
            <Icon
              name={open ? 'down-open' : 'right-open'}
              size={scale(15)}
              color="gray"
            />
          </TouchableOpacity>
        </FlexSpaceBetweenCenter>
      </View>
      {open ? (
        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              fontSize: scale(12),
              fontFamily: 'Nunito_400Regular',
            }}
            numberOfLines={5}
          >
            {item.description}
          </Text>
          {onDelete && (
            <FlexSpaceBetween
              style={[{ justifyContent: 'space-between', marginTop: 20 }]}
            >
              <Text>{getTimestamp()}</Text>
              {onSend && (
                <Ionicons
                  onPress={onSend}
                  name="send"
                  size={20}
                  color={Colors().grayText}
                />
              )}
              {onEdit && (
                <Ionicons
                  onPress={onEdit}
                  name="pencil"
                  size={20}
                  color={Colors().primary}
                />
              )}
              {onShare && (
                <Ionicons
                  onPress={onShare}
                  name="arrow-redo"
                  size={20}
                  color={Colors().primary}
                />
              )}
              {onDelete && (
                <Ionicons
                  onPress={onDelete}
                  name="trash"
                  size={20}
                  color={Colors().error}
                />
              )}
            </FlexSpaceBetween>
          )}
        </View>
      ) : null}
    </View>
  );
}

export default Item;
