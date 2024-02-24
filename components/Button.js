import {View, Text, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';

export default props => {
  const styles = [buttonStyles.button]
  const stylesOutSide = [outSide.button]
  if (props.zero) {
    stylesOutSide.push(outSide.zeroButton)
  }
  if (props.operation) {
    styles.push(buttonStyles.operationButton)
  }
  if (props.otherButtons) {
    styles.push(buttonStyles.otherButtons)
  }

  return (
    <TouchableHighlight onPress={_ => [props.onclick(props.label)]} style={stylesOutSide}>
      <View style={styles}>
        <Text style={buttonStyles.text}>
          {props.label}
        </Text>
      </View>
    </TouchableHighlight> 
  )
}

const outSide = StyleSheet.create({
  button: {
    width: '24%',
    aspectRatio: 1,
    paddingHorizontal: 1,
    paddingVertical: 2
  },
  zeroButton: {
    width: '49.5%',
    aspectRatio: 2,
    paddingHorizontal: 1,
    paddingVertical: 2
  }
})

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  operationButton: {
    backgroundColor: '#F1A33B'
  },
  otherButtons: {
    backgroundColor: '#A5A5A5'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30
  }
})