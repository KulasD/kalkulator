import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      memory: ""
    }
    this.operations =["Del", "/", "*", "-", "+"]
    this.adsB = [["AC", "AM", "M", "MC"]]
  }

calculateResult() {
  const text = this.state.resultText
  this.setState({
    resultText: ""+eval(text)
  })
}

  validate() {
    const text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text) {
    console.log(text)

    if(text == '=') {
      return this.validate() && this.calculateResult()
    }
    else if(text == '0'){
      let stringLength2 = this.state.resultText.length;
      let lastCharr2 = this.state.resultText.charAt(stringLength2 - 1);
      if(lastCharr2 == '/') {
        resultText: this.state.resultText
      }
      else {
        resultText: this.state.resultText+text
      }
    }

    else if(this.state.resultText.slice(-1) == '.' && text == '.'){
      resultText: this.state.resultText
    }
    else {this.setState({
      resultText: this.state.resultText+text
    })}
  }

  operate(operation) {
    switch(operation) {
        case 'Del':
          let text = this.state.resultText.split('')
          text.pop()
          this.setState({
            resultText: text.join('')
          })
          break
        case '+':
        case '-':
        case '*':
        case '/':
          const lastChar = this.state.resultText.split('').pop()
          if(this.operations.indexOf(lastChar) > 0) return
          if(this.state.text == "") return
          this.setState({
            resultText: this.state.resultText + operation
          })
    }
  }

  upperMenu(addon){
    switch(addon) {
      case 'AC':
        this.setState({
          resultText: ''
        })
        break
      case 'AM':
        this.setState({
          memory: this.state.resultText
        })
        break
      case 'M':
        this.setState({
          resultText: this.state.resultText+this.state.memory
        })
        break
      case 'MC':
        this.setState({
          memory: ''
        })
        break
    }
  }

  render() {
    let rows = []
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0,".","="]]
    for( let i = 0; i < 4; i++) {
      let row = []
      for ( let j = 0; j < 3; j++) {
        row.push(
            <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
              <Text style={styles.btntext}>{nums[i][j]}</Text>
            </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let addons = []
    for( let i = 0; i < 1; i++) {
      let ads = []
      for ( let j = 0; j < 4; j++) {
        ads.push(
            <TouchableOpacity key={this.adsB[i][j]} style={styles.btn} onPress={() => this.upperMenu(this.adsB[i][j])}>
              <Text style={styles.btntext}>{this.adsB[i][j]}</Text>
            </TouchableOpacity>)
      }
      addons.push(<View key={i} style={styles.row}>{ads}</View>)
    }

    let ops = []
    for( let i = 0; i < 5; i++) {
      ops.push(
          <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operations[i])}>
            <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
          </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.addons}>
          {addons}
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 40,
    color: 'white'
  },
  btntext: {
    fontSize: 30
  },
  white: {
    color: 'white'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#434343'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: '#434343',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 5,
    flexDirection: 'row'
  },
  addons: {
    flex: 1,
    backgroundColor: '#636363',
    alignSelf: 'stretch'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'orange'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'black'
  }
})
