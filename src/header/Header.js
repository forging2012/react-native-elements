import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import Text from '../text/Text';
import Icon from '../icons/Icon';
import { colors, ViewPropTypes, getStatusBarHeight } from '../config';
import renderNode from '../helpers/renderNode';
import nodeType from '../helpers/nodeType';

const ALIGN_STYLE = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

const Children = ({ style, placement, children }) => (
  <View style={[{ alignItems: ALIGN_STYLE[placement] }, style]}>
    {children == null || children === false
      ? null
      : children.text
        ? renderNode(Text, children.text, { numberOfLines: 1, ...children })
        : children.icon
          ? renderNode(Icon, {
              ...children,
              name: children.icon,
              containerStyle: [
                { alignItems: ALIGN_STYLE[placement] },
                children.containerStyle,
              ],
            })
          : null}
  </View>
);

const Header = ({
  statusBarProps,
  leftComponent,
  centerComponent,
  rightComponent,
  leftContainerStyle,
  centerContainerStyle,
  rightContainerStyle,
  backgroundColor,
  containerStyle,
  placement,
  barStyle,
  ...attributes
}) => (
  <View
    {...attributes}
    style={[
      styles.container,
      backgroundColor && { backgroundColor },
      containerStyle,
    ]}
  >
    <StatusBar barStyle={barStyle} {...statusBarProps} />
    <Children
      style={[styles.rightLeftContainer, leftContainerStyle]}
      placement="left"
    >
      {leftComponent}
    </Children>
    <Children
      style={[styles.centerContainer, centerContainerStyle]}
      placement={placement}
    >
      {centerComponent}
    </Children>
    <Children
      style={[styles.rightLeftContainer, rightContainerStyle]}
      placement="right"
    >
      {rightComponent}
    </Children>
  </View>
);

Header.propTypes = {
  placement: PropTypes.oneOf(['left', 'center', 'right']),
  leftComponent: nodeType,
  centerComponent: nodeType,
  rightComponent: nodeType,
  leftContainerStyle: ViewPropTypes.style,
  centerContainerStyle: ViewPropTypes.style,
  rightContainerStyle: ViewPropTypes.style,
  backgroundColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  statusBarProps: PropTypes.object,
  barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
};

Header.defaultProps = {
  placement: 'center',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: (Platform.OS === 'ios' ? 44 : 56) + getStatusBarHeight(),
  },
  centerContainer: {
    flex: 3,
  },
  rightLeftContainer: {
    flex: 1,
  },
});

export default Header;
