import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';
import { vibrate } from './utils';

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
      vibrate()
      if (this.state.isBreak) {
        this.setState({ timeLeft: FOCUS_TIME, isBreak: false, isStopped: true })
      } else {
        this.setState({ timeLeft: BREAK_TIME, isBreak: true, isStopped: true })
      }
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
      <View style={styles.container}>
        <Text style={styles.titleText}>Pomodoro Timer</Text>
        <View style={styles.timer}>
          <Text style={styles.timerText}>{this.formatSingleDigits(parseInt(this.state.timeLeft / 60))}</Text>
          <Text style={styles.timerText}>:</Text>
          <Text style={styles.timerText}>{this.formatSingleDigits(this.state.timeLeft % 60)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.start} style={styles.button} title="Start" />
          <Button onPress={this.stop} style={styles.button} title="Stop" />
          <Button onPress={this.reset} style={styles.button} title="Reset" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 30,
  },
  timer: {
    flexDirection: 'row',
  },
  timerText: {
    fontSize: 48,
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    justifyContent: 'space-around',
  },
});
