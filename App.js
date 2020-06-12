import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native'
import { vibrate } from './utils'
import Constants from 'expo-constants'

const FOCUS_TIME = 25 * 60
const BREAK_TIME = 5 * 60

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      timeLeft: FOCUS_TIME,
      isBreak: false,
      isStopped: true,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.countDown, 1)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countDown = () => {
    if (this.state.timeLeft > 0 && !this.state.isStopped) {
      this.setState(prevState => ({ ...this.state, timeLeft: prevState.timeLeft - 1 }))
    }
    if (this.state.timeLeft === 0) {
      if (this.state.isBreak) {
        this.setState({ timeLeft: FOCUS_TIME, isBreak: false, isStopped: true })
      } else {
        this.setState({ timeLeft: BREAK_TIME, isBreak: true, isStopped: true })
      }
      vibrate()
      Alert.alert("Pomodoro Timer's up!")
    }
  }

  stop = () => {
    this.setState({ ...this.state, isStopped: true })
  }

  start = () => {
    this.setState({ ...this.state, isStopped: false })
  }

  reset = () => {
    if (this.state.isBreak) {
      this.setState({ ...this.state, timeLeft: BREAK_TIME, isStopped: true })
    } else {
      this.setState({ ...this.state, timeLeft: FOCUS_TIME, isStopped: true })
    }
  }

  formatSingleDigits(n) {
    return (n < 10) ? ("0" + n) : ("" + n)
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Pomodoro Timer</Text>
          <Image style={styles.tomatoIcon} source={require('./assets/tomato.png')} />
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{this.formatSingleDigits(parseInt(this.state.timeLeft / 60))}</Text>
          <Text style={styles.timerText}>:</Text>
          <Text style={styles.timerText}>{this.formatSingleDigits(this.state.timeLeft % 60)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.start} style={[styles.button, styles.startButton]}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stop} style={[styles.button, styles.stopButton]}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.reset} style={[styles.button, styles.resetButton]}>
            <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    maxHeight: '20%'
  },
  titleText: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 36,
  },
  tomatoIcon: {
    flex: 1,
    maxHeight: '50%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  timerContainer: {
    flexDirection: 'row',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    height: '30%',
    minHeight: 180,
    marginBottom: 20,
  },
  button: {
    justifyContent: 'space-around',
    borderRadius: 5,
    height: 60,
    width: 200,
    borderColor: 'black',
    borderWidth: 1
  },
  buttonText: {
    fontSize: 32,
    alignSelf: 'center',
    color: 'white'
  },
  resetButtonText: {
    color: 'black'
  },
  startButton: {
    backgroundColor: '#5ea423',
  },
  stopButton: {
    backgroundColor: '#c60f13'
  },
  resetButton: {
    backgroundColor: '#e9e9e9'
  },
});
