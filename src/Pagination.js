import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Dots from './Dots';


class DummyDoneButton extends React.Component {
  componentDidMount() {
    console.log('Dummy mounted.');
    this.props.onMount();
  }

  render() {
    console.log('Dummy rendered');
    return (
      <View />
    );
  }
}

const Pagination = ({
  numPages,
  currentPage,
  isLight,
  bottomBarHeight,
  showSkip,
  showNext,
  onNext,
  onSkip,
  onLast,
  skipLabel,
  nextLabel,
  SkipButtonComponent,
  NextButtonComponent,
  DotComponent,
  gone,
}) => {
  const isLastPage = currentPage + 1 === numPages;

  const SkipButtonFinal = showSkip &&
    !isLastPage && (
      <SkipButtonComponent
        isLight={isLight}
        skipLabel={skipLabel}
        onPress={() => {
          if (typeof onSkip === 'function') {
            onSkip();
            setTimeout(gone, 500);
          }
        }}
      />
    );

  const NextButtonFinal = showNext &&
    !isLastPage && (
      <NextButtonComponent
        nextLabel={nextLabel}
        isLight={isLight}
        onPress={onNext}
      />
    );

  const DoneButtonFinal = isLastPage && (
    <DummyDoneButton
      isLight={isLight}
      onMount={onLast}
    />
  );

  return (
    <View
      style={{
        height: bottomBarHeight,
        ...styles.container,
      }}
    >
      <View style={styles.buttonLeft}>{SkipButtonFinal}</View>
      <Dots
        isLight={isLight}
        numPages={numPages}
        currentPage={currentPage}
        Dot={DotComponent}
        style={styles.dots}
      />
      <View style={styles.buttonRight}>
        {NextButtonFinal}
        {DoneButtonFinal}
      </View>
    </View>
  );
};

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired,
  bottomBarHeight: PropTypes.number.isRequired,
  showNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onLast: PropTypes.func,
  skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

const styles = {
  container: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  buttonRight: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  dots: {
    flexShrink: 0,
  },
};

export default Pagination;
